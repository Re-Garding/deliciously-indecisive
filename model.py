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

if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)