"""Server for Hackbright Project"""

from flask import Flask, render_template, request, flash, redirect, session
from jinja2 import StrictUndefined
import os, model, crud, requests

app = Flask(__name__)
app.secret_key = "mysecretkeyisSecret"
YELP_KEY = os.environ['API_KEY']
app.jinja_env.undefined = StrictUndefined

@app.route("/")
def homepage():
    """render homepage"""
    return render_template("homepage.html")


@app.route("/criteria")
def criteria():
    """ask for serach criteria"""
    return render_template("criteria.html")

@app.route("/login")
def login():
    """ask for login info"""
    return render_template("login.html")

@app.route("/createuser")
def create_user1():
    """create user and log them in"""
    return render_template("createuser.html")


@app.route("/login", methods=["POST"])
def login_user():
    """login an existing user"""
    email = request.form.get("email", '').lower()
    password = request.form.get("password", '')

    user = crud.verify_user_by_email(email)
    
    if user == True:
        correct_pass = crud.get_user_password(email, password)
        if correct_pass:
            session['user_email'] = email
            session['user_password'] = password
            
            flash("Login Successful")
            return redirect("/criteria")
        else:
            flash("Incorrect password")
        return redirect("/")
    else: 
        flash("No user with these credentials")
        return redirect("/")

# @app.route("/loggedin", methods=['POST'])
# def create_user():
#     """create a new user"""
    
#     email = request.args.get("email", "")
#     password = request.args.get("password", "")
#     fname = request.args.get("fname", "")
#     lname = request.args.get("lname", "")
#     default_location = request.args.get("default_loc", "")

#     user = crud.get_user_email(email)

#     if user:
#         flash('User Already Exists, please log in.')
#     else:
#         crud.create_user(email, password, fname, lname, default_location)
#         session['user_email'] = email
#         session['user_password'] = password
#         session['user_fname'] = fname
#         session['user_lname'] = lname
#         session['default_location'] = default_location
#         flash("Successfully Created Profile and Logged In")
#         return redirect("/criteria")



@app.route("/results-top")
def get_results():
    """search for local restaurants with parameters"""

    url = "https://api.yelp.com/v3/businesses/search"
    auth = {'Authorization': YELP_KEY}
    payload = {'is_closed' : False, 'radius' : '40,000'}

    search = request.args.get("search", '')
    location = request.args.get("location", '')
    
    categories = request.args.getlist("categories", '')
    sort = request.args.get("sort_by", '')
    default = crud.return_user_default_location(session['user_email'])

    if session:
        payload['location'] = default
    else:
        payload['location'] = location
    if search:
        payload['term'] = search
    if categories:
        payload['categories'] = categories
    if sort:
        payload['sort_by'] = sort
    

    data = requests.get(url, params=payload, headers=auth).json()
    length = len(data.keys())

    if location == '':
       return render_template("criteria.html")
    else:
        return render_template("results-top.html", data=data, length=length)


if __name__ == "__main__":
    model.connect_to_db(app)
    app.run(
    host="0.0.0.0",
    use_reloader=True,
    use_debugger=True,
)