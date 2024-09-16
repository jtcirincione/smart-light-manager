from flask import current_app, Blueprint
from middleware.validate_token import token_required
from utils.db_helper import get_users_by_name_like
from classes.user import User

users = Blueprint('users', __name__)

@users.route("/users/<username>")
@token_required(required_permissions=["manager"])
def get_user_by_name_like(user, username):
    users: list[User] = get_users_by_name_like(username)
    return {
        "users": [user.to_dict() for user in users]
    }, 200