from flask import Flask, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)

CORS(app)  # Enable CORS for all routes

# Sample pickup lines
pickup_lines = [
    "Are you French? Because Eiffel for you.",
    "Do you have a name, or can I call you mine?",
    "Do you believe in love at first sight, or should I walk by again?",
    "Are you made of copper and tellurium? Because you're Cu-Te.",
    "Is your name Google? Because you have everything I’ve been searching for"
]

@app.route('/get-pickup-line', methods=['GET'])
def get_pickup_line():
    # Randomly select a pickup line
    line = random.choice(pickup_lines)
    return jsonify({'pickup_line': line})

if __name__ == '__main__':
    app.run(debug=True)
