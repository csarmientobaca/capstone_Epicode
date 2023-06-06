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

from src.database import User, db, PropietaUtente

auth = Blueprint("auth", __name__, url_prefix="/api/v1/auth")


@auth.post("/register")
def register():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]

    if len(password) < 5:
        return (
            jsonify({"error": "usa una password piu lunga di 5 carateri"}),
            HTTP_400_BAD_REQUEST,
        )

    if len(username) < 3:
        return (
            jsonify({"error": "usa un user piu lunga di 3 caratteri"}),
            HTTP_400_BAD_REQUEST,
        )

    if not username.isalnum() or " " in username:
        return (
            jsonify({"error": "username deve essere alphanumerico e non avere spazi"}),
            HTTP_400_BAD_REQUEST,
        )

    if not validators.email(email):
        return jsonify({"error": "devi inserire una email"}), HTTP_400_BAD_REQUEST

    if User.query.filter_by(email=email).first() is not None:
        return jsonify({"error": "email gia usata da altro utente"}), HTTP_409_CONFLICT

    if User.query.filter_by(username=username).first() is not None:
        return (
            jsonify({"error": "username gia usato da altro utente"}),
            HTTP_409_CONFLICT,
        )

    pwd_hash = generate_password_hash(password)

    user = User(username=username, password=pwd_hash, email=email)

    propietautente = PropietaUtente(gold=100, bestiame=2, kids=0)

    user.propietaUser = propietautente  # Assign the PropietaUtente instance to the User's propietaUser attribute

    db.session.add(user)
    db.session.commit()

    return (
        jsonify(
            {"message": "User created", "user": {"username": username, "email": email}}
        ),
        HTTP_201_CREATED,
    )


@auth.post("/login")
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()

    if user:
        is_pass_correct = check_password_hash(user.password, password)

        if is_pass_correct:
            refresh = create_refresh_token(identity=user.id)
            access = create_access_token(identity=user.id)

            return (
                jsonify(
                    {
                        "user": {
                            "refresh": refresh,
                            "access": access,
                            "username": user.username,
                            "email": user.email,
                        }
                    }
                ),
                HTTP_200_OK,
            )

    return jsonify({"error": "wrong credentials"})


@auth.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if user.propietaUser is not None:
        propieta_user_data = {
            "id": user.propietaUser.id,
            "gold": user.propietaUser.gold,
            "bestiame": user.propietaUser.bestiame,
            "kids": user.propietaUser.kids,
        }
    else:
        propieta_user_data = None
    return (
        jsonify(
            {
                "username": user.username,
                "email": user.email,
                "propietaUser": propieta_user_data,
            }
        ),
        HTTP_200_OK,
    )


@auth.get("/token/refresh")
@jwt_required(refresh=True)
def refresh_token_user():
    identity = get_jwt_identity()
    access = create_access_token(identity=identity)

    return jsonify({"access": access}), HTTP_200_OK
