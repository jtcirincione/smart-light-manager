from database import db
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from flask import current_app

class Role(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    


    def create_roles():
        with current_app.app_context():
            roles = db.session.query(Role).count()
            if roles:
                return
            roles = [Role(name="admin"), Role(name="manager"), Role(name="default")]
            db.session.bulk_save_objects(roles)
            db.session.commit()
