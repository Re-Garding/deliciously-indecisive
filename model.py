"""Models for Delicious Indecisions app"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """A User"""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(20),nullable=False)
    fname = db.Column(db.String(20), nullable=False)
    lname = db.Column(db.String(20), nullable=False)
    default_location = db.Column(db.String(100))


    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class Rating(db.Model):
    """a Rating"""

    __tablename__ = 'ratings'

    rating_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    search_location = db.Column(db.String(100), nullable=False)
    distance = db.Column(db.Float(10), nullable=False)
    category1 = db.Column(db.String(50))
    category2 = db.Column(db.String(50))
    category3 = db.Column(db.String(50))



    def __repr__(self):
        return f'<Rating rating_id={self.rating_id} score={self.rating}>'

    restaurant = db.relationship('Restaurant', backref="rating")
    user = db.relationship('User', backref="rating")

class Restaurant(db.Model):
    """A Restaurant"""

    __tablename__ = 'restaurants'

    restaurant_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(200))
    img_url = db.Column(db.String(500))
    url = db.Column(db.String(500), nullable=False)
    phone = db.Column(db.String(15))
    city = db.Column(db.String(50))

    def __repr__(self):
        return f'<Restaurant ID={self.restaurant_id} name={self.name}>'




def connect_to_db(flask_app, db_uri="postgresql:///ratings", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")

def test_data():
    """example data for testing"""
    User.query.delete()
    Restaurant.query.delete()
    Rating.query.delete()

    u1 = User(user_id='2', email='beckyg@gardings.com', password='12345', fname='Becky', lname='Garding', 
    default_location='Eagle Mountian, UT')
    u2 = User(user_id='3', email='laura@gardings.com', password='12345', fname='Laura', lname='Shafer', 
    default_location='Spokane WA')
    u3 = User(user_id='4', email='diane@gardings.com', password='12345', fname='Diane', lname='Garding', 
    default_location='Eagle Mountian, UT')

    rest1 = Restaurant(restaurant_id='1', name='Toscanos', address='123 Fake St', img_url='fakeurl.com', 
    url='newurl.com', phone='123-456-7891', city='Eagle Mountain')
    rest2 = Restaurant(restaurant_id='2', name='Pizza Hut', address='321 Fake St', img_url='fakeurl.com', 
    url='newurl.com', phone='123-456-7890', city='Eagle Mountain')
    rest3 = Restaurant(restaurant_id='3', name='Zuppas', address='456 Fake St', img_url='fakeurl.com', 
    url='newurl.com', phone='123-456-7892', city='Eagle Mountain')

    r1 = Rating(restaurant_id=rest1.restaurant_id, user_id=u1.user_id, rating='5', name='Toscanos',
     search_location='Eagle Mountain, UT', distance='4500', category1='Brazilian', 
     category2='Meat', category3='Swords')

    r2 = Rating(restaurant_id=rest2.restaurant_id, user_id=u1.user_id, rating='4.5', name='Pizza Hut',
     search_location='Eagle Mountain, UT', distance='2500', category1='Pizza', 
     category2='Italian', category3='')

    r3 = Rating(restaurant_id=rest3.restaurant_id, user_id=u3.user_id, rating='5', name='Zuppas',
     search_location='Eagle Mountain, UT', distance='35000', category1='Soup', 
     category2='Salad', category3='Sandwich')

    db.session.add_all([u1, u2, u3, rest1, rest2, rest3, r1, r2, r3])
    db.session.commit()

if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)