# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai
import re
import json
load_dotenv()

openai.api_key = os.getenv('REACT_APP_OPENAI')
app = Flask(__name__)
CORS(app)

current_dir = os.path.dirname(os.path.abspath(__file__))
json_file_path = os.path.join(current_dir, '..', 'src', 'image_data.json')
print("JSON file path:", json_file_path)

with open(json_file_path, 'r') as f:
    image_data = json.load(f)

def mock_response(user_question):

    if "first" in user_question.lower():
        image_id =0
    elif "second" in user_question.lower():
        image_id =1
    elif "third" in user_question.lower():
        image_id =2
    elif "fourth" in user_question.lower():
        image_id =3
    elif "last" in user_question.lower() or "fifth" in user_question.lower():
        image_id=4
    else:
        match = re.search(r'image (\d+)', user_question.lower())
        if match:
            image_id = int(match.group(1)) - 1
        else:
            image_id = None

    if image_id is not None and 0 <= image_id < len(image_data):
        if "altitude" in user_question.lower():
            return f"The altitude of image {image_id + 1} is {image_data[image_id]['altitude_m']} meters."
        elif "battery" in user_question.lower():
            return f"The battery level during image {image_id + 1} is {image_data[image_id]['battery_level_pct']}%."
        elif "longitude" in user_question.lower():
            return f"The longitude of image {image_id + 1} is {image_data[image_id]['longitude']}."
        elif "latitude" in user_question.lower():
            return f"The latitude of image {image_id + 1} is {image_data[image_id]['latitude']}."
        elif "gps accuracy" in user_question.lower():
            return f"The GPS accuracy of image {image_id + 1} is {image_data[image_id]['gps_accuracy_m']} meters."
    return "Information is not available at the moment."



def ask_openai(user_question):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", 
            messages=[
                {"role": "system", "content": "You are an expert assistant that answers questions about drone data."},
                {"role": "user", "content": f"Here is the drone data: {image_data}"},
                {"role": "user", "content": user_question}
            ],
            max_tokens=150,
            temperature=0.5
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        print(f"error: {e}")
        return mock_response(user_question)


@app.route('/process-question', methods=['POST'])
def process_question():
    data = request.get_json()
    user_question = data.get('question')
    print(user_question)
    response = ask_openai(user_question)

    return jsonify({"response": response})

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "hello!!!!!"})

if __name__ == '__main__':
    app.run(debug=True)
