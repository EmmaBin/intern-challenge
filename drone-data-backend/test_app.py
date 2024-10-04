import unittest
from app import app
import os
import json
current_dir = os.path.dirname(os.path.abspath(__file__))
json_file_path = os.path.join(current_dir, '..', 'src', 'image_data.json')
print("JSON file path:", json_file_path)

with open(json_file_path, 'r') as f:
    image_data = json.load(f)

class UnitTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_process_question(self):
        response = self.app.post('/process-question', json={'question': 'What is the altitude of the first image?'})
        self.assertEqual(response.status_code, 200)
        response_as_text = response.get_data(as_text=True)
    
        expected_altitude = image_data[0]['altitude_m']
        self.assertIn(str(expected_altitude), response_as_text)

    def test_mock_response(self):
        response = self.app.post('/process-question', json={'question': 'What is the latitude of the second image?'})
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.get_data(as_text=True))
        response_as_text = response_data.get("response", "")
        expected_latitude = image_data[1]['latitude']
        self.assertIn(expected_latitude, response_as_text)

if __name__ == '__main__':
    unittest.main()