
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
import { Progress } from '@/components/ui/progress';

interface Project {
  id: string;
  name: string;
  client: string;
  deadline: string;
  budget: number;
  progress: number;
  status: 'pending' | 'active' | 'completed' | 'on-hold';
}

interface RecentProjectsTableProps {
  projects: Project[];
}

const statusClasses = {
  pending: "bg-blue-100 text-blue-800 border-blue-200",
  active: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-purple-100 text-purple-800 border-purple-200",
  'on-hold': "bg-yellow-100 text-yellow-800 border-yellow-200"
};

const RecentProjectsTable = ({ projects }: RecentProjectsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>{project.deadline}</TableCell>
              <TableCell>${project.budget.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={project.progress} className="h-2" />
                  <span className="text-xs text-muted-foreground">{project.progress}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={statusClasses[project.status]}>
                  {project.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentProjectsTable;
