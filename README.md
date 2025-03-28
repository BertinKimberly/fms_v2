
# PredictlyPro - Freelance Management System

PredictlyPro is a full-stack application for freelance management with machine learning capabilities. The system can predict freelancer salaries and assess qualification for projects based on experience, skills, and project requirements.

## Features

- User authentication
- Dashboard with data visualization
- Freelancer management
- Project management
- Invoice tracking
- ML-powered salary prediction
- ML-powered qualification assessment
- Export training data as CSV

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui, recharts
- **Backend**: FastAPI, Python
- **Machine Learning**: scikit-learn (Random Forest models)
- **Database**: PostgreSQL (configurable in production)

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- pip (Python package manager)

### Installation

#### Frontend

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

The frontend will be available at http://localhost:5173

#### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv env
```

3. Activate the virtual environment:

```bash
# On Windows
env\Scripts\activate
# On macOS/Linux
source env/bin/activate
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Run the FastAPI server:

```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

### API Documentation

Once the backend is running, you can access the auto-generated API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Machine Learning Models

The application uses two main ML models:

1. **Salary Prediction**: Random Forest Regressor that estimates a freelancer's appropriate salary based on experience, skills, and project complexity.

2. **Qualification Assessment**: Random Forest Classifier that predicts if a freelancer is qualified for a project based on experience, skills, and project type.

The models are trained on initial dummy data, but in a production environment, they would be trained on real historical data.

## Production Deployment

For production deployment:

1. Set up a PostgreSQL database
2. Configure environment variables
3. Deploy the FastAPI backend to a server
4. Deploy the React frontend to a static hosting service
5. Set up CORS properly in the backend

## License

This project is licensed under the MIT License.
