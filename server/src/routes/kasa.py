from middleware.validate_token import token_required
from flask import Flask, Blueprint, request, make_response, current_app
import lights, asyncio
kasa_routes = Blueprint("kasaroutes", __name__)

@kasa_routes.route("/lights/on")
@token_required(required_permissions=["Admin"])
def turn_on(user):
    try:
        asyncio.run(lights.on())
    except:
        pass
    return "", 200

@kasa_routes.route("/lights/off", methods=["GET"])
@token_required(required_permissions=["Admin"])
def turn_off(user):
    try:
        asyncio.run(lights.off())
    except:
        pass
    return "", 200