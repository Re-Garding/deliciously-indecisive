"""Server for Hackbright Project"""

from flask import Flask, render_template, request, flash
import os, model, crud
import requests


app = Flask(__name__)
app.secret_key = "mysecretkeyisSecret"
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
    auth = {'Authorization': YELP_KEY}
    payload = {'is_closed' : True}

    search = request.args.get("search", '').lower()
    location = request.args.get("location", '').lower()
    radius = request.args.get("radius", '')
    categories = request.args.getlist("categories", '')
    sort = request.args.get("sort_by", '').lower()

    if location:
        payload['location'] = location
    if search:
        payload['search'] = search
    if radius:
        payload['radius'] = radius
    if categories:
        payload['categories'] = categories
    if sort:
        payload['sort_by'] = sort
    

    data = requests.get(url, params=payload, headers=auth).json()


    if location and search:
        return render_template("results-top.html", data=data)
    else:
         return render_template("criteria.html")


if __name__ == "__main__":
    app.run(
    host="0.0.0.0",
    use_reloader=True,
    use_debugger=True,
)