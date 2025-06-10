import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  Calendar,
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  File,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Reports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const dummyReports = [
    {
      id: 1,
      title: 'Monthly Usage Analytics Report',
      type: 'Usage Report',
      dateRange: '01 Nov 2024 - 30 Nov 2024',
      format: 'Excel',
      status: 'Completed',
      size: '2.4 MB',
      generatedBy: 'System',
      comments: 'Comprehensive usage statistics across all centers',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Project Quality Score Assessment',
      type: 'Quality Score Report',
      dateRange: '15 Oct 2024 - 15 Nov 2024',
      format: 'PDF',
      status: 'Completed',
      size: '1.8 MB',
      generatedBy: 'Priya Sharma',
      comments: 'Quality metrics for translation and QA projects',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Center-wise Project Status Dashboard',
      type: 'Project Status Report',
      dateRange: '01 Dec 2024 - Current',
      format: 'Excel',
      status: 'In Progress',
      size: 'Generating...',
      generatedBy: 'Automated',
      comments: 'Real-time project status across all CDAC centers',
      downloadUrl: '#'
    },
    {
      id: 4,
      title: 'Team Performance Metrics Q4',
      type: 'Performance Report',
      dateRange: '01 Oct 2024 - 31 Dec 2024',
      format: 'PDF',
      status: 'Pending',
      size: 'N/A',
      generatedBy: 'Rahul Kumar',
      comments: 'Quarterly performance analysis for all teams',
      downloadUrl: '#'
    },
    {
      id: 5,
      title: 'Resource Utilization Summary',
      type: 'Resource Report',
      dateRange: '01 Nov 2024 - 30 Nov 2024',
      format: 'Excel',
      status: 'Completed',
      size: '3.2 MB',
      generatedBy: 'System',
      comments: 'Human and technical resource allocation analysis',
      downloadUrl: '#'
    },
    {
      id: 6,
      title: 'Client Feedback Compilation',
      type: 'Feedback Report',
      dateRange: '01 Sep 2024 - 30 Nov 2024',
      format: 'PDF',
      status: 'Completed',
      size: '4.1 MB',
      generatedBy: 'Sneha Patel',
      comments: 'Client satisfaction surveys and feedback analysis',
      downloadUrl: '#'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'Excel':
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case 'PDF':
        return <File className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredReports = dummyReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Documentation</h1>
          <p className="text-gray-600 mt-1">Generate, view, and download project reports</p>
        </div>
        <Button className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4" />
          <span>Generate New Report</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{dummyReports.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {dummyReports.filter(r => r.status === 'Completed').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {dummyReports.filter(r => r.status === 'In Progress').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Size</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">11.5 MB</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter Reports</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Usage Report">Usage Report</SelectItem>
                <SelectItem value="Quality Score Report">Quality Score Report</SelectItem>
                <SelectItem value="Project Status Report">Project Status Report</SelectItem>
                <SelectItem value="Performance Report">Performance Report</SelectItem>
                <SelectItem value="Resource Report">Resource Report</SelectItem>
                <SelectItem value="Feedback Report">Feedback Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reports List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Generated By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-gray-500">{report.comments}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{report.dateRange}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getFormatIcon(report.format)}
                      <span>{report.format}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(report.status)}
                      <Badge className={getStatusColor(report.status)} variant="secondary">
                        {report.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{report.size}</TableCell>
                  <TableCell className="text-sm">{report.generatedBy}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {report.status === 'Completed' && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
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

export default Reports;
