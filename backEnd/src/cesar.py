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

cesar = Blueprint("cesar", __name__, url_prefix="/api/v1/cesar")
