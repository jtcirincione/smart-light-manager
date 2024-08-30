from flask import Flask
from routes.signup import signup
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.register_blueprint(signup)

load_dotenv()

# Route for the home page
@app.route('/')
def home():
    return "HI"


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)