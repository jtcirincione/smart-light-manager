from database import db
from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship

class User(db.Model):
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(Text, nullable=False)
    salt = Column(Text, nullable=False)
    roles = relationship('Role', back_populates='users')


    def toJSON(self):
        return {
            "userId": self.user_id,
            "username": self.username,
            "email": self.email
        }