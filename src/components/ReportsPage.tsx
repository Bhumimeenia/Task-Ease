
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  Target
} from 'lucide-react';
import Footer from './Footer';

const ReportsPage: React.FC = () => {
  const [selectedCenter, setSelectedCenter] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30');

  const projectStatusData = [
    { name: 'Active', value: 12, color: '#10B981' },
    { name: 'Completed', value: 8, color: '#3B82F6' },
    { name: 'Delayed', value: 3, color: '#EF4444' },
    { name: 'Planning', value: 5, color: '#F59E0B' }
  ];

  const projectCategoryData = [
    { name: 'Research', count: 8, percentage: 28.6 },
    { name: 'Software Dev', count: 12, percentage: 42.9 },
    { name: 'Hardware', count: 5, percentage: 17.9 },
    { name: 'Consultancy', count: 3, percentage: 10.7 }
  ];

  const departmentData = [
    { name: 'Software Development', projects: 15, completed: 8, active: 7 },
    { name: 'Research & Development', projects: 12, completed: 5, active: 7 },
    { name: 'Hardware Development', projects: 8, completed: 3, active: 5 },
    { name: 'Training & Consultancy', projects: 6, completed: 4, active: 2 }
  ];

  const monthlyProgressData = [
    { month: 'Jan', completed: 4, started: 6 },
    { month: 'Feb', completed: 7, started: 5 },
    { month: 'Mar', completed: 5, started: 8 },
    { month: 'Apr', completed: 9, started: 4 },
    { month: 'May', completed: 6, started: 7 },
    { month: 'Jun', completed: 8, started: 6 }
  ];

  const teamPerformanceData = [
    { name: 'Team A', efficiency: 85, projects: 12 },
    { name: 'Team B', efficiency: 92, projects: 8 },
    { name: 'Team C', efficiency: 78, projects: 15 },
    { name: 'Team D', efficiency: 88, projects: 10 }
  ];

  const centers = [
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
    'Training & Consultancy',
    'Administration',
    'Quality Assurance'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive project and team performance insights</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Schedule Report</span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Report Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedCenter} onValueChange={setSelectedCenter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Center" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Centers</SelectItem>
                  <SelectItem value="C-DAC Pune">C-DAC Pune</SelectItem>
                  <SelectItem value="C-DAC Mumbai">C-DAC Mumbai</SelectItem>
                  <SelectItem value="C-DAC Bangalore">C-DAC Bangalore</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Departments</SelectItem>
                  <SelectItem value="Software Development">Software Development</SelectItem>
                  <SelectItem value="Hardware Development">Hardware Development</SelectItem>
                  <SelectItem value="Research & Development">Research & Development</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 3 months</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                setSelectedCenter('All');
                setSelectedDepartment('All');
                setSelectedTimeRange('30');
              }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold">28</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% from last month
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
                  <p className="text-sm text-gray-600">Team Members</p>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Users className="h-3 w-3 mr-1" />
                    Across 8 departments
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Completion</p>
                  <p className="text-2xl font-bold">73%</p>
                  <p className="text-xs text-yellow-600 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    3 days faster
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Project Status Distribution</CardTitle>
              <CardDescription>Current status of all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Active', value: 12, color: '#10B981' },
                      { name: 'Completed', value: 8, color: '#3B82F6' },
                      { name: 'Delayed', value: 3, color: '#EF4444' },
                      { name: 'Planning', value: 5, color: '#F59E0B' }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {[
                      { name: 'Active', value: 12, color: '#10B981' },
                      { name: 'Completed', value: 8, color: '#3B82F6' },
                      { name: 'Delayed', value: 3, color: '#EF4444' },
                      { name: 'Planning', value: 5, color: '#F59E0B' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Project Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Project Categories</CardTitle>
              <CardDescription>Distribution by project type</CardDescription>
              <div className="flex space-x-2">
                <Select defaultValue="All">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Centers</SelectItem>
                    <SelectItem value="Pune">C-DAC Pune</SelectItem>
                    <SelectItem value="Mumbai">C-DAC Mumbai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Research', count: 8, percentage: 28.6 },
                  { name: 'Software Dev', count: 12, percentage: 42.9 },
                  { name: 'Hardware', count: 5, percentage: 17.9 },
                  { name: 'Consultancy', count: 3, percentage: 10.7 }
                ].map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{category.name}</span>
                      <span>{category.count} projects ({category.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Distribution by Department */}
          <Card>
            <CardHeader>
              <CardTitle>Project Distribution by Department</CardTitle>
              <CardDescription>Projects by department breakdown</CardDescription>
              <div className="flex space-x-2">
                <Select defaultValue="All">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Departments</SelectItem>
                    <SelectItem value="Software">Software Development</SelectItem>
                    <SelectItem value="Hardware">Hardware Development</SelectItem>
                    <SelectItem value="Research">Research & Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Software Development', projects: 15, completed: 8, active: 7 },
                  { name: 'Research & Development', projects: 12, completed: 5, active: 7 },
                  { name: 'Hardware Development', projects: 8, completed: 3, active: 5 },
                  { name: 'Training & Consultancy', projects: 6, completed: 4, active: 2 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10B981" name="Completed" />
                  <Bar dataKey="active" fill="#3B82F6" name="Active" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress Trend</CardTitle>
              <CardDescription>Projects completed vs started each month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { month: 'Jan', completed: 4, started: 6 },
                  { month: 'Feb', completed: 7, started: 5 },
                  { month: 'Mar', completed: 5, started: 8 },
                  { month: 'Apr', completed: 9, started: 4 },
                  { month: 'May', completed: 6, started: 7 },
                  { month: 'Jun', completed: 8, started: 6 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#10B981" name="Completed" />
                  <Line type="monotone" dataKey="started" stroke="#3B82F6" name="Started" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Team Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance Overview</CardTitle>
            <CardDescription>Performance metrics by team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Team</th>
                    <th className="text-left p-2">Projects</th>
                    <th className="text-left p-2">Efficiency</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Team A', efficiency: 85, projects: 12 },
                    { name: 'Team B', efficiency: 92, projects: 8 },
                    { name: 'Team C', efficiency: 78, projects: 15 },
                    { name: 'Team D', efficiency: 88, projects: 10 }
                  ].map((team, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{team.name}</td>
                      <td className="p-2">{team.projects}</td>
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${team.efficiency}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{team.efficiency}%</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge variant={team.efficiency >= 85 ? "default" : "secondary"}>
                          {team.efficiency >= 85 ? 'Excellent' : 'Good'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReportsPage;
