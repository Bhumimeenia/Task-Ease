import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Building2, Users, Target, TrendingUp, Calendar, MessageSquare, FileText, Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, tasks, users, analyticsData } from '../data/dummyData';
import ViewDetailsModal from './ViewDetailsModal';

const DGDashboard: React.FC = () => {
  const [selectedCenter, setSelectedCenter] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState<'project' | 'task' | 'performance' | 'general'>('general');
  const itemsPerPage = 5;

  // Get unique values for filters
  const centers = [...new Set(users.map(u => u.center))];
  const departments = selectedCenter === 'all' 
    ? [...new Set(users.map(u => u.department))]
    : [...new Set(users.filter(u => u.center === selectedCenter).map(u => u.department))];
  
  const availableProjects = projects.filter(p => {
    if (selectedCenter !== 'all' && p.center !== selectedCenter) return false;
    if (selectedDepartment !== 'all' && p.department !== selectedDepartment) return false;
    return true;
  });

  // Filter data based on selected filters
  const getFilteredProjects = () => {
    return projects.filter(p => {
      if (selectedCenter !== 'all' && p.center !== selectedCenter) return false;
      if (selectedDepartment !== 'all' && p.department !== selectedDepartment) return false;
      if (selectedProject !== 'all' && p.id !== selectedProject) return false;
      return true;
    });
  };

  const filteredProjects = getFilteredProjects();

  const resetFilters = () => {
    setSelectedCenter('all');
    setSelectedDepartment('all');
    setSelectedProject('all');
  };

  const centerStats = centers.map(center => {
    const centerProjects = projects.filter(p => p.center === center);
    const centerUsers = users.filter(u => u.center === center);
    
    return {
      name: center,
      projects: centerProjects.length,
      efficiency: Math.floor(Math.random() * 20) + 80,
      employees: centerUsers.length
    };
  });

  const handleViewDetails = (title: string, type: 'project' | 'task' | 'performance' | 'general' = 'general') => {
    setModalTitle(title);
    setModalType(type);
    setModalOpen(true);
  };

  const recentActivities = [
    { type: 'Task', message: 'Team Standup Meeting', time: 'Today, 9:00 AM', status: 'Virtual' },
    { type: 'Project', message: 'PI Assignment Update', time: '2 days ago', status: 'Assigned' },
    { type: 'Collaboration', message: 'Collaboration Request', time: 'A document is requested from Group-2', status: 'Pending' }
  ];

  const chatActivities = [
    { message: 'File shared: Project Path.pdf', sender: 'S. Roy', time: '10:17 AM' },
    { message: 'New message from S. Roy', sender: 'Private Chat', time: '8:45 AM' },
    { message: 'Group Chat: Task Deadline Reminder', sender: 'Team Chat', time: '8:30 AM' }
  ];

  // Pagination logic for center stats
  const totalPages = Math.ceil(centerStats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCenterStats = centerStats.slice(startIndex, endIndex);

  return (
    <div className="p-6 space-y-6">
      {/* Header with filters */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Center Projects Overview</h1>
          <p className="text-gray-600">Monitor organization-wide activities and performance</p>
        </div>
      </div>

      {/* Multi-step Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Advanced Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Center</label>
              <Select value={selectedCenter} onValueChange={setSelectedCenter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Center" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Centers</SelectItem>
                  {centers.map(center => (
                    <SelectItem key={center} value={center}>{center}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {availableProjects.map(project => (
                    <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </div>

            <div className="flex items-end">
              <Button className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Categories Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-blue-900">Business Projects</CardTitle>
                <CardDescription className="text-blue-700">Commercial funded projects</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">
              {filteredProjects.filter(p => p.category === 'Business').length}
            </div>
            <Button size="sm" className="mt-2" onClick={() => handleViewDetails('Business Projects Details', 'project')}>
              View Details
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-purple-900">Funded Projects</CardTitle>
                <CardDescription className="text-purple-700">Externally funded projects</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">
              {filteredProjects.filter(p => p.category === 'Funded').length}
            </div>
            <Button size="sm" className="mt-2" onClick={() => handleViewDetails('Funded Projects Details', 'project')}>
              View Details
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-green-900">Research Projects</CardTitle>
                <CardDescription className="text-green-700">Research and innovation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">
              {filteredProjects.filter(p => p.category === 'Research').length}
            </div>
            <Button size="sm" className="mt-2" onClick={() => handleViewDetails('Research Projects Details', 'project')}>
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Project Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Projects</p>
            <p className="text-2xl font-bold">{filteredProjects.length}</p>
            <Button size="sm" variant="outline" className="mt-2" onClick={() => handleViewDetails('Total Projects Overview', 'project')}>
              View Details
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold">{filteredProjects.filter(p => p.status === 'Active').length}</p>
            <Button size="sm" variant="outline" className="mt-2" onClick={() => handleViewDetails('Active Projects Details', 'project')}>
              View Details
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold">{filteredProjects.filter(p => p.status === 'Completed').length}</p>
            <Button size="sm" variant="outline" className="mt-2" onClick={() => handleViewDetails('Completed Projects Details', 'project')}>
              View Details
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Delayed</p>
            <p className="text-2xl font-bold">{filteredProjects.filter(p => p.status === 'Delayed').length}</p>
            <Button size="sm" variant="outline" className="mt-2" onClick={() => handleViewDetails('Delayed Projects Details', 'project')}>
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Center Performance Chart with Pagination - only show if no center filter is applied */}
      {selectedCenter === 'all' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Project Categories by Center</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paginatedCenterStats.map((center, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded bg-blue-500" />
                    <span className="font-medium">{center.name}</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Projects</p>
                      <p className="font-bold">{center.projects}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Employees</p>
                      <p className="font-bold">{center.employees}</p>
                    </div>
                    <div className="text-center min-w-20">
                      <p className="text-sm text-gray-600">Efficiency</p>
                      <p className="font-bold">{center.efficiency}%</p>
                    </div>
                    <Progress value={center.efficiency} className="w-20" />
                  </div>
                </div>
              ))}
              
              {/* Pagination Controls */}
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, centerStats.length)} of {centerStats.length} centers
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Activities and Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{activity.message}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {chatActivities.map((chat, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
                <div className="flex-1">
                  <p className="font-medium">{chat.message}</p>
                  <p className="text-sm text-gray-600">{chat.sender} • {chat.time}</p>
                </div>
                <Button size="sm" variant="ghost">
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <ViewDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        type={modalType}
      />
    </div>
  );
};

export default DGDashboard;
