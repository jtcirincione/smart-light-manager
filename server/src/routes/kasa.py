from middleware.validate_token import token_required
from flask import Flask, Blueprint, request, make_response, current_app
import lights, asyncio
kasa_routes = Blueprint("kasaroutes", __name__)

@kasa_routes.route("/lights/on")
@token_required(required_permissions=["manager"])
def turn_on(user):
    try:
        asyncio.run(lights.on())
    except Exception as e:
        return {"error": str(e)}, 200
    return "", 200

@kasa_routes.route("/lights/off", methods=["GET"])
@token_required(required_permissions=["manager"])
def turn_off(user):
    try:
        asyncio.run(lights.off())
    except Exception as e:
        return {"error": str(e)}, 200
    return "", 200