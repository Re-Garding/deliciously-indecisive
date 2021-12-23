"""Server for Hackbright Project"""

from flask import Flask, render_template, request, flash, redirect, session, jsonify
from jinja2 import StrictUndefined
import os, model, crud, requests




app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']
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
            session['default_location'] = crud.return_user_default_location(email)
            session['fname'] = crud.return_user_fname(email)
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
        session['email'] = email
        session['password'] = password
        session['fname'] = fname
        session['lname'] = lname
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
    
    

    if search != '':
        payload['term'] = search
    if price != '':
        payload['price'] = price
    if sort != '':
        payload['sort_by'] = sort
    payload['open_now'] = open_now
    if location != '':
        payload['location'] = location

    if session:
        email = session['email']
        default = crud.return_user_default_location(email)
        payload['location'] = default
    elif location == None:
        flash("Please enter a location")
        return redirect("/criteria")

    data = requests.get(url, params=payload, headers=auth).json()

    
    return jsonify(data)


@app.route("/add-rating", methods=['POST'])
def post_rating():
    """verify restaurant in database, if not present, add it 
    and log a rating for the logged in user"""

    user_email = session['email']
    user = crud.return_user(user_email)
    user_id = user.user_id

    name = request.json.get('name')
    phone = request.json.get('display_phone')
    location = request.json.get('location')
    address = location['address1']
    image = request.json.get('image_url')
    url = request.json.get('url')
    rating = float(request.json.get('rating'))

    rest = crud.return_rest(name, phone)

    rated = crud.check_for_rating(restaurant_id, user_id)

    if rest:
        rated = crud.check_for_rating(rest.restaurant_id, user_id)
        if rated == False:
            crud.create_rating(rest.restaurant_id, user_id, rating)
        else:
            return print("Already Rated")
    else:
        restaurant = crud.create_restaurant(name, address, image, url, phone)
        crud.create_rating(restaurant.restaurant_id, user_id, rating)
        
    return "successfully rated"




if __name__ == "__main__":
    model.connect_to_db(app)
    app.run(
    host="0.0.0.0",
    use_reloader=True,
    use_debugger=True,
)