"""Server for Hackbright Project"""

from flask import Flask, render_template, request, flash, redirect, session, jsonify
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
    #returns true or false
    
    if user:
        correct_pass = crud.verify_user_password(email, password)
        #returns true or false 
        if correct_pass:
            session['email'] = email
            session['password'] = password
            
            flash("Login Successful")
            return redirect("/criteria")
        else:
            flash("Incorrect password")
            return redirect("/login")
    else: 
        flash("No user with these credentials")
        return redirect("/login")





@app.route("/createuser", methods=['POST'])
def create_user():
    """create a new user"""
    
    email = request.form.get("email", "").lower()
    password = request.form.get("password", "")
    fname = request.form.get("fname", "").title()
    lname = request.form.get("lname", "").title()
    default_location = request.form.get("default_loc", "")

    user = crud.verify_user_by_email(email)

    if user:
        flash('User Already Exists, please log in.')
    else:
        crud.create_user(email, password, fname, lname, default_location)
        session['user_email'] = email
        session['user_password'] = password
        session['user_fname'] = fname
        session['user_lname'] = lname
        session['default_location'] = default_location
        flash("Successfully Created Profile and Logged In")
        return redirect("/criteria")




@app.route("/results-top", methods=['POST'])
def get_results():
    """search for local restaurants with parameters"""

    url = "https://api.yelp.com/v3/businesses/search"
    auth = {'Authorization': YELP_KEY}
    payload = {'radius' : '40000', 'limit' : '30'}


    search = request.json.get("term")
    location = request.json.get("location")
    sort = request.json.get("sort_by")
    price = request.json.get("price")
    open_now = request.json.get("open_now")
    # default = crud.return_user_default_location("becky@gardings.com")

    if search != '':
        payload['term'] = search
    if price != '':
        payload['price'] = price
    if sort != '':
        payload['sort_by'] = sort
    if location != '':
        payload['location'] = location
    # if session:
    #     payload['location'] = default
    payload['open_now'] = open_now
    
    data = requests.get(url, params=payload, headers=auth).json()
    # print(data)
    # data1 = {} 
    # data2 = {}   
   
    # for num in range(0, 19):
    #     array = {}
    #     array['name'] = data['businesses'][num]['name']
    #     array['image'] = data['businesses'][num]['image_url']
    #     array['url'] = data['businesses'][num]['url']
    #     array['rating'] = data['businesses'][num]['rating']
    #     array['address'] = data['businesses'][num]['location']['display_address']
    #     array['phone'] = data['businesses'][num]['display_phone']
    #     array['distance'] = data['businesses'][num]['distance']
    #     data1[num] = array
    # session['data'] = data1

    # for num in range(20, 29):
    #     array = {}
    #     array['name'] = data['businesses'][num]['name']
    #     array['image'] = data['businesses'][num]['image_url']
    #     array['url'] = data['businesses'][num]['url']
    #     array['rating'] = data['businesses'][num]['rating']
    #     array['address'] = data['businesses'][num]['location']['display_address']
    #     array['phone'] = data['businesses'][num]['display_phone']
    #     array['distance'] = data['businesses'][num]['distance']
    #     data1[num] = array
    # session['data2'] = data2
    
    return jsonify(data)

# @app.route("/tierone")
# def start_tier_one():
#     return render_template("results-top.html")


if __name__ == "__main__":
    model.connect_to_db(app)
    app.run(
    host="0.0.0.0",
    use_reloader=True,
    use_debugger=True,
)