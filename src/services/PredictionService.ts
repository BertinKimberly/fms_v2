
import { ApiService, SalaryPredictionRequest, QualificationRequest } from './api';

// Service to handle prediction logic
export class PredictionService {
  // Convert project complexity string to API format
  private static mapProjectComplexity(complexity: string): string {
    switch (complexity) {
      case 'low': return 'low';
      case 'medium': return 'medium';
      case 'high': return 'high';
      default: return 'medium';
    }
  }

  // Convert project type string to API format
  private static mapProjectType(type: string): string {
    switch (type) {
      case 'web': return 'web';
      case 'mobile': return 'mobile';
      case 'design': return 'design';
      case 'enterprise': return 'enterprise';
      default: return 'web';
    }
  }

  // Predict salary
  static async predictSalary(experience: number, skills: number, complexity: string): Promise<{
    salary: number;
    monthly: number;
    hourly: number;
  }> {
    const request: SalaryPredictionRequest = {
      experience,
      skills,
      project_complexity: this.mapProjectComplexity(complexity),
    };

    const result = await ApiService.predictSalary(request);
    return result;
  }

  // Predict qualification
  static async predictQualification(
    experience: number, 
    skills: number, 
    projectType: string
  ): Promise<{
    qualification: string;
    description: string;
  }> {
    const request: QualificationRequest = {
      experience,
      skills,
      project_type: this.mapProjectType(projectType),
    };

    const result = await ApiService.predictQualification(request);
    return result;
  }

  // Export training data as CSV
  static async exportTrainingData(): Promise<void> {
    try {
      const blob = await ApiService.exportSalaryData();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'salary_training_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to export training data:', error);
      throw error;
    }
  }
}
