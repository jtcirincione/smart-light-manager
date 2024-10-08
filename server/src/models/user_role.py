from database import db
from sqlalchemy import Integer, ForeignKey, Column
from models.permissions import Role
from sqlalchemy.orm import relationship

class UserRole(db.Model):
    __tablename__ = 'user_roles'
    __table_args__= {'schema':'lights'}
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.user_id'))
    role_id = Column(Integer, ForeignKey('role.id'))