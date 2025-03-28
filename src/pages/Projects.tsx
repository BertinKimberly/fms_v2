
import React, { useState } from 'react';
import { 
  ChevronDown, 
  Filter, 
  Search, 
  Plus, 
  MoreHorizontal,
  Calendar,
  Users,
  Wallet,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample project data
const projects = [
  {
    id: '1',
    name: 'E-commerce Redesign',
    client: 'Acme Corp',
    description: 'Redesigning the e-commerce platform for better user experience and increased conversions.',
    deadline: 'Dec 15, 2023',
    budget: 12000,
    team: [
      { id: '1', name: 'Alex Johnson', avatar: '' },
      { id: '2', name: 'Samantha Lee', avatar: '' },
      { id: '3', name: 'Michael Wong', avatar: '' },
    ],
    progress: 75,
    status: 'active',
    priority: 'high',
    hoursLogged: 215,
  },
  {
    id: '2',
    name: 'Mobile App Development',
    client: 'TechStart Inc',
    description: 'Developing a new mobile application for both iOS and Android platforms.',
    deadline: 'Jan 20, 2024',
    budget: 25000,
    team: [
      { id: '5', name: 'David Kim', avatar: '' },
      { id: '2', name: 'Samantha Lee', avatar: '' },
    ],
    progress: 45,
    status: 'active',
    priority: 'medium',
    hoursLogged: 156,
  },
  {
    id: '3',
    name: 'SEO Optimization',
    client: 'GrowthMedia',
    description: 'Improving search engine rankings and optimizing website content for better visibility.',
    deadline: 'Nov 30, 2023',
    budget: 5000,
    team: [
      { id: '4', name: 'Emily Davis', avatar: '' },
      { id: '6', name: 'Jennifer Martinez', avatar: '' },
    ],
    progress: 100,
    status: 'completed',
    priority: 'medium',
    hoursLogged: 87,
  },
  {
    id: '4',
    name: 'Social Media Campaign',
    client: 'Fashion Forward',
    description: 'Planning and executing a multi-platform social media campaign for product launch.',
    deadline: 'Dec 5, 2023',
    budget: 8000,
    team: [
      { id: '6', name: 'Jennifer Martinez', avatar: '' },
    ],
    progress: 10,
    status: 'pending',
    priority: 'low',
    hoursLogged: 12,
  },
  {
    id: '5',
    name: 'Data Analytics Platform',
    client: 'DataViz Solutions',
    description: 'Building a custom data analytics dashboard for business intelligence.',
    deadline: 'Feb 28, 2024',
    budget: 18000,
    team: [
      { id: '3', name: 'Michael Wong', avatar: '' },
      { id: '1', name: 'Alex Johnson', avatar: '' },
    ],
    progress: 30,
    status: 'active',
    priority: 'high',
    hoursLogged: 94,
  },
  {
    id: '6',
    name: 'Brand Identity Refresh',
    client: 'Green Energy Co',
    description: 'Refreshing the company\'s brand identity including logo, colors, and style guide.',
    deadline: 'Jan 10, 2024',
    budget: 7500,
    team: [
      { id: '2', name: 'Samantha Lee', avatar: '' },
    ],
    progress: 60,
    status: 'active',
    priority: 'medium',
    hoursLogged: 68,
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusColor = {
    'pending': 'bg-blue-100 text-blue-800 border-blue-200',
    'active': 'bg-green-100 text-green-800 border-green-200',
    'completed': 'bg-purple-100 text-purple-800 border-purple-200',
    'on-hold': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };
  
  const priorityColor = {
    'low': 'bg-slate-100 text-slate-800 border-slate-200',
    'medium': 'bg-blue-100 text-blue-800 border-blue-200',
    'high': 'bg-orange-100 text-orange-800 border-orange-200',
  };
  
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{project.name}</h3>
            <p className="text-sm text-muted-foreground">Client: {project.client}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem>Assign Freelancers</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-sm mt-3 line-clamp-2">{project.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="text-sm">{project.deadline}</div>
          </div>
          <div className="flex items-center">
            <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="text-sm">${project.budget.toLocaleString()}</div>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="text-sm">{project.team.length} members</div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="text-sm">{project.hoursLogged} hours</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Team</div>
          <div className="flex -space-x-2">
            {project.team.map((member) => (
              <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-between">
          <Badge className={statusColor[project.status as keyof typeof statusColor]}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
          <Badge className={priorityColor[project.priority as keyof typeof priorityColor]}>
            {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
