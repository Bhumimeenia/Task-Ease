import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Users, Target, BarChart3, Calendar, MessageSquare, FileText, Clock, Filter } from 'lucide-react';
import { projects, tasks, users } from '../data/dummyData';
import Footer from './Footer';
import ViewDetailsModal from './ViewDetailsModal';

const CenterHeadDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState<'project' | 'task' | 'performance' | 'general'>('general');

  const centerProjects = projects.filter(p => p.center === currentUser?.center);
  const centerUsers = users.filter(u => u.center === currentUser?.center);

  // Get unique departments in this center
  const departments = [...new Set(centerUsers.map(u => u.department))];
  
  const availableProjects = centerProjects.filter(p => {
    if (selectedDepartment !== 'all' && p.department !== selectedDepartment) return false;
    return true;
  });

  // Filter data based on selected filters
  const getFilteredProjects = () => {
    return centerProjects.filter(p => {
      if (selectedDepartment !== 'all' && p.department !== selectedDepartment) return false;
      if (selectedProject !== 'all' && p.id !== selectedProject) return false;
      return true;
    });
  };

  const filteredProjects = getFilteredProjects();

  const resetFilters = () => {
    setSelectedDepartment('all');
    setSelectedProject('all');
  };

  const projectCategories = [
    { name: 'Business Project', count: filteredProjects.filter(p => p.category === 'Business').length, description: 'All commercial projects' },
    { name: 'Funded Project', count: filteredProjects.filter(p => p.category === 'Funded').length, description: 'Externally funded projects' },
    { name: 'Research Project', count: filteredProjects.filter(p => p.category === 'Research').length, description: 'Research and innovation' }
  ];

  const distributionData = departments.map(dept => {
    const deptProjects = filteredProjects.filter(p => p.department === dept);
    return {
      category: dept,
      total: deptProjects.length,
      active: deptProjects.filter(p => p.status === 'Active').length,
      completed: deptProjects.filter(p => p.status === 'Completed').length,
      delayed: deptProjects.filter(p => p.status === 'Delayed').length,
      efficiency: deptProjects.length > 0 ? Math.floor((deptProjects.filter(p => p.status === 'Completed').length / deptProjects.length) * 100) + '%' : '0%'
    };
  });

  const currentActivities = [
    { activity: 'Weekly Review Meeting', time: 'Today • 9:00 PM' },
    { activity: 'PM Assignment Update', time: '2 days PM assigned' },
    { activity: 'Collaboration Request', time: 'A document is requested from Group-2' }
  ];

  const chatActivities = [
    { message: 'File shared: Project Plan.pdf', sender: 'Project Chat', time: '10:17 AM', avatar: '📁' },
    { message: 'New message from S. Roy', sender: 'Private Chat', time: '8:45 AM', avatar: '👤' },
    { message: 'Group Chat: Task Deadline Reminder', sender: 'Team Chat', time: '8:30 AM', avatar: '👥' }
  ];

  const recentProjects = filteredProjects.slice(0, 4);

  const handleViewDetails = (title: string, type: 'project' | 'task' | 'performance' | 'general' = 'general') => {
    setModalTitle(title);
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 p-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Center Projects Overview</h1>
            <p className="text-gray-600">Monitor {currentUser?.center} center activities and performance</p>
          </div>
        </div>

        {/* Filters for Center Head */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Department & Project Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
                <Button>Download Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projectCategories.map((category, index) => {
            const colors = ['blue', 'purple', 'green'];
            const color = colors[index];
            
            return (
              <Card key={index} className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border-${color}-200`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-${color}-600 rounded-lg`}>
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-lg text-${color}-900`}>{category.name}</CardTitle>
                      <CardDescription className={`text-${color}-700`}>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold text-${color}-900 mb-2`}>{category.count}</div>
                  <Button size="sm" onClick={() => handleViewDetails(`${category.name} Details`, 'project')}>
                    Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Project Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold">{filteredProjects.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold">{filteredProjects.filter(p => p.status === 'Active').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold">{filteredProjects.filter(p => p.status === 'Completed').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Delayed</p>
              <p className="text-2xl font-bold">{filteredProjects.filter(p => p.status === 'Delayed').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Distribution Table */}
        {selectedDepartment === 'all' && (
          <Card>
            <CardHeader>
              <CardTitle>Project Distribution by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Department</th>
                      <th className="text-left p-3">Total</th>
                      <th className="text-left p-3">Active</th>
                      <th className="text-left p-3">Completed</th>
                      <th className="text-left p-3">Delayed</th>
                      <th className="text-left p-3">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {distributionData.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{row.category}</td>
                        <td className="p-3">{row.total}</td>
                        <td className="p-3">{row.active}</td>
                        <td className="p-3">{row.completed}</td>
                        <td className="p-3">{row.delayed}</td>
                        <td className="p-3">{row.efficiency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              {currentActivities.map((activity, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <p className="font-medium">{activity.activity}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
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
                  <div className="text-lg">{chat.avatar}</div>
                  <div className="flex-1">
                    <p className="font-medium">{chat.message}</p>
                    <p className="text-sm text-gray-600">{chat.sender} • {chat.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-gray-600">{project.category} • Due: {new Date(project.deadline).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{project.progress}%</p>
                      <Progress value={project.progress} className="w-16" />
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
      <ViewDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        type={modalType}
      />
    </div>
  );
};

export default CenterHeadDashboard;
