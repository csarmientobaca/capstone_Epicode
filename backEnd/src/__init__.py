from flask import Flask
import os
import psycopg2
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

from flask_cors import CORS
from src.auth import auth
from src.propietautente import propietautente
from src.database import db

load_dotenv()


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    url = os.environ.get("DATABASE_URL")

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get("JWT_SECRET"),
            SQLALCHEMY_DATABASE_URI=url,
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
            JWT_SECRET_KEY=os.environ.get("JWT_SECRET_KEY"),
        )
    else:
        app.config.from_mapping("/")

    db.app = app
    db.init_app(app)

    JWTManager(app)

    app.register_blueprint(auth)
    app.register_blueprint(propietautente)

    return app
