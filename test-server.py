"""tests for Deliciously Indecisive"""

import server, crud
import unittest
from model import connect_to_db, db, test_data
from flask import session



class AppIntegrationTests(unittest.TestCase):
    """Testing Flask Server"""

# Setup and Teardown established

    def setUp(self):
        """to reduce repetetive code"""
        self.client = server.app.test_client()
        server.app.config['TESTING'] = True

    


# Tests for static pages below:

    def test_homepage(self):
        """test homepage"""
        result = self.client.get('/')
        self.assertIn(b'<h1>Welcome to Deliciously Indecisive!</h1>', 
        result.data)


    def test_login_page(self):
        """test login page"""
        result = self.client.get('/login')
        self.assertIn(b'<form action="/login" method="POST">',
        result.data)

    def test_createuser_page(self):
        """test create user page"""
        result = self.client.get('/createuser')
        self.assertIn(b'<form action="/createuser" method="POST">',
        result.data)

    def test_criteria_page(self):
        """test criteria base page - before react"""
        result = self.client.get('/criteria')
        self.assertIn(b'<div id="locate">',
        result.data)


class FlaskTestsDatabase(unittest.TestCase):
    """Flask Database Tests"""

    def setUp(self):
        """to reduce repetetive code"""
        self.client = server.app.test_client()
        server.app.config['TESTING'] = True

        connect_to_db(server.app, "postgresql:///testdb")
        db.create_all()
        test_data()
    
    def tearDown(self):
        """for database tests"""
        db.session.remove()
        db.drop_all()
        db.engine.dispose()


# Post test for create user and login

    def test_login_function(self):
        """test login functionality with test db"""
        result = self.client.post('/login', data= {'email' : 'beckyg@gardings.com', 
        'password' : '12345'}, follow_redirects=True)
        self.assertIn(b'<div id="locate">', result.data)



    def test_create_user(self):
        """test create user db functionality"""
        result = self.client.post('/createuser', data={'email' : 'phil@gardings.com', 
        'password' : '13254', 'fname' : 'Phil', 'lname' : 'Garding', 
        'default_location' : 'Eagle Mountain'}, follow_redirects=True)
        self.assertIn(b'<div id="locate">', result.data)


if __name__ == '__main__':
    # If called like a script, run our tests
    unittest.main()