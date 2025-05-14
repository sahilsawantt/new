# from flask import Flask, jsonify, request

# app = Flask(__name__)

# scores = []

# @app.route('/scores', methods=['GET', 'POST'])
# def handle_scores():
#   if request.method == 'POST':
#     score = request.json['score']
#     scores.append(score)
#     return jsonify({'message': 'स्कोर संग्रहीत किया गया!'})
#   else:
#     return jsonify({'scores': scores})

# if __name__ == '__main__':
#   app.run(debug=True)