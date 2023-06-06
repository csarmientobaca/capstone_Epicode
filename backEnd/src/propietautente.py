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

from src.database import User, db, PropietaUtente


propietautente = Blueprint(
    "propietautente", __name__, url_prefix="/api/v1/propietautente"
)


# @propietautente.get("/")
# def get_all():
#     return {"propietautente": []}


@propietautente.route("/propietame", methods=["GET"])
@jwt_required()
def getPropietautente():
    current_user = get_jwt_identity()
    if request.method == "GET":
        propietautente = PropietaUtente.query.filter_by(user_id=current_user).first()
        if propietautente is not None:
            data = {
                "bestiame": propietautente.bestiame,
                "gold": propietautente.gold,
                "id": propietautente.id,
                "kids": propietautente.kids,
            }
            return jsonify({"data": data}), HTTP_200_OK
        else:
            return (
                jsonify({"error": "No data found for the current user"}),
                HTTP_400_BAD_REQUEST,
            )


@propietautente.route("/changekids", methods=["POST"])
@jwt_required()
def changekids():
    current_user = get_jwt_identity()
    if request.method == "POST":
        propietautente = PropietaUtente.query.filter_by(user_id=current_user).first()
        if propietautente is not None:
            new_kids = request.json.get(
                "kids"
            )  # Assuming the new value is provided in the request JSON
            if new_kids is not None:
                propietautente.kids = new_kids
                db.session.commit()
                return (
                    jsonify({"message": "kids changed"}),
                    HTTP_200_OK,
                )
            else:
                return (
                    jsonify({"error": "Missing 'kids' property in the request"}),
                    HTTP_400_BAD_REQUEST,
                )
        else:
            return (
                jsonify({"error": "No data found for the current user"}),
                HTTP_400_BAD_REQUEST,
            )


@propietautente.route("/changebestiame", methods=["POST"])
@jwt_required()
def changebestiame():
    current_user = get_jwt_identity()
    if request.method == "POST":
        propietautente = PropietaUtente.query.filter_by(user_id=current_user).first()
        if propietautente is not None:
            propietautente.bestiame -= 1
            propietautente.gold += 100
            db.session.commit()
            return (
                jsonify({"message": "bestiame changed and gold increased"}),
                HTTP_200_OK,
            )
        else:
            return (
                jsonify({"error": "No data found for the current user"}),
                HTTP_400_BAD_REQUEST,
            )


@propietautente.route("/changegold", methods=["POST"])
@jwt_required()
def changegold():
    current_user = get_jwt_identity()
    if request.method == "POST":
        propietautente = PropietaUtente.query.filter_by(user_id=current_user).first()
        if propietautente is not None:
            propietautente.gold -= 100
            propietautente.bestiame += 1
            db.session.commit()
            return (
                jsonify({"message": "gold changed and bestiame increased"}),
                HTTP_200_OK,
            )
        else:
            return (
                jsonify({"error": "No data found for the current user"}),
                HTTP_400_BAD_REQUEST,
            )
