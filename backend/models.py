# backend/models.py
from sqlalchemy import Column, Integer, Float, String
from database import Base

class SalaryData(Base):
    __tablename__ = "salary_data"

    id = Column(Integer, primary_key=True, index=True)
    experience = Column(Float)
    skills = Column(Integer)
    project_complexity = Column(Integer)
    salary = Column(Float)

class QualificationData(Base):
    __tablename__ = "qualification_data"

    id = Column(Integer, primary_key=True, index=True)
    experience = Column(Float)
    skills = Column(Integer)
    project_type = Column(Integer)
    qualified = Column(String)