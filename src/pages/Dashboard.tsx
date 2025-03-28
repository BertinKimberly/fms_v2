
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, Briefcase, FileText, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import RecentFreelancersTable from '@/components/dashboard/RecentFreelancersTable';
import RecentProjectsTable from '@/components/dashboard/RecentProjectsTable';
import { Button } from '@/components/ui/button';

// Sample data
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 8000 },
  { name: 'Jul', value: 9500 },
  { name: 'Aug', value: 7500 },
  { name: 'Sep', value: 8500 },
  { name: 'Oct', value: 9000 },
  { name: 'Nov', value: 10000 },
  { name: 'Dec', value: 12000 },
];

const projectStatusData = [
  { name: 'Completed', value: 35, color: '#10B981' },
  { name: 'In Progress', value: 45, color: '#3B82F6' },
  { name: 'Pending', value: 15, color: '#F59E0B' },
  { name: 'On Hold', value: 5, color: '#EF4444' },
];

const skillsDistributionData = [
  { name: 'Web Development', value: 30 },
  { name: 'Design', value: 25 },
  { name: 'Marketing', value: 15 },
  { name: 'Writing', value: 12 },
  { name: 'Mobile Development', value: 18 },
];

const sampleFreelancers = [
  {
    id: '1',
    name: 'Alex Johnson',
    skills: ['React', 'TypeScript', 'Node.js'],
    hourlyRate: 75,
    status: 'available' as const,
  },
  {
    id: '2',
    name: 'Samantha Lee',
    skills: ['UI/UX Design', 'Figma', 'Sketch'],
    hourlyRate: 65,
    status: 'busy' as const,
  },
  {
    id: '3',
    name: 'Michael Wong',
    skills: ['Python', 'Machine Learning', 'Data Science'],
    hourlyRate: 85,
    status: 'available' as const,
  },
  {
    id: '4',
    name: 'Emily Davis',
    skills: ['Content Writing', 'SEO', 'Copywriting'],
    hourlyRate: 50,
    status: 'offline' as const,
  },
];

const sampleProjects = [
  {
    id: '1',
    name: 'E-commerce Redesign',
    client: 'Acme Corp',
    deadline: 'Dec 15, 2023',
    budget: 12000,
    progress: 75,
    status: 'active' as const,
  },
  {
    id: '2',
    name: 'Mobile App Development',
    client: 'TechStart Inc',
    deadline: 'Jan 20, 2024',
    budget: 25000,
    progress: 45,
    status: 'active' as const,
  },
  {
    id: '3',
    name: 'SEO Optimization',
    client: 'GrowthMedia',
    deadline: 'Nov 30, 2023',
    budget: 5000,
    progress: 100,
    status: 'completed' as const,
  },
  {
    id: '4',
    name: 'Social Media Campaign',
    client: 'Fashion Forward',
    deadline: 'Dec 5, 2023',
    budget: 8000,
    progress: 10,
    status: 'pending' as const,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Export</Button>
          <Button>New Project</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Freelancers"
          value="128"
          description="12 new this month"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Active Projects"
          value="34"
          description="4 completed this week"
          icon={<Briefcase className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending Invoices"
          value="9"
          description="$24,500 total value"
          icon={<FileText className="h-4 w-4" />}
          trend={{ value: 2, isPositive: false }}
        />
        <StatCard
          title="Monthly Revenue"
          value="$42,500"
          description="8% from last month"
          icon={<Wallet className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <ChartCard 
          title="Revenue Overview" 
          description="Monthly revenue for the current year"
          className="lg:col-span-4"
        >
          <div className="h-[300px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard 
          title="Project Status" 
          description="Distribution of project statuses"
          className="lg:col-span-3"
        >
          <div className="h-[300px] p-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Freelancer Skills Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={skillsDistributionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    width={120}
                  />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="#6366F1" 
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Freelancers</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentFreelancersTable freelancers={sampleFreelancers} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentProjectsTable projects={sampleProjects} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
