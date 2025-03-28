
import React, { useState } from 'react';
import { 
  ChevronDown, 
  Filter, 
  Search, 
  Plus, 
  Download,
  ArrowUpDown,
  MoreHorizontal,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample invoice data
const invoices = [
  {
    id: "INV-001",
    client: "Acme Corp",
    project: "E-commerce Redesign",
    amount: 3500,
    issued: "2023-11-01",
    due: "2023-11-15",
    status: "paid",
  },
  {
    id: "INV-002",
    client: "TechStart Inc",
    project: "Mobile App Development",
    amount: 7500,
    issued: "2023-11-05",
    due: "2023-11-20",
    status: "pending",
  },
  {
    id: "INV-003",
    client: "GrowthMedia",
    project: "SEO Optimization",
    amount: 1200,
    issued: "2023-10-28",
    due: "2023-11-12",
    status: "overdue",
  },
  {
    id: "INV-004",
    client: "Fashion Forward",
    project: "Social Media Campaign",
    amount: 2000,
    issued: "2023-11-10",
    due: "2023-11-25",
    status: "pending",
  },
  {
    id: "INV-005",
    client: "DataViz Solutions",
    project: "Data Analytics Platform",
    amount: 5000,
    issued: "2023-10-20",
    due: "2023-11-03",
    status: "paid",
  },
  {
    id: "INV-006",
    client: "Green Energy Co",
    project: "Brand Identity Refresh",
    amount: 3000,
    issued: "2023-11-08",
    due: "2023-11-23",
    status: "pending",
  },
  {
    id: "INV-007",
    client: "Global Services Ltd",
    project: "Website Migration",
    amount: 4200,
    issued: "2023-10-25",
    due: "2023-11-08",
    status: "overdue",
  },
  {
    id: "INV-008",
    client: "Retail Chain Inc",
    project: "Customer Portal",
    amount: 6500,
    issued: "2023-10-15",
    due: "2023-10-30",
    status: "paid",
  },
];

const invoiceSummary = {
  paid: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
  pending: invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
  overdue: invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0),
  total: invoices.reduce((sum, inv) => sum + inv.amount, 0)
};

// Helper to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter invoices based on search term and status
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${invoiceSummary.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{invoices.length} invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${invoiceSummary.paid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.filter(inv => inv.status === 'paid').length} invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${invoiceSummary.pending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.filter(inv => inv.status === 'pending').length} invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${invoiceSummary.overdue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.filter(inv => inv.status === 'overdue').length} invoices
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
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
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center">
                    Invoice ID
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Client
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Project</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Amount
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Issue Date
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Due Date
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Status
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.project}</TableCell>
                  <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {formatDate(invoice.issued)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {formatDate(invoice.due)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }
                    >
                      <div className="flex items-center">
                        {invoice.status === 'paid' && <CheckCircle className="mr-1 h-3 w-3" />}
                        {invoice.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                        {invoice.status === 'overdue' && <XCircle className="mr-1 h-3 w-3" />}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Invoice</DropdownMenuItem>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;
