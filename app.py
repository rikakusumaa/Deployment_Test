from flask import Flask , render_template , request
import os

from numpy.core.records import recarray
import recsystem as rs


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods = ["POST","GET"])
def predict():
    if request.method == "POST":
        result = request.form
        songinput = result['songinput']
        rec = rs.music_recommendations(songinput)
        print(rec)
        return render_template("action.html", songrec='{}'.format(rec))


if __name__ == "__main__":
    app.run(host='localhost', debug=True)