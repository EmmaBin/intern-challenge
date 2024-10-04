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

json_file_path = '/Users/binma/Desktop/intern/drone-bot/image_data.json'
print("JSON file path:", json_file_path)

with open(json_file_path, 'r') as f:
    image_data = json.load(f)


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
        return "Unable to get a response from the AI service."


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
