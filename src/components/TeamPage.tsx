
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Search, 
  Filter,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Award,
  MessageCircle
} from 'lucide-react';
import { users } from '../data/dummyData';

const TeamPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');

  const getTeamMembers = () => {
    if (!currentUser) return [];

    let teamMembers = [];
    const userRole = currentUser.role;

    switch (userRole) {
      case 'DG':
        // DG sees Centre Heads → HODs → Project Managers
        teamMembers = users.filter(u => 
          u.role === 'Center Head' || 
          u.role === 'HOD' || 
          u.role === 'Project Manager'
        );
        break;

      case 'Center Head':
        // Centre Head sees HODs → Project Managers → Coordinators
        teamMembers = users.filter(u => 
          u.center === currentUser.center && (
            u.role === 'HOD' ||
            u.role === 'Project Manager' ||
            u.role === 'Project Coordinator'
          )
        );
        break;

      case 'HOD':
        // HOD sees Project Managers → Coordinators → Project Engineers
        teamMembers = users.filter(u => 
          u.department === currentUser.department && 
          u.center === currentUser.center && (
            u.role === 'Project Manager' ||
            u.role === 'Project Coordinator' ||
            u.role === 'Project Engineer'
          )
        );
        break;

      case 'Project Manager':
        // PM sees Coordinators → Engineers → Project Assistants
        teamMembers = users.filter(u => 
          u.department === currentUser.department && 
          u.center === currentUser.center && (
            u.role === 'Project Coordinator' ||
            u.role === 'Project Engineer' ||
            u.role === 'Project Assistant'
          )
        );
        break;

      case 'Project Coordinator':
        // PC sees Engineers → Assistants
        teamMembers = users.filter(u => 
          u.department === currentUser.department && 
          u.center === currentUser.center && (
            u.role === 'Project Engineer' ||
            u.role === 'Project Assistant'
          )
        );
        break;

      default:
        // Engineers and Assistants see limited team
        teamMembers = users.filter(u => 
          u.department === currentUser.department && 
          u.center === currentUser.center &&
          u.id !== currentUser.id
        ).slice(0, 3);
    }

    // Apply filters
    return teamMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
      const matchesRole = selectedRole === 'all' || member.role === selectedRole;
      
      return matchesSearch && matchesDepartment && matchesRole;
    });
  };

  const filteredTeamMembers = getTeamMembers();
  const departments = [...new Set(filteredTeamMembers.map(m => m.department))];
  const roles = [...new Set(filteredTeamMembers.map(m => m.role))];

  const getRoleHierarchyLevel = (role: string) => {
    const hierarchy = {
      'DG': 1,
      'Center Head': 2,
      'HOD': 3,
      'Project Manager': 4,
      'Project Coordinator': 5,
      'Project Engineer': 6,
      'Project Assistant': 7
    };
    return hierarchy[role as keyof typeof hierarchy] || 9;
  };

  const sortedTeamMembers = filteredTeamMembers.sort((a, b) => 
    getRoleHierarchyLevel(a.role) - getRoleHierarchyLevel(b.role)
  );

  const getSkillBadgeColor = (skill: string) => {
    const colors = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-purple-100 text-purple-800', 'bg-orange-100 text-orange-800'];
    return colors[skill.length % colors.length];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600">View and manage your team hierarchy</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-3 py-1">
            <Users className="h-4 w-4 mr-1" />
            {filteredTeamMembers.length} Members
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Advanced Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedDepartment('all');
              setSelectedRole('all');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Members</p>
            <p className="text-2xl font-bold">{filteredTeamMembers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Building className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Departments</p>
            <p className="text-2xl font-bold">{departments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Active Projects</p>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-2xl font-bold">24</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTeamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                  <AvatarFallback className="text-lg font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>{member.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{member.center}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {(member.skills || ['React', 'TypeScript', 'Node.js']).slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className={`text-xs ${getSkillBadgeColor(skill)}`}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeamMembers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No team members found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeamPage;
