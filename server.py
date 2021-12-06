"""Server for Hackbright Project"""

import Flask, render_template from Flask

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("homepage.html")


@app.route("/criteria")
def criteria():
    return render_template("criteria.html")