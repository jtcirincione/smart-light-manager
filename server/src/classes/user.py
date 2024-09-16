from models.user_model import UserModel
from enums.role_enum import RoleEnum
class User():


    def __init__(self, id: int, username: str, email: str, roles: list, password, salt):
        self.id = id
        self.username = username
        self.roles = roles
        self.email = email
        self.password = password
        self.salt = salt

    @classmethod
    def from_model(cls, user: UserModel, roles=[]) -> 'User':
        return cls(id = user.user_id, username=user.username, email=user.email, roles=roles, password=user.password, salt=user.salt)
    

    def set_roles(self, roles: list) -> None:
        self.roles = roles
    
    def add_roles(self, roles: list) -> None:
        self.roles.extend(roles)

    def set_email(self, email) -> None:
        self.email = email

    def set_username(self, username) -> None:
        self.username = username

    def get_roles(self) -> list[RoleEnum]:
        return self.roles
    
    def get_username(self) -> str:
        return self.username
    
    def get_email(self) -> str:
        return self.email
    
    def get_id(self) -> int:
        return self.id
    

    def to_dict(self) -> dict:
        return {
            "username": self.username,
            "email": self.email,
            "roles": [role.name for role in self.roles]
        }
