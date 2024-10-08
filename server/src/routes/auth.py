from flask import Flask, Blueprint, request, make_response, current_app, Response
import jwt, hashlib, os, json
from datetime import datetime, timedelta
from functools import wraps
from middleware.validate_token import token_required
from models.user import User
from database import db
from sqlalchemy import exc
from utils.db_helper import create_user, add_role

auth = Blueprint('signup', __name__)

def generate_salt():
    salt = os.urandom(32)
    return salt

def hash_password(password: str, salt: bytes, iterations=100000):
    
    hash = hashlib.pbkdf2_hmac("sha512", password.encode('utf-8'), salt, iterations)
    return hash.hex()

@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data['username']
    password = data['password']
    email = data['email']
    salt = generate_salt()
    password_hash = hash_password(password, salt)
    user = User(username=username, email=email, password=password_hash, salt=salt.hex())
    with current_app.app_context():
        try:
            create_user(user)
        except Exception as e:
            print(f"Unable to add data to database: {e}")
            if type(e) == exc.IntegrityError:
                return {
                        "message": f"User with username: {username} already exists.",
                        "data": None,
                }, 400
            else:
                return {
                        "message": f"Server error",
                        "data": None,
                }, 500  
            


    return "", 201


@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    username: str = data['username']
    password: str = data['password']

    with current_app.app_context():
        try:
            # db.session.add(user)
            user = db.session.query(User).filter_by(username=username).first()
            if not user:
                return {
                    "message": f"Incorrect username or password",
                    "data": None
                }, 401
            salt = bytes.fromhex(user.salt)
            password_hash = hash_password(password, salt)
            if not password_hash == user.password:
                return {
                    "message": f"Incorrect username or password",
                    "data": None
                }, 401
        except Exception as e:
            print(f"Unable to get data from database: {e}")
            return {
                    "message": f"Server error",
                    "data": None,
            }, 500  
        expiration_time = datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
        token = jwt.encode(
                    {"user_id": user.user_id,
                     "exp": expiration_time,
                     "iat": datetime.utcnow()},
                    current_app.config["SECRET_KEY"],
                    algorithm="HS512"
                )
        response = make_response()
        response.set_cookie("token", token, max_age=3600, httponly=True, secure=True)
        response.status_code = 200
        return response


    return "", 201

@auth.route("/auth/status", methods=["GET"])
@token_required(required_permissions=None)
def status(user: User):
    return {
        "data": user.toJSON(),
        "message": "Success"
        }, 200

@auth.route("/auth/logout", methods=["DELETE"])
@token_required(required_permissions=None)
def logout(user: User):
    response = make_response()
    response.delete_cookie(key="token", secure=True, httponly=True)