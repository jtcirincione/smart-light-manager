#TODO: Implement middleware

import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import current_app, request
from database import db
from models.user import User
def token_required(required_permissions):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.cookies.get("token")
            if not token:
                return {
                    "message": "Missing Authentication token!",
                    "data": None,
                    "error": "Unauthorized"
                }, 403
            
            try:
                with current_app.app_context():
                    data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS512'])
                    curr_user = db.session.query(User).get(data["user_id"])
                    if curr_user is None:
                        return {
                            "message": "Invalid authentication token",
                            "data": None,
                            "error": "Unauthorized"
                        }, 403
                if required_permissions:
                    for permission in required_permissions:
                        if permission not in data["permissions"]:
                            return {
                                "message": "Access Denied",
                                "data": None,
                                "error": "Unauthorized"
                            }, 403    
            except Exception as e:
                return {
                    "message": "Something went wrong",
                    "data": None,
                    "error": str(e)
                }, 500
            return f(curr_user, *args, **kwargs)
        return decorated
    return decorator