"""Crud operations"""
from model import db, User, Rating, Restaurant, connect_to_db



def create_user(email, password, fname, lname, default_location):
    """Create and return new user"""

    user = User(email=email, password=password, fname=fname, lname=lname, default_location=default_location)
    db.session.add(user)
    db.session.commit()

    return user


def create_restaurant(name, address, img_url, url, phone, city):
    """Create new database restaurant"""

    restaurant = Restaurant(name=name, address=address, img_url=img_url, url=url, phone=phone, city=city)
    db.session.add(restaurant)
    db.session.commit()

    return restaurant

def create_rating(restaurant, user, rating, name, search_location, distance):
    """create new rating"""
    userid = User.query.get(user)
    restid = Restaurant.query.get(restaurant)

    rate = Rating(user=userid, restaurant=restid, rating=rating, name=name, search_location=search_location, distance=distance)

    db.session.add(rate)
    db.session.commit()
    return rate

def verify_user_password(email, password):
    """pulls user object from database by email
        and compares to passed in password. If there
        is a match it returns True"""
        
    u = User.query.filter(User.email==email).first()

    if u.password == password:
        return True
    else:
        return False

def verify_user_by_email(email):
    """returns True if a user exists with the passed in email"""

    u = User.query.filter(User.email==email).first()

    if u:
        return True
    else:
        return False

def return_user(email):
    """takes in an email and returns a user obejct"""
    u = User.query.filter(User.email==email).first()

    return u


def return_user_default_location(email):
    """finds user by passed in email and 
    returns said users default location"""

    u = User.query.filter(User.email==email).first()

    return u.default_location

def return_user_fname(email):
    """finds user name by passed in email and 
    returns said user first name"""

    u = User.query.filter(User.email==email).first()

    return u.fname

def verify_restaurant(name, phone):
    """verifies whether a restaurant is in the database or not
        returns true or false"""
    r = Restaurant.query.filter(Restaurant.name==name, Restaurant.phone==phone).first()

    if r:
        return True
    else:
        return False

def return_rest(name, phone):
    """takes in name and phone and returns restaurant object"""
    r = Restaurant.query.filter(Restaurant.name==name, Restaurant.phone==phone).first()
    return r

def check_for_rating(restaurant_id, user_id):
    """takes in restaurant id and user id and checks for a rating. 
    It returns true or false"""
    r = Rating.query.filter(restaurant_id==restaurant_id, user_id==user_id)
    if r:
        return True
    else:
        return False


def delete_rating(user_id, restaurant_id):

    Rating.query.filter(Rating.user_id==user_id, Rating.restaurant_id==restaurant_id).delete()

    db.session.commit()
    return "Deleted"

def list_rated_rests(user_id):
    r = {}
    r['businesses'] = []
    
    rates = Rating.query.options(db.joinedload('restaurant')).filter(Rating.user_id==user_id).all()

    for inc in range(len(rates)):
        item = rates[inc]
        inc = {}
        inc['location'] = {}

        inc["name"] = item.restaurant.name
        inc["image_url"] = item.restaurant.img_url
        inc["review_count"] = ""
        inc["url"] = item.restaurant.url    
        inc["rating"] = item.rating
        inc["location"]["address1"] = item.restaurant.address
        inc["location"]["city"] = item.restaurant.city
        inc["phone"] = item.restaurant.phone
        inc["distance"] = item.distance
        inc['search_location'] = item.search_location

        r['businesses'].append(inc)
    r['total'] = len(r['businesses'])
    r['database'] = 'yes'
    return r