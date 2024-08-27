from flask import Flask

app = Flask(__name__)

# Route for the home page
@app.route('/')
def home():
    return "HI"