# Drone Bot

This is a web application provides a frontend interface to interact with drone data using a Flask backend. The backend handles requests using OpenAI's API and other data processing features, the frontend allows users to query and sort the drone data.


## File Structure

- **`drone-data-backend/`**: Backend directory (Python and Flask application).
- **`src/App.js`**: Frontend directory (React application).
- **`image_data.json`**: JSON file containing the drone data used in the application.

## Project feature
- A clean, responsive UI that allows users to input and receive information.
![Input and Response Example](public/images/input_and_response.png)
- Use a OpenAI service to interpret the question and handle natural language queries.
![Input and Response Example](public/images/api_response.png)
- If AI integration is not feasible, provide a mock response.
![Input and Response Example](public/images/mock_response.png)
- Sorting feature to present the drone data card based on user-selected criteria.
![Input and Response Example](public/images/sorting.png)
- Basic unit tests

## Installation

### Clone the Repository and Run Backend
```bash
git clone https://github.com/EmmaBin/intern-challenge.git
cd intern-challenge
cd drone-data-backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt

### Create Your .env File

touch .env
REACT_APP_OPENAI="your_openai_api_key"

### Run backend
python app.py


### Run frontend 
```bash
cd ../drone-bot-frontend
npm install
npm start

This will start the React app, and it will open in your browser at http://localhost:3000/


### Run testing
cd ../drone-bot-frontend
npm test


cd ../drone-data-backend
source venv/bin/activate  # On Windows use: venv\Scripts\activate
python test_app.py




