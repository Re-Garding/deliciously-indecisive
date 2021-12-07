"""Server for Hackbright Project"""

from flask import Flask, render_template 
import os, model, crud



app = Flask(__name__)

YELP_KEY = os.environ['API_KEY']


@app.route("/")
def homepage():
    """render homepage"""
    return render_template("homepage.html")


@app.route("/criteria")
def criteria():
    """ask for serach criteria"""
    return render_template("criteria.html")

@app.route("/login")
def welcome():
    """ask for login info/create account"""
    return render_template("login.html")



@app.route("/results-top")
def get_results():
    """search for local restaurants with parameters"""

    url = "https://api.yelp.com/v3/businesses/search"
    auth = f'Authorization: Bearer {YELP_KEY}'
    
    return render_template("results-top.html", ) 


if __name__ == "__main__":
    app.run(
    host="0.0.0.0",
    use_reloader=True,
    use_debugger=True,
)