
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Freelancer {
  id: string;
  name: string;
  avatar?: string;
  skills: string[];
  hourlyRate: number;
  status: 'available' | 'busy' | 'offline';
}

interface RecentFreelancersTableProps {
  freelancers: Freelancer[];
}

const statusClasses = {
  available: "bg-green-100 text-green-800 border-green-200",
  busy: "bg-orange-100 text-orange-800 border-orange-200",
  offline: "bg-gray-100 text-gray-800 border-gray-200"
};

const RecentFreelancersTable = ({ freelancers }: RecentFreelancersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Freelancer</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Hourly Rate</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {freelancers.map((freelancer) => (
            <TableRow key={freelancer.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                    <AvatarFallback>
                      {freelancer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {freelancer.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {freelancer.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {freelancer.skills.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{freelancer.skills.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>${freelancer.hourlyRate}/hr</TableCell>
              <TableCell>
                <Badge className={statusClasses[freelancer.status]}>
                  {freelancer.status.charAt(0).toUpperCase() + freelancer.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentFreelancersTable;
