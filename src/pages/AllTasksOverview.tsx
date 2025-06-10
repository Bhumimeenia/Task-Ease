
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Search, Filter, Calendar, Clock, Target, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const AllTasksOverview: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');

  const allTasks = [
    {
      id: 1,
      title: 'Translation Quality Review',
      description: 'Review Hindi translation for technical documentation',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2025-06-06',
      progress: 65,
      assignedBy: 'PM Sharma',
      project: 'Medical Translation Portal'
    },
    {
      id: 2,
      title: 'CAT Tool Setup',
      description: 'Configure SDL Trados for new project',
      status: 'To Do',
      priority: 'Medium',
      dueDate: '2025-06-08',
      progress: 0,
      assignedBy: 'Team Lead',
      project: 'E-Gov Documentation'
    },
    {
      id: 3,
      title: 'Terminology Database Update',
      description: 'Add new technical terms to glossary',
      status: 'Completed',
      priority: 'Low',
      dueDate: '2025-06-04',
      progress: 100,
      assignedBy: 'QA Head',
      project: 'Technical Manual Translation'
    },
    {
      id: 4,
      title: 'Client Feedback Implementation',
      description: 'Incorporate client suggestions in translation',
      status: 'Overdue',
      priority: 'High',
      dueDate: '2025-06-03',
      progress: 30,
      assignedBy: 'Project Manager',
      project: 'Banking System Localization'
    },
    {
      id: 5,
      title: 'Document Translation',
      description: 'Translate technical manual to Hindi',
      status: 'In Progress',
      priority: 'Medium',
      dueDate: '2025-06-07',
      progress: 45,
      assignedBy: 'Project Manager',
      project: 'Healthcare App Translation'
    },
    {
      id: 6,
      title: 'Quality Check Report',
      description: 'Final quality check for translated content',
      status: 'To Do',
      priority: 'High',
      dueDate: '2025-06-09',
      progress: 0,
      assignedBy: 'QA Lead',
      project: 'E-Learning Platform'
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'To Do': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All Priority' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getTaskStats = () => {
    return {
      total: allTasks.length,
      completed: allTasks.filter(t => t.status === 'Completed').length,
      inProgress: allTasks.filter(t => t.status === 'In Progress').length,
      overdue: allTasks.filter(t => t.status === 'Overdue').length
    };
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 p-6 space-y-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Tasks Overview</h1>
              <p className="text-gray-600 mt-1">Comprehensive view of all your assigned tasks</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
              <Target className="h-8 w-8 text-blue-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
              <Clock className="h-8 w-8 text-blue-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.overdue}</div>
              <div className="text-sm text-gray-600">Overdue</div>
              <Calendar className="h-8 w-8 text-red-500 mx-auto mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Priority">All Priority</SelectItem>
                  <SelectItem value="High">High Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="Low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks ({filteredTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Project: {task.project}</span>
                        <span>Assigned by: {task.assignedBy}</span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getPriorityColor(task.priority)} border text-xs`}>
                        {task.priority}
                      </Badge>
                      <Badge className={`${getStatusBadgeVariant(task.status)} border text-xs`}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {task.status === 'In Progress' && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AllTasksOverview;
