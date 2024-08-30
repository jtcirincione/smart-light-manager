from flask import Flask, Blueprint, request
import jwt
from datetime import datetime, timedelta
from functools import wraps

signup = Blueprint('signup', __name__)


@signup.route("/register", methods=["POST"])
def register():
    data = request.json
    print(f"data: {data}")
    return "f"