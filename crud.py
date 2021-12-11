"""Crud operations"""
from model import db, User, Rating, Restaurant, connect_to_db



def create_user(email, password, fname, lname, default_location):
    """Create and return new user"""

    user = User(email=email, password=password, fname=fname, lname=lname, default_location=default_location)
    db.session.add(user)
    db.session.commit()

    return user


def create_restaurant(name, address, img_url, url, phone):
    """Create new database restaurant"""

    restaurant = Restaurant(name=name, address=address, img_url=img_url, url=url, phone=phone)
    db.session.add(restaurant)
    db.session.commit()

    return restaurant

def create_rating(restaurant, user, rating):
    """create new rating"""
    userid = User.query.get(user)
    restid = Restaurant.query.get(restaurant)

    rate = Rating(user=userid, restaurant=restid, rating=rating)

    db.session.add(rating)
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

def return_user_default_location(email):
    """finds user by passed in email and 
    returns said users default location"""

    u = User.query.filter(User.email==email).first()

    return u.default_location
