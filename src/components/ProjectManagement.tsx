import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  UserPlus,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projects, tasks, users } from '../data/dummyData';
import TaskAssignmentForm from './TaskAssignmentForm';
import ProjectCreationForm from './ProjectCreationForm';
import TeamMemberForm from './TeamMemberForm';
import ProjectDetailsModal from './ProjectDetailsModal';

const ProjectManagement: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCenter, setSelectedCenter] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProjectForTask, setSelectedProjectForTask] = useState<string>('');
  const [selectedProjectForMember, setSelectedProjectForMember] = useState<string>('');
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState<any>(null);

  // Filter projects based on user role
  const getUserProjects = () => {
    if (!currentUser) return [];
    
    switch (currentUser.role) {
      case 'DG':
        return projects;
      case 'Center Head':
        return projects.filter(p => p.center === currentUser.center);
      case 'HOD':
        return projects.filter(p => p.department === currentUser.department);
      case 'Project Manager':
      case 'Project Coordinator':
        return projects.filter(p => p.manager === currentUser.id);
      case 'Project Engineer':
      case 'Project Assistant':
        return projects.filter(p => p.assignedTo.includes(currentUser.id));
      default:
        return [];
    }
  };

  const filteredProjects = getUserProjects()
    .filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(project => 
      selectedCategory === 'All' || project.category === selectedCategory
    )
    .filter(project => 
      selectedCenter === 'All' || project.center === selectedCenter
    )
    .filter(project => 
      selectedDepartment === 'All' || project.department === selectedDepartment
    );

  const getProjectTasks = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown User';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Delayed':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleAssignTask = (projectId: string) => {
    setSelectedProjectForTask(projectId);
    setShowTaskForm(true);
  };

  const handleAddTeamMember = (projectId: string) => {
    setSelectedProjectForMember(projectId);
    setShowTeamMemberForm(true);
  };

  const handleViewDetails = (project: any) => {
    setSelectedProjectForDetails(project);
    setShowProjectDetails(true);
  };

  const cdacCenters = [
    'C-DAC Pune',
    'C-DAC Mumbai', 
    'C-DAC Bangalore',
    'C-DAC Chennai',
    'C-DAC Delhi',
    'C-DAC Hyderabad'
  ];

  const departments = [
    'Software Development',
    'Hardware Development', 
    'Research & Development',
    'AI & Machine Learning',
    'Data Science',
    'Cloud Computing'
  ];

  // Check if user can create projects/assign tasks
  const canCreateProject = currentUser?.role !== 'Project Engineer' && currentUser?.role !== 'Project Assistant';
  const canAssignTasks = currentUser?.role === 'Project Manager' || currentUser?.role === 'Project Coordinator' || currentUser?.role === 'HOD' || currentUser?.role === 'Center Head' || currentUser?.role === 'DG';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
          <p className="text-gray-600 mt-1">Manage and track your projects and tasks</p>
        </div>
        {canCreateProject && (
          <Button 
            className="flex items-center space-x-2"
            onClick={() => setShowProjectForm(true)}
          >
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        )}
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Project Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Funded">Funded</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCenter} onValueChange={setSelectedCenter}>
              <SelectTrigger>
                <SelectValue placeholder="Center" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Centers</SelectItem>
                {cdacCenters.map(center => (
                  <SelectItem key={center} value={center}>{center}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedCenter('All');
              setSelectedDepartment('All');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Project Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold">{filteredProjects.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredProjects.filter(p => p.status === 'Active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredProjects.filter(p => p.status === 'Completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delayed</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredProjects.filter(p => p.status === 'Delayed').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const projectTasks = getProjectTasks(project.id);
          const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
          
          return (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  <Badge variant="outline" className={getPriorityColor(project.priority)}>
                    {project.priority} Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Task Summary */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>{completedTasks}/{projectTasks.length} tasks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <p className="text-sm font-medium mb-2">Team</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {project.assignedTo.slice(0, 3).map((userId, index) => {
                        const user = users.find(u => u.id === userId);
                        return (
                          <div
                            key={userId}
                            className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white text-sm"
                            title={user?.name}
                          >
                            {user?.avatar}
                          </div>
                        );
                      })}
                      {project.assignedTo.length > 3 && (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white text-xs font-medium">
                          +{project.assignedTo.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">
                      Manager: {getUserName(project.manager)}
                    </span>
                  </div>
                </div>

                {/* Enhanced Quick Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewDetails(project)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {canAssignTasks && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAssignTask(project.id)}
                        title="Assign Task"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddTeamMember(project.id)}
                        title="Add Team Member"
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Task List (Expandable) */}
                {selectedProject === project.id && (
                  <div className="mt-4 space-y-2 border-t pt-4">
                    <h4 className="font-medium text-sm">Project Tasks</h4>
                    {projectTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <div className={`w-2 h-2 rounded-full ${
                          task.status === 'Completed' ? 'bg-green-500' :
                          task.status === 'In Progress' ? 'bg-blue-500' :
                          task.status === 'Overdue' ? 'bg-red-500' :
                          'bg-gray-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{task.title}</p>
                          <p className="text-xs text-gray-600">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            task.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {task.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Forms */}
      <TaskAssignmentForm
        isOpen={showTaskForm}
        onClose={() => setShowTaskForm(false)}
        projectId={selectedProjectForTask}
      />

      <ProjectCreationForm
        isOpen={showProjectForm}
        onClose={() => setShowProjectForm(false)}
      />

      <TeamMemberForm
        isOpen={showTeamMemberForm}
        onClose={() => setShowTeamMemberForm(false)}
        projectId={selectedProjectForMember}
      />

      {/* Project Details Modal */}
      <ProjectDetailsModal
        open={showProjectDetails}
        onOpenChange={setShowProjectDetails}
        project={selectedProjectForDetails}
      />
    </div>
  );
};

export default ProjectManagement;
