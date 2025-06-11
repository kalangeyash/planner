from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
CORS(app, origins=["http://localhost:5173"])

# Load the trained model, vectorizer, and label encoder
try:
    model = joblib.load('./tech_stack_model.pkl')
    tfidf = joblib.load('./tfidf_vectorizer.pkl')
    label_encoder = joblib.load('./label_encoder.pkl')
except Exception as e:
    print(f"Error loading model files: {e}")
    raise

@app.route('/api/tech-stack', methods=['POST'])
def recommend_tech_stack():
    try:
        # Get input data from the request
        data = request.json
        project_name = data.get('name', '')
        description = data.get('description', '')
        requirements = ' '.join(data.get('requirements', []))
        industry = data.get('industry', '')
        budget = str(data.get('budget', ''))

        # Combine input data into a single string
        input_string = ' '.join([project_name, description, requirements, industry, budget])

        # Transform input data using the TF-IDF vectorizer
        input_vector = tfidf.transform([input_string])

        # Predict the tech stack
        prediction = model.predict(input_vector)
        tech_stack = label_encoder.inverse_transform(prediction)[0]

        # Return only the frontend prediction
        return jsonify({"techStack": {"devStack": [tech_stack]}})
    except Exception as e:
        print(f"Error in recommend_tech_stack: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)


# from flask import Flask, request, jsonify
# import joblib
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.preprocessing import LabelEncoder
# import numpy as np

# app = Flask(__name__)

# # Load the trained model, vectorizer, and label encoder
# model = joblib.load('tech_stack_model.pkl')
# tfidf = joblib.load('tfidf_vectorizer.pkl')
# label_encoder = joblib.load('label_encoder.pkl')

# @app.route('/api/tech-stack', methods=['POST'])
# def recommend_tech_stack():
#     # Get input data from the request
#     data = request.json
#     project_name = data.get('projectName', '')
#     description = data.get('description', '')
#     requirements = data.get('requirements', '')
#     industry = data.get('industry', '')
#     budget = data.get('budget', '')

#     # Combine input data into a single string
#     input_string = ' '.join([project_name, description, requirements, industry, budget])

#     # Transform input data using the TF-IDF vectorizer
#     input_vector = tfidf.transform([input_string])

#     # Predict the tech stack
#     prediction = model.predict(input_vector)
#     tech_stack = label_encoder.inverse_transform(prediction)[0]

#     # Return the recommended tech stack
#     return jsonify({"techStack": tech_stack})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8080)