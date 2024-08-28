from flask import Flask

from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

# Route for the home page
@app.route('/')
def home():
    return "HI"


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)