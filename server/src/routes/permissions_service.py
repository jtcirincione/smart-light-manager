from flask import Flask, Blueprint, request, make_response, current_app
from middleware.validate_token import token_required
from utils.db_helper import add_role, get_user_by_name
from enums.role_enum import RoleEnum

permissions_service = Blueprint('permissions', __name__)


@permissions_service.route("/permissions/admin", methods=["POST"])
@token_required(required_permissions=None)
def grant_admin_access(user):
    with current_app.app_context():
        admin_password = current_app.config["ADMIN_KEY"]
        print("password" + admin_password)
        data = request.json
        if data["password"] == admin_password:
            add_role(user, role=RoleEnum.ADMIN)
            add_role(user, role=RoleEnum.MANAGER)
            return "", 200
    return "", 400

@permissions_service.route("/permissions/manager", methods=["POST"])
@token_required(required_permissions=["admin"])
def grant_manager_access(user):
    with current_app.app_context():
        data = request.json
        user_to_grant = get_user_by_name(data["username"])
        add_role(user=user_to_grant, role=RoleEnum.MANAGER)
