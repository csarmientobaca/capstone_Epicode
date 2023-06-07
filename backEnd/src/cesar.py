from flask import Blueprint, request, jsonify
import validators

from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
)

from src.constants.http_status_codes import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_409_CONFLICT,
)
from werkzeug.security import check_password_hash, generate_password_hash
from src.database import User, db, PropietaUtente, Cesar

cesar = Blueprint("cesar", __name__, url_prefix="/api/v1/cesar")


@cesar.post("/register")
def register():
    email = request.json["email"]
    password = request.json["password"]

    if len(password) < 5:
        return (
            jsonify({"error": "usa una password più lunga di 5 caratteri"}),
            HTTP_400_BAD_REQUEST,
        )

    if not validators.email(email):
        return jsonify({"error": "devi inserire una email"}), HTTP_400_BAD_REQUEST

    if Cesar.query.filter_by(email=email).first() is not None:
        return jsonify({"error": "email già usata da altro utente"}), HTTP_409_CONFLICT

    pwd_hash = generate_password_hash(password)

    cesar = Cesar(email=email, password=pwd_hash, military=100)
    db.session.add(cesar)
    db.session.commit()

    return (
        jsonify({"message": "Cesar created", "cesar": {"email": email}}),
        HTTP_201_CREATED,
    )


@cesar.post("/login")
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    cesar = Cesar.query.filter_by(email=email).first()

    if cesar:
        is_pass_correct = check_password_hash(cesar.password, password)

        if is_pass_correct:
            refresh = create_refresh_token(identity=cesar.id)
            access = create_access_token(identity=cesar.id)

            return (
                jsonify(
                    {
                        "cesar": {
                            "refresh": refresh,
                            "access": access,
                            "email": cesar.email,
                        }
                    }
                ),
                HTTP_200_OK,
            )

    return jsonify({"error": "wrong credentials"})


@cesar.route("/plebei", methods=["GET"])
@jwt_required()
def plebei():
    cesar_id = get_jwt_identity()
    cesar = Cesar.query.filter_by(id=cesar_id).first()

    if cesar:
        cesar_data = {
            "cesar_id": cesar.id,
            "email": cesar.email,
            "military": cesar.military,
        }

        users = User.query.filter_by(cesar_id=cesar_id).all()

        plebei_data = []
        for user in users:
            user_data = {
                "cesar_id": cesar.id,
                "username": user.username,
                "email": user.email,
                "propietaUser": {
                    "gold": user.propietaUser.gold,
                    "bestiame": user.propietaUser.bestiame,
                    "kids": user.propietaUser.kids,
                },
            }
            plebei_data.append(user_data)

        return jsonify({"cesar": cesar_data, "plebei": plebei_data}), HTTP_200_OK

    return jsonify({"error": "Cesar not found"}), HTTP_400_BAD_REQUEST


@cesar.route("/conscription", methods=["POST"])
@jwt_required()
def conscription():
    cesar_id = get_jwt_identity()
    cesar = Cesar.query.filter_by(id=cesar_id).first()

    if cesar:
        subtract_kids = int(request.json.get("subtract_kids", 1))
        total_subtracted_kids = 0

        users = User.query.filter_by(cesar_id=cesar.id).all()

        for user in users:
            propieta_user = PropietaUtente.query.filter_by(user_id=user.id).first()

            if propieta_user and propieta_user.kids >= subtract_kids:
                propieta_user.kids -= subtract_kids
                total_subtracted_kids += subtract_kids

        cesar.military += total_subtracted_kids

        db.session.commit()

        return jsonify({"message": "Conscription completed"}), HTTP_200_OK

    return jsonify({"error": "Cesar not found"}), HTTP_400_BAD_REQUEST
