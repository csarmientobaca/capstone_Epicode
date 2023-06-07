# import os
# import psycopg2
# from dotenv import load_dotenv
# from flask import Flask, request, jsonify, url_for, Blueprint

# from flask_cors import CORS

# from flask_jwt_extended import create_access_token
# from flask_jwt_extended import get_jwt_identity
# from flask_jwt_extended import jwt_required
# from flask_jwt_extended import JWTManager

# load_dotenv()

# reate flask app
# app = Flask(__name__)
# CORS(app)

# # Setup the Flask-JWT-Extended extension
# app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
# jwt = JWTManager(app)


# url = os.environ.get("DATABASE_URL")
# connection = psycopg2.connect(url)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
# @app.route("/token", methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     if email != "test" or password != "test":
#         return jsonify({"msg": "Bad email or password"}), 401

#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token)
