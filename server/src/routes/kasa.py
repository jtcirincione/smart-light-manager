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

@kasa_routes.route("/lights/status", methods=["GET"])
@token_required(required_permissions=["manager"])
def get_status(user):
    try:
        is_on = asyncio.run(lights.get_status())
        return {"status": "on" if is_on else "off"}, 200
    except:
        return "", 500

@kasa_routes.route("/lights/morning", methods=["POST"])
def morning():
    data = request.json
    print("error")
    if data["key"] == current_app.config["ADMIN_KEY"]:
        asyncio.run(lights.on())
        try:
            asyncio.run(lights.change_color(51, int(40), int(100)))
            asyncio.run(lights.change_brightness(100))
        except Exception as e:
            return {"error": str(e)}, 500
    return "", 200
