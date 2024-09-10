from models.user import User
from models.user_role import UserRole
from models.permissions import Role
from enums.role_enum import RoleEnum
from database import db
from flask import current_app
def create_user(user: User, role: RoleEnum=RoleEnum.DEFAULT) -> None:
    with current_app.app_context():
        # Add new user
        try:
            db.session.add(user)
            db.session.commit()
        except Exception as e:
            print(f"Error creating user: {e}")

        # add default role to user
        user_role = UserRole(user_id=user.user_id, role_id=role.value)
        try:
            db.session.add(user_role)
            db.session.commit()
        except Exception as e:
            raise e
        
def get_user_by_name(username: str) -> User:
    user = db.session.query(User).filter_by(username=username).first()
    return user

def get_users_by_name_like(uname: str) -> list[str]:
    search = f"{uname}%"
    users: list[User] = db.session.query(User).filter(User.username.like(search))
    if not users:
        return []
    return [user.username for user in users]


def add_role(user: User, role: RoleEnum) -> None:
    with current_app.app_context():
        if not user_has_role(user, role):
            try:    
                db.session.add(UserRole(user_id=user.user_id, role_id=role.value))
                db.session.commit()
            except Exception as e:
                raise e


def get_roles_for_user(user: User) -> list[RoleEnum]:
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
    
def user_has_role(user: User, role:RoleEnum) -> bool:
    roles_for_user: list[RoleEnum] = get_roles_for_user(user)
    return role in roles_for_user
