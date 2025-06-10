
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Target, 
  TrendingUp, 
  Activity,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { projects, users, calendarEvents } from '../data/dummyData';
import AnalyticsFilters from './AnalyticsFilters';

const Analytics: React.FC = () => {
  const { currentUser } = useAuth();
  const [filters, setFilters] = useState({
    center: currentUser?.role === 'Center Head' ? currentUser.center || 'All Centers' : 'All Centers',
    department: currentUser?.role === 'HOD' ? currentUser.department || 'All Departments' : 'All Departments',
    project: 'All Projects',
    team: 'All Teams',
    dateRange: 'Last 30 Days',
    status: 'All Status'
  });

  // Role-based data filtering
  const getFilteredData = () => {
    let filteredProjects = projects;
    let filteredUsers = users;
    let filteredEvents = calendarEvents;

    // Role-based access control
    if (currentUser?.role === 'Project Engineer' || currentUser?.role === 'Project Assistant') {
      // Only show projects they are assigned to
      filteredProjects = projects.filter(project => 
        project.assignedTo?.includes(currentUser.id) || project.manager === currentUser.id
      );
      filteredUsers = users.filter(user => 
        filteredProjects.some(project => project.assignedTo?.includes(user.id))
      );
    } else if (currentUser?.role === 'Project Manager') {
      // Show projects they manage
      filteredProjects = projects.filter(project => project.manager === currentUser.id);
    } else if (currentUser?.role === 'HOD') {
      // Show departmental projects
      filteredProjects = projects.filter(project => project.department === currentUser.department);
    } else if (currentUser?.role === 'Center Head') {
      // Show center-specific projects
      filteredProjects = projects.filter(project => project.center === currentUser.center);
    }

    // Apply additional filters
    if (filters.center !== 'All Centers') {
      filteredProjects = filteredProjects.filter(project => project.center === filters.center);
    }
    if (filters.department !== 'All Departments') {
      filteredProjects = filteredProjects.filter(project => project.department === filters.department);
    }
    if (filters.project !== 'All Projects') {
      filteredProjects = filteredProjects.filter(project => project.id === filters.project);
    }
    if (filters.status !== 'All Status') {
      filteredProjects = filteredProjects.filter(project => project.status === filters.status);
    }

    return { filteredProjects, filteredUsers, filteredEvents };
  };

  const { filteredProjects, filteredUsers, filteredEvents } = getFilteredData();

  const getProjectStats = () => {
    const total = filteredProjects.length;
    const active = filteredProjects.filter(p => p.status === 'Active').length;
    const completed = filteredProjects.filter(p => p.status === 'Completed').length;
    const delayed = filteredProjects.filter(p => p.status === 'Delayed').length;
    
    return { total, active, completed, delayed };
  };

  const getTeamStats = () => {
    const totalTeamMembers = filteredUsers.length;
    const availableMembers = filteredUsers.filter(u => u.role !== 'DG').length; // Use role as proxy for availability
    const busyMembers = filteredUsers.filter(u => u.role === 'Project Engineer' || u.role === 'Project Assistant').length;
    
    return { totalTeamMembers, availableMembers, busyMembers };
  };

  const getEventStats = () => {
    const totalEvents = filteredEvents.length;
    const pendingApproval = filteredEvents.filter(e => e.status === 'pending').length;
    const approved = filteredEvents.filter(e => e.status === 'approved').length;
    
    return { totalEvents, pendingApproval, approved };
  };

  const projectStats = getProjectStats();
  const teamStats = getTeamStats();
  const eventStats = getEventStats();

  // CDAC Centers list
  const centers = [
    'All Centers', 'Pune', 'Bengaluru', 'Chennai', 'Delhi', 'Hyderabad', 
    'Kolkata', 'Mohali', 'Mumbai', 'Noida', 'Patna', 'Silchar', 'Thiruvananthapuram'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">
            {currentUser?.role === 'DG' ? 'All Centers Overview' :
             currentUser?.role === 'Center Head' ? `${currentUser.center} Center Analytics` :
             currentUser?.role === 'HOD' ? `${currentUser.department} Department Analytics` :
             'Project Analytics Dashboard'}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <AnalyticsFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold">{projectStats.total}</p>
                <p className="text-xs text-green-600">↑ 12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold">{projectStats.active}</p>
                <p className="text-xs text-green-600">↑ 8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Team Members</p>
                <p className="text-2xl font-bold">{teamStats.totalTeamMembers}</p>
                <p className="text-xs text-blue-600">{teamStats.availableMembers} available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheduled Events</p>
                <p className="text-2xl font-bold">{eventStats.totalEvents}</p>
                <p className="text-xs text-yellow-600">{eventStats.pendingApproval} pending approval</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current status across {filters.center === 'All Centers' ? 'all centers' : filters.center}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active</span>
                <Badge variant="default">{projectStats.active}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed</span>
                <Badge variant="secondary">{projectStats.completed}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Delayed</span>
                <Badge variant="destructive">{projectStats.delayed}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Team availability and workload distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Available</span>
                <Badge variant="default">{teamStats.availableMembers}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Busy</span>
                <Badge variant="secondary">{teamStats.busyMembers}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Utilization Rate</span>
                <Badge variant="outline">
                  {teamStats.totalTeamMembers > 0 ? Math.round((teamStats.busyMembers / teamStats.totalTeamMembers) * 100) : 0}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Latest project activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProjects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {project.center} • {project.department}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={
                      project.status === 'Active' ? 'default' : 
                      project.status === 'Completed' ? 'secondary' : 'destructive'
                    }
                  >
                    {project.status}
                  </Badge>
                  <span className="text-sm text-gray-600">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
