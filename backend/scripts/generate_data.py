# scripts/generate_data.py
from database import SessionLocal
from models import SalaryData, QualificationData
import random

session = SessionLocal()

# Generate Salary Data
for _ in range(2000):
    salary_entry = SalaryData(
        experience=round(random.uniform(1, 10), 2),
        skills=random.randint(1, 10),
        project_complexity=random.randint(1, 3),
        salary=random.randint(40000, 150000)
    )
    session.add(salary_entry)

# Generate Qualification Data
qualification_levels = ["Low", "Medium", "High"]
for _ in range(2000):
    qualification_entry = QualificationData(
        experience=round(random.uniform(1, 10), 2),
        skills=random.randint(1, 10),
        project_type=random.randint(1, 4),
        qualified=random.choice(qualification_levels)
    )
    session.add(qualification_entry)

session.commit()
session.close()