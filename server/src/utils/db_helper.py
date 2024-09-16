from models.user_model import UserModel
from models.user_role import UserRole
from models.permissions import Role
from enums.role_enum import RoleEnum
from database import db
from flask import current_app
from werkzeug.exceptions import NotFound
from classes.user import User
def create_user(user: UserModel, role: RoleEnum=RoleEnum.DEFAULT) -> None:
    with current_app.app_context():
        # Add new user
        try:
            db.session.add(user)
            db.session.commit()
        except Exception as e:
            print(f"Error creating user: {e}")
            raise e

        # add default role to user
        user_role = UserRole(user_id=user.user_id, role_id=role.value)
        try:
            db.session.add(user_role)
            db.session.commit()
        except Exception as e:
            raise e
        
def get_user_by_name(username: str) -> UserModel:
    user = db.session.query(UserModel).filter_by(username=username).first()
    return user

def get_users_by_name_like(uname: str) -> list[str]:
    search = f"{uname}%"
    users: list[UserModel] = db.session.query(UserModel).filter(UserModel.username.like(search))
    if not users:
        return []
    user_objects = []
    for user in users:
        roles = get_roles_for_user(user)
        user_objects.append(User.from_model(user, roles))
    return user_objects


def get_user_with_roles(username: str) -> User:
    umodel: UserModel = get_user_by_name(username)
    roles: list[RoleEnum] = get_roles_for_user(umodel)
    return User.from_model(umodel, roles)

def add_role(user: User, role: RoleEnum) -> bool:
    with current_app.app_context():
        if not user_has_role(user, role):
            try:    
                db.session.add(UserRole(user_id=user.user_id, role_id=role.value))
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                raise e
            return True
        return False


def get_roles_for_user(user: UserModel) -> list[RoleEnum]:
    with current_app.app_context():
        user_roles = db.session.query(UserRole).filter_by(user_id=user.user_id).all()
        roles = []
        role_ids = [user_role.role_id for user_role in user_roles]
        for id in role_ids:
            if id == RoleEnum.ADMIN.value:
                roles.append(RoleEnum.ADMIN)
            elif id == RoleEnum.MANAGER.value:
                roles.append(RoleEnum.MANAGER)
            elif id == RoleEnum.DEFAULT.value:
                roles.append(RoleEnum.DEFAULT)
        return roles
    
def get_roles_for_username(username: str) -> list[RoleEnum]:
    with current_app.app_context():
        user = db.session.query(UserModel).filter_by(username=username).first()
        if not user:
            raise NotFound(f"User with username: {username} not found")
        user_roles = db.session.query(UserRole).filter_by(user_id=user.user_id).all()
        roles = []
        role_ids = [user_role.role_id for user_role in user_roles]
        for id in role_ids:
            if id == RoleEnum.ADMIN.value:
                roles.append(RoleEnum.ADMIN)
            elif id == RoleEnum.MANAGER.value:
                roles.append(RoleEnum.MANAGER)
            elif id == RoleEnum.DEFAULT.value:
                roles.append(RoleEnum.DEFAULT)
        return roles
    
def user_has_role(user: UserModel, role:RoleEnum) -> bool:
    roles_for_user: list[RoleEnum] = get_roles_for_user(user)
    return role in roles_for_user


#TODO: finish method
def delete_role_for_username(username: str, role: RoleEnum) -> bool:
    user = get_user_with_roles(username)
    if role in [role for role in user.get_roles()] and role != RoleEnum.DEFAULT:
        with current_app.app_context():
            try:
                db.session.query(UserRole).filter_by(user_id=user.id, role_id=role.value).delete()
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                return False
        return True
    return False