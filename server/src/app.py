from flask import Flask
from database import db
from routes.auth import auth
from dotenv import load_dotenv
import os
from flask_sqlalchemy import SQLAlchemy
from models.user import User
import asyncio
from kasa import Discover

def create_app():
    app = Flask(__name__)
    app.register_blueprint(auth)
    load_dotenv()
    HOST = os.getenv("DB_HOST")
    USERNAME = os.getenv("MYSQL_USER")
    PASSWORD = os.getenv("MYSQL_PASSWORD")
    PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("MYSQL_DATABASE")
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}'
    app.config['SECRET_KEY'] = os.getenv("API_SECRET_KEY")
    db.init_app(app)
    return app

def create_database(app):
    with app.app_context():
        db.create_all()

# async def start_kasa():
#     dev = await 
#     pass

if __name__ == '__main__':
    app = create_app()
    create_database(app)
    app.run(host='0.0.0.0', debug=True)