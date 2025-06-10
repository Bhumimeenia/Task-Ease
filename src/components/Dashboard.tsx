import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FolderOpen, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users, 
  Calendar,
  TrendingUp,
  Target,
  Filter,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { projects, tasks, analyticsData, users } from '../data/dummyData';
import Footer from './Footer';
import ViewDetailsModal from './ViewDetailsModal';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [centerFilter, setCenterFilter] = useState('All Centers');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState<'project' | 'task' | 'performance' | 'general'>('general');

  // Filter data based on user role
  const getUserProjects = () => {
    if (!currentUser) return [];
    
    let userProjects = [];
    switch (currentUser.role) {
      case 'DG':
        userProjects = projects;
        break;
      case 'Center Head':
        userProjects = projects.filter(p => p.center === currentUser.center);
        break;
      case 'HOD':
        userProjects = projects.filter(p => p.department === currentUser.department);
        break;
      case 'Project Manager':
      case 'Project Coordinator':
        userProjects = projects.filter(p => p.manager === currentUser.id);
        break;
      case 'Project Engineer':
      case 'Project Assistant':
        userProjects = projects.filter(p => p.assignedTo.includes(currentUser.id));
        break;
      default:
        userProjects = [];
    }

    // Apply filters
    if (centerFilter !== 'All Centers') {
      userProjects = userProjects.filter(p => p.center === centerFilter);
    }
    if (categoryFilter !== 'All Categories') {
      userProjects = userProjects.filter(p => p.category === categoryFilter);
    }

    return userProjects;
  };

  const getUserTasks = () => {
    if (!currentUser) return [];
    
    const userProjects = getUserProjects();
    const projectIds = userProjects.map(p => p.id);
    
    if (currentUser.role === 'Project Engineer' || currentUser.role === 'Project Assistant') {
      return tasks.filter(t => t.assignedTo === currentUser.id);
    }
    
    return tasks.filter(t => projectIds.includes(t.projectId));
  };

  const userProjects = getUserProjects();
  const userTasks = getUserTasks();

  const stats = [
    {
      title: 'Total Projects',
      value: userProjects.length,
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Projects',
      value: userProjects.filter(p => p.status === 'Active').length,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Completed Tasks',
      value: userTasks.filter(t => t.status === 'Completed').length,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Pending Tasks',
      value: userTasks.filter(t => t.status === 'To Do' || t.status === 'In Progress').length,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // Get unique centers and categories
  const centers = [...new Set(projects.map(p => p.center))];
  const categories = [...new Set(projects.map(p => p.category))];

  // Determine which filters to show based on role
  const showCenterFilter = currentUser?.role === 'DG';
  const showCategoryFilter = currentUser?.role === 'DG';

  const handleViewDetails = (title: string, type: 'project' | 'task' | 'performance' | 'general' = 'general') => {
    setModalTitle(title);
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 p-6 space-y-6 pb-24">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {currentUser?.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your projects today.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Dynamic Filters Section Based on Role */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-900">
              <Filter className="h-5 w-5" />
              <span>Project Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {/* Show Center filter only for DG */}
              {showCenterFilter && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Filter by Center</label>
                  <Select value={centerFilter} onValueChange={setCenterFilter}>
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Centers">All Centers</SelectItem>
                      {centers.map(center => (
                        <SelectItem key={center} value={center}>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{center}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Show Category filter only for DG */}
              {showCategoryFilter && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Filter by Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Categories">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Project dropdown for all roles */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Project</label>
                <Select>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {userProjects.map(project => (
                      <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* From Date Picker */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">From Date</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* To Date Picker */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">To Date</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCenterFilter('All Centers');
                    setCategoryFilter('All Categories');
                  }}
                  className="w-full bg-white hover:bg-gray-50"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Project Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-600 rounded-xl shadow-md">
                  <FolderOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-blue-900">Business Projects</CardTitle>
                  <CardDescription className="text-blue-700">Commercial funded projects</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {userProjects.filter(p => p.category === 'Business').length}
              </div>
              <p className="text-sm text-blue-700">Active projects</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-600 rounded-xl shadow-md">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-purple-900">Funded Projects</CardTitle>
                  <CardDescription className="text-purple-700">Externally funded projects</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-900 mb-2">
                {userProjects.filter(p => p.category === 'Funded').length}
              </div>
              <p className="text-sm text-purple-700">Active projects</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-600 rounded-xl shadow-md">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-green-900">Research Projects</CardTitle>
                  <CardDescription className="text-green-700">Research and innovation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-900 mb-2">
                {userProjects.filter(p => p.category === 'Research').length}
              </div>
              <p className="text-sm text-green-700">Active projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FolderOpen className="h-5 w-5" />
                <span>Recent Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userProjects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{project.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'Active' ? 'bg-green-100 text-green-800' :
                          project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'Delayed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                        <span className="text-xs text-gray-500">Due: {new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-lg font-bold text-gray-900">{project.progress}%</div>
                      <Progress value={project.progress} className="w-16 mt-1" />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => handleViewDetails(`${project.title} Details`, 'project')}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Tasks */}
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>My Tasks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userTasks.slice(0, 4).map((task) => (
                  <div key={task.id} className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${
                      task.status === 'Completed' ? 'bg-green-500' :
                      task.status === 'In Progress' ? 'bg-blue-500' :
                      task.status === 'Overdue' ? 'bg-red-500' :
                      'bg-gray-400'
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`text-xs font-medium ${
                          task.priority === 'High' ? 'text-red-600' :
                          task.priority === 'Medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {task.priority} Priority
                        </span>
                        <span className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleViewDetails(`${task.title} Details`, 'task')}
                      >
                        View More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline" size="sm" onClick={() => navigate('/all-tasks')}>
                  View All Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
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

export default Dashboard;
