import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Calendar,
  Users,
  TrendingUp,
  Target,
  Award,
  MessageSquare,
  Bell,
  FileText,
  BarChart3
} from 'lucide-react';
import TaskStatusDistribution from './TaskStatusDistribution';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTaskTab, setActiveTaskTab] = useState('all');

  // Mock data for employee dashboard
  const myTasks = [
    {
      id: 1,
      title: 'Translation Quality Review',
      description: 'Review Hindi translation for technical documentation',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2025-06-06',
      progress: 65,
      assignedBy: 'PM Sharma'
    },
    {
      id: 2,
      title: 'CAT Tool Setup',
      description: 'Configure SDL Trados for new project',
      status: 'To Do',
      priority: 'Medium',
      dueDate: '2025-06-08',
      progress: 0,
      assignedBy: 'Team Lead'
    },
    {
      id: 3,
      title: 'Terminology Database Update',
      description: 'Add new technical terms to glossary',
      status: 'Completed',
      priority: 'Low',
      dueDate: '2025-06-04',
      progress: 100,
      assignedBy: 'QA Head'
    },
    {
      id: 4,
      title: 'Client Feedback Implementation',
      description: 'Incorporate client suggestions in translation',
      status: 'Overdue',
      priority: 'High',
      dueDate: '2025-06-03',
      progress: 30,
      assignedBy: 'Project Manager'
    },
    {
      id: 5,
      title: 'Document Translation',
      description: 'Translate technical manual to Hindi',
      status: 'In Progress',
      priority: 'Medium',
      dueDate: '2025-06-07',
      progress: 45,
      assignedBy: 'Project Manager'
    },
    {
      id: 6,
      title: 'Quality Check Report',
      description: 'Final quality check for translated content',
      status: 'To Do',
      priority: 'High',
      dueDate: '2025-06-09',
      progress: 0,
      assignedBy: 'QA Lead'
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getFilteredTasks = () => {
    switch (activeTaskTab) {
      case 'in-progress':
        return myTasks.filter(t => t.status === 'In Progress');
      case 'pending':
        return myTasks.filter(t => t.status === 'To Do');
      case 'completed':
        return myTasks.filter(t => t.status === 'Completed');
      case 'overdue':
        return myTasks.filter(t => t.status === 'Overdue');
      default:
        return myTasks;
    }
  };

  const getTaskCounts = () => {
    return {
      total: myTasks.length,
      completed: myTasks.filter(t => t.status === 'Completed').length,
      inProgress: myTasks.filter(t => t.status === 'In Progress').length,
      overdue: myTasks.filter(t => t.status === 'Overdue').length
    };
  };

  const taskCounts = getTaskCounts();
  const filteredTasks = getFilteredTasks();

  const handleViewAllTasks = () => {
    navigate('/all-tasks');
  };

  const handleSkillsAssessment = () => {
    navigate('/skills-assessment');
  };

  const handlePerformanceReview = () => {
    navigate('/performance-review');
  };

  const handleTeamCollaboration = () => {
    navigate('/team-collaboration');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 p-6 space-y-6 pb-24">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>
            <p className="text-gray-600 mt-1">Here's your daily overview and pending tasks</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Quick Chat
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{taskCounts.total}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{taskCounts.completed}</p>
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
                  <p className="text-3xl font-bold text-blue-600 mt-2">{taskCounts.inProgress}</p>
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
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{taskCounts.overdue}</p>
                </div>
                <div className="p-3 rounded-full bg-red-50">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Status Distribution Section */}
        <TaskStatusDistribution />

        {/* My Tasks with Tabs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>My Tasks</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleViewAllTasks}>
              View All Tasks
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTaskTab} onValueChange={setActiveTaskTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTaskTab} className="mt-6">
                <div className="space-y-4">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-3 p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                        <div className={`w-3 h-3 rounded-full ${
                          task.status === 'Completed' ? 'bg-green-500' :
                          task.status === 'In Progress' ? 'bg-blue-500' :
                          task.status === 'Overdue' ? 'bg-red-500' :
                          'bg-gray-400'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority} Priority
                            </span>
                            <span className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            <span className="text-xs text-gray-500">Assigned by: {task.assignedBy}</span>
                          </div>
                          {task.status === 'In Progress' && (
                            <div className="mt-2">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-gray-600">Progress</span>
                                <span className="text-xs text-gray-600">{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusBadgeVariant(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>No tasks found in this category</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleSkillsAssessment}>
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Skills Assessment</h3>
              <p className="text-gray-600 text-sm">Take a skill assessment to showcase your expertise</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handlePerformanceReview}>
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-green-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Performance Review</h3>
              <p className="text-gray-600 text-sm">View your performance metrics and feedback</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleTeamCollaboration}>
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-purple-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600 text-sm">Connect with team members and share knowledge</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EmployeeDashboard;
