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
