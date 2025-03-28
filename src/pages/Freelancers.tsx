
import React, { useState } from 'react';
import { 
  ChevronDown, 
  Filter, 
  Search, 
  Plus, 
  MoreHorizontal,
  Star,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

// Sample freelancer data
const freelancers = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '',
    title: 'Full Stack Developer',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    hourlyRate: 75,
    rating: 4.9,
    yearsExperience: 8,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    availability: 'Available',
    completedProjects: 34,
  },
  {
    id: '2',
    name: 'Samantha Lee',
    avatar: '',
    title: 'UI/UX Designer',
    email: 'samantha.lee@example.com',
    phone: '+1 (555) 987-6543',
    hourlyRate: 65,
    rating: 4.7,
    yearsExperience: 5,
    skills: ['UI/UX Design', 'Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
    availability: 'Busy',
    completedProjects: 27,
  },
  {
    id: '3',
    name: 'Michael Wong',
    avatar: '',
    title: 'Data Scientist',
    email: 'michael.wong@example.com',
    phone: '+1 (555) 456-7890',
    hourlyRate: 85,
    rating: 4.8,
    yearsExperience: 6,
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow', 'SQL'],
    availability: 'Available',
    completedProjects: 19,
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: '',
    title: 'Content Writer',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 789-0123',
    hourlyRate: 50,
    rating: 4.6,
    yearsExperience: 4,
    skills: ['Content Writing', 'SEO', 'Copywriting', 'Editing', 'Research'],
    availability: 'Unavailable',
    completedProjects: 42,
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: '',
    title: 'Mobile Developer',
    email: 'david.kim@example.com',
    phone: '+1 (555) 234-5678',
    hourlyRate: 70,
    rating: 4.5,
    yearsExperience: 7,
    skills: ['React Native', 'iOS', 'Android', 'Flutter', 'Kotlin'],
    availability: 'Available',
    completedProjects: 23,
  },
  {
    id: '6',
    name: 'Jennifer Martinez',
    avatar: '',
    title: 'Marketing Specialist',
    email: 'jennifer.martinez@example.com',
    phone: '+1 (555) 321-9876',
    hourlyRate: 60,
    rating: 4.4,
    yearsExperience: 5,
    skills: ['Digital Marketing', 'Social Media', 'SEO', 'Content Strategy', 'Analytics'],
    availability: 'Busy',
    completedProjects: 31,
  },
];

interface FreelancerCardProps {
  freelancer: typeof freelancers[0];
}

const FreelancerCard = ({ freelancer }: FreelancerCardProps) => {
  const availabilityColor = {
    'Available': 'bg-green-100 text-green-800 border-green-200',
    'Busy': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Unavailable': 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
              <AvatarFallback>
                {freelancer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{freelancer.name}</h3>
              <p className="text-sm text-muted-foreground">{freelancer.title}</p>
              <div className="flex items-center mt-1 space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{freelancer.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({freelancer.completedProjects} projects)
                </span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Send Message</DropdownMenuItem>
              <DropdownMenuItem>Assign to Project</DropdownMenuItem>
              <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <div className="text-sm font-medium">Hourly Rate</div>
            <div className="text-sm">${freelancer.hourlyRate}/hr</div>
          </div>
          <div>
            <div className="text-sm font-medium">Experience</div>
            <div className="text-sm">{freelancer.yearsExperience} years</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Skills</div>
          <div className="flex flex-wrap gap-1">
            {freelancer.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <Badge className={availabilityColor[freelancer.availability as keyof typeof availabilityColor]}>
            {freelancer.availability}
          </Badge>
          <div className="flex space-x-2">
            <Button size="icon" variant="ghost">
              <Mail className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Freelancers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Freelancers</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Freelancer
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search freelancers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
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
        {freelancers.map((freelancer) => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </div>
    </div>
  );
};

export default Freelancers;
