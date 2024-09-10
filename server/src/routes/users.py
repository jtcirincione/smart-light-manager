from flask import current_app, Blueprint
from middleware.validate_token import token_required
from utils.db_helper import get_users_by_name_like

users = Blueprint('users', __name__)

@users.route("/users/<username>")
@token_required(required_permissions=["manager"])
def get_user_by_name_like(user, username):
    usernames = get_users_by_name_like(username)
    return {
        "usernames": usernames
    }, 200