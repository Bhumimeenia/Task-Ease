
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Filter, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AnalyticsFiltersProps {
  filters: {
    center: string;
    department: string;
    project: string;
    team: string;
    dateRange: string;
    status: string;
  };
  onFiltersChange: (filters: any) => void;
}

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({ filters, onFiltersChange }) => {
  const { currentUser } = useAuth();

  // CDAC Centers
  const centers = [
    'All Centers', 'Pune', 'Bengaluru', 'Chennai', 'Delhi', 'Hyderabad', 
    'Kolkata', 'Mohali', 'Mumbai', 'Noida', 'Patna', 'Silchar', 'Thiruvananthapuram'
  ];
  
  const departments = ['All Departments', 'AI/ML', 'Cybersecurity', 'Cloud Computing', 'IoT', 'Blockchain', 'Software Development', 'Research & Development'];
  const projects = ['All Projects', 'Smart City Platform', 'AI Research', 'Quantum Computing', 'Healthcare System', 'Digital India Initiative'];
  const teams = ['All Teams', 'Alpha Team', 'Beta Team', 'Gamma Team', 'Delta Team', 'Research Team'];
  const dateRanges = ['Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Last Year', 'Custom Range'];
  const statuses = ['All Status', 'Active', 'Completed', 'Delayed', 'Pending'];

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
    const defaultFilters = {
      center: currentUser?.role === 'Center Head' ? currentUser.center || 'All Centers' : 'All Centers',
      department: currentUser?.role === 'HOD' ? currentUser.department || 'All Departments' : 'All Departments',
      project: 'All Projects',
      team: 'All Teams',
      dateRange: 'Last 30 Days',
      status: 'All Status'
    };
    onFiltersChange(defaultFilters);
  };

  // Filter options based on user role
  const getAvailableCenters = () => {
    if (currentUser?.role === 'Center Head') {
      return [currentUser.center || 'All Centers'];
    }
    if (currentUser?.role === 'DG') {
      return centers;
    }
    return centers;
  };

  const getAvailableDepartments = () => {
    if (currentUser?.role === 'HOD') {
      return [currentUser.department || 'All Departments'];
    }
    return departments;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Analytics Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <Label>Center</Label>
            <Select value={filters.center} onValueChange={(value) => handleFilterChange('center', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getAvailableCenters().map(center => (
                  <SelectItem key={center} value={center}>{center}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Department</Label>
            <Select value={filters.department} onValueChange={(value) => handleFilterChange('department', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getAvailableDepartments().map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Project</Label>
            <Select value={filters.project} onValueChange={(value) => handleFilterChange('project', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Team</Label>
            <Select value={filters.team} onValueChange={(value) => handleFilterChange('team', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {teams.map(team => (
                  <SelectItem key={team} value={team}>{team}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Date Range</Label>
            <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsFilters;
