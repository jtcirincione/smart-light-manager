from flask import Flask
from database import db
from routes.auth import auth
from routes.kasa import kasa_routes
from routes.permissions_service import permissions_service
from routes.lights_ws import socket
from routes.users import users
from dotenv import load_dotenv
import os
from flask_sqlalchemy import SQLAlchemy
from models.user_model import UserModel
from models.permissions import Role
from models.user_role import UserRole
import asyncio
from kasa import Discover
from lights import setup
from flask_socketio import SocketIO

def create_app():
    app = Flask(__name__)
    app.register_blueprint(auth)
    app.register_blueprint(kasa_routes)
    app.register_blueprint(permissions_service)
    app.register_blueprint(users)

    load_dotenv()
    HOST = os.getenv("DB_HOST")
    USERNAME = os.getenv("MYSQL_USER")
    PASSWORD = os.getenv("MYSQL_PASSWORD")
    PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("MYSQL_DATABASE")
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}'
    app.config['SECRET_KEY'] = os.getenv("API_SECRET_KEY")
    app.config['ADMIN_KEY'] = os.getenv("SUPER_USER_KEY")
    db.init_app(app)

    device = asyncio.run(setup())
    app.config['KASA_DEVICE'] = device
    return app

def create_database(app):
    with app.app_context():
        db.create_all()
        Role.create_roles()

def create_socketio(app):
    socketio = SocketIO(app, cors_allowed_origins="*", path="/server/socket.io")
    app.register_blueprint(socket)
    return socketio


if __name__ == '__main__':
    app = create_app()
    socketio = create_socketio(app)
    create_database(app)
    # socketio.run(app=app, host='0.0.0.0', debug=True)
    socketio.run(app=app, host='0.0.0.0', debug=True, allow_unsafe_werkzeug=True)