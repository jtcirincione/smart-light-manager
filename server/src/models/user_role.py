from database import db
from sqlalchemy import Integer, ForeignKey, Column
from models.permissions import Role
class UserRole(db.Model):
    __tablename__ = 'user_roles'
    __table_args__= {'schema':'lights'}
    user_id = Column(Integer, ForeignKey('user.user_id'), primary_key=True)
    role_id = Column(Integer, ForeignKey('role.id'), primary_key=True)