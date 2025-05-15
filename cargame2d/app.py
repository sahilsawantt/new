from flask import Flask, render_template, request, jsonify
import json, os

app = Flask(__name__)
SCORE_FILE = "scores.json"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()
    name = data.get("name", "Anonymous")
    score = data.get("score", 0)

    if not os.path.exists(SCORE_FILE):
        with open(SCORE_FILE, "w") as f:
            json.dump([], f)

    with open(SCORE_FILE, "r") as f:
        scores = json.load(f)

    scores.append({"name": name, "score": score})
    scores = sorted(scores, key=lambda x: x["score"], reverse=True)[:10]

    with open(SCORE_FILE, "w") as f:
        json.dump(scores, f)

    return jsonify({"message": "Score submitted!"})

@app.route("/leaderboard")
def leaderboard():
    with open(SCORE_FILE, "r") as f:
        scores = json.load(f)
    return jsonify(scores)

if __name__ == "_main_":
    app.run(debug=True)