import pytest
from flask_testing import TestCase
from app import app, db, models

class BaseTestCase(TestCase):
    def create_app(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        app.config['TESTING'] = True
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

class TestCRUD(BaseTestCase):
    def test_create_mission(self):
        response = self.client.post('/missions', json={'name': 'mission1'})
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'Mission Created!', response.data)

    def test_get_missions(self):
        response = self.client.get('/get_missions')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'[]', response.data)


    def test_get_mission(self):
        response = self.client.post('/missions', json={'name': 'mission1'})
        response = self.client.get('/missions/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'mission1', response.data)

    def test_delete_mission(self):
        response = self.client.post('/missions', json={'name': 'mission1'})
        response = self.client.delete('/missions/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Item deleted', response.data)
