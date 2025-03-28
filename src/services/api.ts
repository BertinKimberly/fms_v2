
import { toast } from "@/components/ui/use-toast";

const API_URL = "http://localhost:8000";

// Types for salary prediction
export interface SalaryPredictionRequest {
  experience: number;
  skills: number;
  project_complexity: string; // "low", "medium", "high"
}

export interface SalaryPredictionResponse {
  salary: number;
  monthly: number;
  hourly: number;
}

// Types for qualification prediction
export interface QualificationRequest {
  experience: number;
  skills: number;
  project_type: string; // "web", "mobile", "design", "enterprise"
}

export interface QualificationResponse {
  qualification: string; // "Low", "Medium", "High"
  description: string;
}

// API service class
export class ApiService {
  // Predict salary
  static async predictSalary(data: SalaryPredictionRequest): Promise<SalaryPredictionResponse> {
    try {
      const response = await fetch(`${API_URL}/predict/salary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to predict salary');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error predicting salary:', error);
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: error instanceof Error ? error.message : "Failed to connect to prediction service",
      });
      
      // Fallback to local prediction if API is not available
      const baseAmount = 35000;
      const experienceBonus = data.experience * 5000;
      const skillsBonus = data.skills * 3000;
      let complexityBonus = 0;
      
      switch (data.project_complexity) {
        case 'low': complexityBonus = 0; break;
        case 'medium': complexityBonus = 5000; break;
        case 'high': complexityBonus = 10000; break;
      }
      
      const salary = baseAmount + experienceBonus + skillsBonus + complexityBonus;
      
      return {
        salary,
        monthly: salary / 12,
        hourly: salary / 2080,
      };
    }
  }
  
  // Predict qualification
  static async predictQualification(data: QualificationRequest): Promise<QualificationResponse> {
    try {
      const response = await fetch(`${API_URL}/predict/qualification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to predict qualification');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error predicting qualification:', error);
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: error instanceof Error ? error.message : "Failed to connect to prediction service",
      });
      
      // Fallback to local prediction if API is not available
      const expValue = data.experience;
      const skillsValue = data.skills;
      
      // Simple qualification algorithm
      let qualification = 'Low';
      
      if (expValue >= 5 && skillsValue >= 5) {
        qualification = 'High';
      } else if ((expValue >= 3 && skillsValue >= 3) || (expValue >= 5 || skillsValue >= 5)) {
        qualification = 'Medium';
      }
      
      // Adjust based on project type
      if (data.project_type === 'enterprise' && qualification !== 'High') {
        qualification = expValue >= 4 ? qualification : 'Low';
      }
      
      const descriptions = {
        'Low': 'Limited qualification - consider additional training or a different project',
        'Medium': 'Moderately qualified - may need some supervision',
        'High': 'Highly qualified for this project'
      };
      
      return {
        qualification,
        description: descriptions[qualification as keyof typeof descriptions]
      };
    }
  }
  
  // Export training data
  static async exportSalaryData(): Promise<Blob> {
    try {
      const response = await fetch(`${API_URL}/export/salary-data`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch salary data');
      }
      
      const data = await response.json();
      const csvContent = [
        ['Experience', 'Skills', 'Project Complexity', 'Salary'],
        ...data.map((row: any) => [row.experience, row.skills, row.project_complexity, row.salary].join(','))
      ].join('\n');
      
      return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    } catch (error) {
      console.error('Error exporting salary data:', error);
      throw error;
    }
  }
}
