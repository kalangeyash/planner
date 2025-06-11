
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier
from scipy.sparse import csr_matrix
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelEncoder
import numpy as np
import joblib

# Load the dataset
try:
    df = pd.read_csv('./BE-P.csv')
except FileNotFoundError:
    print("Error: 'BE-P.csv' not found. Please upload the file to your environment.")
    exit()

# Fill missing values
df.fillna('', inplace=True)

# Combine relevant columns for better context
df['Combined'] = df[['Project Name', 'Project Description', 'Requirements', 'Industry', 'Budget']].astype(str).agg(' '.join, axis=1)

# Encode the 'Tech Stack' column to numerical labels
label_encoder = LabelEncoder()
df['Tech Stack Encoded'] = label_encoder.fit_transform(df['Tech Stack'])

# TF-IDF vectorization (Optimized for large dataset)
tfidf = TfidfVectorizer(stop_words='english', max_features=5000)
tfidf_matrix = tfidf.fit_transform(df['Combined'])

# Convert to sparse matrix for memory efficiency
tfidf_matrix = csr_matrix(tfidf_matrix)

# Split data
X = tfidf_matrix
y = df['Tech Stack Encoded']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train RandomForest with optimizations
model = RandomForestClassifier(
    n_estimators=200,      # More trees for better generalization
    max_depth=20,          # Limits depth to prevent overfitting
    max_samples=0.8,       # Uses 80% of the data per tree for efficiency
    random_state=42,
    n_jobs=-1,             # Utilizes all CPU cores
    warm_start=True        # Allows incremental training
)

# Train incrementally in batches
for i in range(4):
    model.n_estimators += 50  # Add more trees progressively
    model.fit(X_train, y_train)


# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy of the optimized model: {accuracy * 100:.2f}%")

# Function to recommend tech stack
def recommend_tech_stack(project_data):
    input_string = ' '.join(map(str, project_data))
    input_vector = tfidf.transform([input_string])
    prediction = model.predict(input_vector)
    return label_encoder.inverse_transform(prediction)[0]

joblib.dump(model, 'tech_stack_model.pkl')
joblib.dump(tfidf, 'tfidf_vectorizer.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

# Example usage
project_name = "Codeup"
description = "Build an e-learning platform for engineering students"
requirements = "User authentication, payment integration"
industry = "E-Learning"
budget = "50000"

recommendations = recommend_tech_stack([project_name, description, requirements, industry, budget])
print(f"🔮 Recommended Tech Stack: {recommendations}")