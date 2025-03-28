
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

app = FastAPI(title="PredictlyPro API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, set this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model paths
SALARY_MODEL_PATH = "models/salary_model.pkl"
QUALIFICATION_MODEL_PATH = "models/qualification_model.pkl"
SALARY_SCALER_PATH = "models/salary_scaler.pkl"
QUALIFICATION_SCALER_PATH = "models/qualification_scaler.pkl"

# Create models directory if it doesn't exist
os.makedirs("models", exist_ok=True)

# Dummy data for training
salary_data = [
    {"experience": 1, "skills": 3, "project_complexity": 1, "salary": 40000},
    {"experience": 2, "skills": 4, "project_complexity": 2, "salary": 50000},
    {"experience": 3, "skills": 5, "project_complexity": 1, "salary": 65000},
    {"experience": 4, "skills": 4, "project_complexity": 2, "salary": 70000},
    {"experience": 5, "skills": 6, "project_complexity": 3, "salary": 85000},
    {"experience": 6, "skills": 7, "project_complexity": 2, "salary": 95000},
    {"experience": 7, "skills": 8, "project_complexity": 3, "salary": 105000},
    {"experience": 8, "skills": 6, "project_complexity": 2, "salary": 110000},
    {"experience": 9, "skills": 7, "project_complexity": 3, "salary": 120000},
    {"experience": 10, "skills": 9, "project_complexity": 3, "salary": 135000},
]

qualification_data = [
    {"experience": 1, "skills": 2, "project_type": 1, "qualified": "Low"},
    {"experience": 1, "skills": 4, "project_type": 2, "qualified": "Medium"},
    {"experience": 2, "skills": 3, "project_type": 1, "qualified": "Medium"},
    {"experience": 3, "skills": 2, "project_type": 3, "qualified": "Medium"},
    {"experience": 4, "skills": 3, "project_type": 2, "qualified": "Medium"},
    {"experience": 5, "skills": 4, "project_type": 1, "qualified": "High"},
    {"experience": 6, "skills": 5, "project_type": 3, "qualified": "High"},
    {"experience": 7, "skills": 3, "project_type": 2, "qualified": "Medium"},
    {"experience": 8, "skills": 6, "project_type": 3, "qualified": "High"},
    {"experience": 9, "skills": 7, "project_type": 1, "qualified": "High"},
]

# Convert data to DataFrames
salary_df = pd.DataFrame(salary_data)
qualification_df = pd.DataFrame(qualification_data)

# Export training data to CSV
salary_df.to_csv("data/salary_training_data.csv", index=False)
qualification_df.to_csv("data/qualification_training_data.csv", index=False)

# Train and save salary prediction model
def train_salary_model():
    X = salary_df[["experience", "skills", "project_complexity"]]
    y = salary_df["salary"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Save model and scaler
    with open(SALARY_MODEL_PATH, "wb") as f:
        pickle.dump(model, f)
    with open(SALARY_SCALER_PATH, "wb") as f:
        pickle.dump(scaler, f)
    
    return model, scaler

# Train and save qualification model
def train_qualification_model():
    X = qualification_df[["experience", "skills", "project_type"]]
    y = qualification_df["qualified"]
    
    # Map qualification levels to numerical values
    qualification_mapping = {"Low": 0, "Medium": 1, "High": 2}
    y_numeric = y.map(qualification_mapping)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y_numeric, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Save model and scaler
    with open(QUALIFICATION_MODEL_PATH, "wb") as f:
        pickle.dump(model, f)
    with open(QUALIFICATION_SCALER_PATH, "wb") as f:
        pickle.dump(scaler, f)
    
    return model, scaler

# Load or train models
def get_salary_model():
    try:
        with open(SALARY_MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        with open(SALARY_SCALER_PATH, "rb") as f:
            scaler = pickle.load(f)
    except FileNotFoundError:
        model, scaler = train_salary_model()
    return model, scaler

def get_qualification_model():
    try:
        with open(QUALIFICATION_MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        with open(QUALIFICATION_SCALER_PATH, "rb") as f:
            scaler = pickle.load(f)
    except FileNotFoundError:
        model, scaler = train_qualification_model()
    return model, scaler

# Create models directory and data directory
os.makedirs("data", exist_ok=True)

# Train models on startup if they don't exist
train_salary_model()
train_qualification_model()

# Request and response models
class SalaryPredictionRequest(BaseModel):
    experience: float
    skills: int
    project_complexity: str  # Low, Medium, High

class SalaryPredictionResponse(BaseModel):
    salary: float
    monthly: float
    hourly: float

class QualificationRequest(BaseModel):
    experience: float
    skills: int
    project_type: str  # Web, Mobile, UI/UX, Enterprise

class QualificationResponse(BaseModel):
    qualification: str  # Low, Medium, High
    description: str

# Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to PredictlyPro API!"}

@app.post("/predict/salary", response_model=SalaryPredictionResponse)
def predict_salary(request: SalaryPredictionRequest):
    model, scaler = get_salary_model()
    
    # Convert project complexity to numeric
    complexity_mapping = {"low": 1, "medium": 2, "high": 3}
    complexity_numeric = complexity_mapping.get(request.project_complexity.lower(), 2)
    
    # Prepare input data
    input_data = np.array([[request.experience, request.skills, complexity_numeric]])
    input_scaled = scaler.transform(input_data)
    
    # Make prediction
    predicted_salary = float(model.predict(input_scaled)[0])
    monthly_salary = predicted_salary / 12
    hourly_salary = predicted_salary / 2080  # 40 hours per week, 52 weeks
    
    return {
        "salary": predicted_salary,
        "monthly": monthly_salary,
        "hourly": hourly_salary
    }

@app.post("/predict/qualification", response_model=QualificationResponse)
def predict_qualification(request: QualificationRequest):
    model, scaler = get_qualification_model()
    
    # Convert project type to numeric
    type_mapping = {"web": 1, "mobile": 2, "design": 3, "enterprise": 4}
    type_numeric = type_mapping.get(request.project_type.lower(), 1)
    
    # Prepare input data
    input_data = np.array([[request.experience, request.skills, type_numeric]])
    input_scaled = scaler.transform(input_data)
    
    # Make prediction
    predicted_class = int(model.predict(input_scaled)[0])
    
    # Map numeric prediction back to qualification level
    qualification_mapping = {0: "Low", 1: "Medium", 2: "High"}
    qualification = qualification_mapping[predicted_class]
    
    # Generate description
    descriptions = {
        "Low": "Limited qualification - consider additional training or a different project",
        "Medium": "Moderately qualified - may need some supervision",
        "High": "Highly qualified for this project"
    }
    
    return {
        "qualification": qualification,
        "description": descriptions[qualification]
    }

@app.get("/export/salary-data")
def export_salary_data():
    return salary_data

@app.get("/export/qualification-data")
def export_qualification_data():
    return qualification_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
