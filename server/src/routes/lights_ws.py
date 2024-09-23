from io_blueprint import IOBlueprint
from flask_socketio import emit, disconnect
from middleware.validate_token import token_required
import asyncio, lights

socket = IOBlueprint('lights_ws', __name__)

@socket.on('connect')
def handle_connect():
    print("Client connected")

@socket.on('disconnect')
def handle_disconnect():
    print("Client disconnected")


@socket.on('color')
@token_required(required_permissions=["manager"])
def change_color(user, data):
    hsv = data["hsv"]
    asyncio.run(lights.change_color(int(hsv["h"]), int(hsv["s"]), int(hsv["v"])))
    emit('color_response', {'status': 'received'})