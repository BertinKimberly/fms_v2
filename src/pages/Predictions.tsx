
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircle, Download, HelpCircle, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock data for ML model visualizations
const salaryData = [
  { experience: 1, skills: 3, salary: 40000 },
  { experience: 2, skills: 4, salary: 50000 },
  { experience: 3, skills: 5, salary: 65000 },
  { experience: 4, skills: 4, salary: 70000 },
  { experience: 5, skills: 6, salary: 85000 },
  { experience: 6, skills: 7, salary: 95000 },
  { experience: 7, skills: 8, salary: 105000 },
  { experience: 8, skills: 6, salary: 110000 },
  { experience: 9, skills: 7, salary: 120000 },
  { experience: 10, skills: 9, salary: 135000 },
];

const qualificationData = [
  { experience: 1, skills: 2, qualified: 'Low' },
  { experience: 1, skills: 4, qualified: 'Medium' },
  { experience: 2, skills: 3, qualified: 'Medium' },
  { experience: 3, skills: 2, qualified: 'Medium' },
  { experience: 4, skills: 3, qualified: 'Medium' },
  { experience: 5, skills: 4, qualified: 'High' },
  { experience: 6, skills: 5, qualified: 'High' },
  { experience: 7, skills: 3, qualified: 'Medium' },
  { experience: 8, skills: 6, qualified: 'High' },
  { experience: 9, skills: 7, qualified: 'High' },
];

const skillWeights = [
  { name: 'React', weight: 0.85 },
  { name: 'JavaScript', weight: 0.75 },
  { name: 'TypeScript', weight: 0.80 },
  { name: 'Python', weight: 0.70 },
  { name: 'Node.js', weight: 0.65 },
  { name: 'SQL', weight: 0.60 },
  { name: 'AWS', weight: 0.75 },
  { name: 'UI/UX Design', weight: 0.55 },
  { name: 'Machine Learning', weight: 0.90 },
  { name: 'Data Science', weight: 0.85 },
];

const QualificationBadge = ({ qualification }: { qualification: string }) => {
  const colorMap = {
    'High': 'bg-green-100 text-green-800 border-green-200',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Low': 'bg-red-100 text-red-800 border-red-200',
  };
  
  return (
    <Badge className={colorMap[qualification as keyof typeof colorMap]}>
      {qualification} Qualification
    </Badge>
  );
};

const Predictions = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState('salary');
  
  // Salary prediction states
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [projectComplexity, setProjectComplexity] = useState('medium');
  const [location, setLocation] = useState('');
  const [salaryPrediction, setSalaryPrediction] = useState<number | null>(null);
  
  // Qualification prediction states
  const [expForQualification, setExpForQualification] = useState('');
  const [skillsCount, setSkillsCount] = useState('');
  const [projectType, setProjectType] = useState('web');
  const [qualificationPrediction, setQualificationPrediction] = useState<string | null>(null);
  
  const handleSalaryPrediction = () => {
    // Simple mock salary prediction calculation
    const expValue = parseFloat(experience);
    const skillsValue = parseFloat(skills);
    
    if (isNaN(expValue) || isNaN(skillsValue)) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Please enter valid numeric values for experience and skills.",
      });
      return;
    }
    
    // Mock algorithm: base + (experience * 5000) + (skills * 3000) + complexity factor
    let complexityFactor = 0;
    switch (projectComplexity) {
      case 'low': complexityFactor = 0; break;
      case 'medium': complexityFactor = 5000; break;
      case 'high': complexityFactor = 10000; break;
    }
    
    const prediction = 35000 + (expValue * 5000) + (skillsValue * 3000) + complexityFactor;
    setSalaryPrediction(prediction);
    
    toast({
      title: "Prediction Complete",
      description: "Salary prediction has been calculated based on your inputs.",
    });
  };
  
  const handleQualificationPrediction = () => {
    // Simple mock qualification prediction
    const expValue = parseFloat(expForQualification);
    const skillsValue = parseFloat(skillsCount);
    
    if (isNaN(expValue) || isNaN(skillsValue)) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Please enter valid numeric values for experience and skills.",
      });
      return;
    }
    
    // Mock algorithm based on experience and skills
    let qualification = 'Low';
    
    if (expValue >= 5 && skillsValue >= 5) {
      qualification = 'High';
    } else if ((expValue >= 3 && skillsValue >= 3) || (expValue >= 5 || skillsValue >= 5)) {
      qualification = 'Medium';
    }
    
    // Adjust based on project type
    if (projectType === 'enterprise' && qualification !== 'High') {
      qualification = expValue >= 4 ? qualification : 'Low';
    }
    
    setQualificationPrediction(qualification);
    
    toast({
      title: "Prediction Complete",
      description: "Qualification prediction has been calculated based on your inputs.",
    });
  };
  
  const handleExportCSV = () => {
    // This would typically generate and download a CSV file
    // For the mock version, we'll just show a toast
    toast({
      title: "CSV Exported",
      description: "Training data has been exported to CSV format.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Predictions</h1>
        <Button variant="outline" onClick={handleExportCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export Training Data
        </Button>
      </div>
      
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Machine Learning Models</AlertTitle>
        <AlertDescription>
          These prediction models use historical freelancer data to estimate salary ranges and qualification 
          fit for projects. Results are based on patterns identified in our training data.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="salary" value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="salary">Salary Prediction</TabsTrigger>
          <TabsTrigger value="qualification">Qualification Assessment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="salary" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Predict Freelancer Salary</CardTitle>
                <CardDescription>
                  Enter freelancer details to predict appropriate salary range
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input 
                    id="experience" 
                    type="number" 
                    placeholder="e.g., 5" 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Number of Relevant Skills</Label>
                  <Input 
                    id="skills" 
                    type="number" 
                    placeholder="e.g., 7" 
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complexity">Project Complexity</Label>
                  <Select value={projectComplexity} onValueChange={setProjectComplexity}>
                    <SelectTrigger id="complexity">
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g., New York, USA" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSalaryPrediction} className="w-full">
                  Calculate Prediction
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Prediction Result</CardTitle>
                <CardDescription>
                  Estimated salary based on provided parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
                {salaryPrediction ? (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">
                      ${salaryPrediction.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Annual Salary Estimate</p>
                    <div className="mt-4 grid gap-2">
                      <div className="flex justify-between text-sm">
                        <span>Monthly:</span>
                        <span className="font-medium">${Math.round(salaryPrediction / 12).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Hourly (40h/week):</span>
                        <span className="font-medium">${Math.round(salaryPrediction / 2080).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <HelpCircle className="h-16 w-16 mx-auto mb-2 opacity-20" />
                    <p>Enter freelancer details and calculate to see the prediction</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Salary Prediction Model</CardTitle>
              <CardDescription>
                Data visualization showing the relationship between experience, skills, and salary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid />
                    <XAxis 
                      type="number" 
                      dataKey="experience" 
                      name="Experience" 
                      unit=" years" 
                      label={{ value: 'Years of Experience', position: 'bottom', offset: 0 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="salary" 
                      name="Salary" 
                      unit="$" 
                      label={{ value: 'Salary ($)', angle: -90, position: 'left' }}
                    />
                    <ZAxis 
                      type="number" 
                      dataKey="skills" 
                      name="Skills" 
                      range={[50, 200]} 
                    />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value) => typeof value === 'number' ? `$${value.toLocaleString()}` : value} />
                    <Legend />
                    <Scatter 
                      name="Freelancer Salary Data" 
                      data={salaryData} 
                      fill="#8884d8" 
                      shape="circle"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="qualification" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Assess Project Qualification</CardTitle>
                <CardDescription>
                  Determine if a freelancer is qualified for a specific project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exp-qualification">Years of Experience</Label>
                  <Input 
                    id="exp-qualification" 
                    type="number" 
                    placeholder="e.g., 5" 
                    value={expForQualification}
                    onChange={(e) => setExpForQualification(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills-count">Number of Relevant Skills</Label>
                  <Input 
                    id="skills-count" 
                    type="number" 
                    placeholder="e.g., 7" 
                    value={skillsCount}
                    onChange={(e) => setSkillsCount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-type">Project Type</Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger id="project-type">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="design">UI/UX Design</SelectItem>
                      <SelectItem value="enterprise">Enterprise Solution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleQualificationPrediction} className="w-full">
                  Assess Qualification
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Assessment Result</CardTitle>
                <CardDescription>
                  Qualification assessment based on provided parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
                {qualificationPrediction ? (
                  <div className="text-center">
                    <QualificationBadge qualification={qualificationPrediction} />
                    <p className="mt-4 text-lg font-medium">
                      {qualificationPrediction === 'High'
                        ? 'Highly qualified for this project'
                        : qualificationPrediction === 'Medium'
                        ? 'Moderately qualified - may need some supervision'
                        : 'Limited qualification - consider additional training or a different project'
                      }
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Based on experience, skills, and project requirements
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <HelpCircle className="h-16 w-16 mx-auto mb-2 opacity-20" />
                    <p>Enter freelancer and project details to see the assessment</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Qualification Model Visualization</CardTitle>
                <CardDescription>
                  Experience vs. skills qualification matrix
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid />
                      <XAxis 
                        type="number" 
                        dataKey="experience" 
                        name="Experience" 
                        unit=" years"
                        label={{ value: 'Years of Experience', position: 'bottom', offset: 0 }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="skills" 
                        name="Skills" 
                        label={{ value: 'Number of Skills', angle: -90, position: 'left' }}
                      />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter 
                        name="Qualification Data" 
                        data={qualificationData} 
                        fill="#82ca9d"
                        shape="circle"
                      >
                        {qualificationData.map((entry, index) => {
                          let color = "#ff8042";
                          if (entry.qualified === "Medium") color = "#8884d8";
                          if (entry.qualified === "High") color = "#82ca9d";
                          
                          return <Cell key={`cell-${index}`} fill={color} />;
                        })}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skill Importance Weights</CardTitle>
                <CardDescription>
                  Relative importance of different skills in qualification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={skillWeights}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={80}
                      />
                      <YAxis 
                        domain={[0, 1]} 
                        label={{ value: 'Weight', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip formatter={(value) => [value, 'Weight']} />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Predictions;
