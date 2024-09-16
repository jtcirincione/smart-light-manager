from database import db
from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship
from models.user_role import UserRole

class UserModel(db.Model):
    __tablename__ = "user"
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(Text, nullable=False)
    salt = Column(Text, nullable=False)

    # Define the relationship to UserRole with cascading delete
    # roles = relationship("UserRole", cascade="all, delete-orphan", backref="user")

    def toJSON(self):
        return {
            "userId": self.user_id,
            "username": self.username,
            "email": self.email,
        }
