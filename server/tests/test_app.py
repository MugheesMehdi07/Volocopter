from flask_testing import TestCase
from app import app, db

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
        # Assuming the correct endpoint is /mission (singular), not /missions
        response = self.client.post('/mission', json={
            'name': 'mission1',
            'description': 'Description of mission1',
            'status': '1'  # Assuming you're using a string-based status as per your initial code
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('Mission Created!', response.json['message'])

    def test_get_missions(self):
        # Add a mission to test retrieval
        self.client.post('/mission', json={
            'name': 'mission2',
            'description': 'Description of mission2',
            'status': '1'
        })
        response = self.client.get('/get_missions')
        self.assertEqual(response.status_code, 200)
        # Check if the response contains the mission added
        missions = response.json
        self.assertTrue(any(mission['name'] == 'mission2' for mission in missions))

    def test_get_mission(self):
        # Add a mission to test retrieval
        add_response = self.client.post('/mission', json={
            'name': 'mission3',
            'description': 'Description of mission3',
            'status': '1'
        })
        id = add_response.json['new_mission']['id']
        response = self.client.get(f'/mission/{id}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('mission3', response.json['name'])

    def test_delete_mission(self):
        # Add a mission to test deletion
        add_response = self.client.post('/mission', json={
            'name': 'mission4',
            'description': 'Description of mission4',
            'status': '1'
        })
        id = add_response.json['new_mission']['id']
        delete_response = self.client.delete(f'/mission/{id}')
        self.assertEqual(delete_response.status_code, 200)
        self.assertIn('Item deleted', delete_response.json['message'])

    # Assuming you want to add a test case for updating a mission status
    def test_update_mission_status(self):
        # Add a mission to test status update
        add_response = self.client.post('/mission', json={
            'name': 'mission5',
            'description': 'Description of mission5',
            'status': '1'
        })
        id = add_response.json['new_mission']['id']
        update_response = self.client.put(f'/mission/{id}', json={'status': 'Flight'})
        self.assertEqual(update_response.status_code, 200)
        self.assertIn('Mission status updated!', update_response.json['message'])

