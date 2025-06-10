
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Search, 
  Filter,
  Star,
  Award,
  TrendingUp,
  Target,
  MapPin,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const TeamSkills: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [skillFilter, setSkillFilter] = useState('All Skills');

  const teamMembers = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Senior Translator',
      center: 'Pune',
      experience: '5 years exp',
      projects: 156,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      technicalSkills: [
        { name: 'Hindi Translation', level: 98 },
        { name: 'Technical Documentation', level: 88 },
        { name: 'CAT Tools (SDL Trados)', level: 92 },
        { name: 'Terminology Management', level: 85 }
      ],
      softSkills: [
        { name: 'Communication', value: 'Expert' },
        { name: 'Time Management', value: 'Advanced' },
        { name: 'Team Leadership', value: 'Advanced' },
        { name: 'Problem Solving', value: 'Expert' }
      ],
      certifications: ['SDL Trados Certified', 'Project Management', 'Quality Assurance']
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      role: 'QA Specialist',
      center: 'Delhi',
      experience: '6 years exp',
      projects: 201,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      technicalSkills: [
        { name: 'Quality Assessment', level: 94 },
        { name: 'Linguistic Review', level: 91 },
        { name: 'Test Automation', level: 78 },
        { name: 'Error Analysis', level: 89 }
      ],
      softSkills: [
        { name: 'Attention to Detail', value: 'Expert' },
        { name: 'Critical Thinking', value: 'Expert' },
        { name: 'Documentation', value: 'Advanced' },
        { name: 'Training Others', value: 'Advanced' }
      ],
      certifications: ['ISTQB Certified', 'Six Sigma Green Belt', 'Agile Testing']
    },
    {
      id: 3,
      name: 'Sneha Patel',
      role: 'Content Editor',
      center: 'Mumbai',
      experience: '3 years exp',
      projects: 178,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
      technicalSkills: [
        { name: 'Content Editing', level: 79 },
        { name: 'Proofreading', level: 96 },
        { name: 'Style Guide Creation', level: 87 },
        { name: 'Content Strategy', level: 84 }
      ],
      softSkills: [
        { name: 'Creativity', value: 'Expert' },
        { name: 'Language Proficiency', value: 'Expert' },
        { name: 'Deadline Management', value: 'Expert' },
        { name: 'Client Communication', value: 'Advanced' }
      ],
      certifications: ['Professional Editor Certification', 'Content Marketing', 'Digital Publishing']
    },
    {
      id: 4,
      name: 'Amit Singh',
      role: 'TM Manager',
      center: 'Bangalore',
      experience: '7 years exp',
      projects: 142,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
      technicalSkills: [
        { name: 'Translation Management', level: 92 },
        { name: 'Database Administration', level: 86 },
        { name: 'API Integration', level: 89 },
        { name: 'Data Analysis', level: 81 }
      ],
      softSkills: [
        { name: 'Technical Problem Solving', value: 'Expert' },
        { name: 'System Thinking', value: 'Advanced' },
        { name: 'Process Optimization', value: 'Advanced' },
        { name: 'Knowledge Sharing', value: 'Advanced' }
      ],
      certifications: ['Database Management', 'Cloud Computing', 'Data Analytics']
    },
    {
      id: 5,
      name: 'Kavya Reddy',
      role: 'Research Analyst',
      center: 'Hyderabad',
      experience: '4 years exp',
      projects: 89,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya',
      technicalSkills: [
        { name: 'Market Research', level: 89 },
        { name: 'Data Visualization', level: 86 },
        { name: 'Statistical Analysis', level: 91 },
        { name: 'Report Writing', level: 88 }
      ],
      softSkills: [
        { name: 'Analytical Thinking', value: 'Expert' },
        { name: 'Presentation Skills', value: 'Advanced' },
        { name: 'Research Methodology', value: 'Expert' },
        { name: 'Cross-team Collaboration', value: 'Advanced' }
      ],
      certifications: ['Market Research Society', 'Data Science', 'Business Analytics']
    },
    {
      id: 6,
      name: 'Deepak Joshi',
      role: 'Technical Writer',
      center: 'Chennai',
      experience: '6 years exp',
      projects: 167,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak',
      technicalSkills: [
        { name: 'Technical Writing', level: 94 },
        { name: 'API Documentation', level: 79 },
        { name: 'User Manual Creation', level: 92 },
        { name: 'Content Management Systems', level: 86 }
      ],
      softSkills: [
        { name: 'Technical Communication', value: 'Expert' },
        { name: 'User Experience Understanding', value: 'Advanced' },
        { name: 'Stakeholder Management', value: 'Advanced' },
        { name: 'Continuous Learning', value: 'Expert' }
      ],
      certifications: ['Technical Writing Professional', 'UX Writing', 'Agile Documentation']
    },
    {
      id: 7,
      name: 'Riya Gupta',
      role: 'Training Co-ordinator',
      center: 'Noida',
      experience: '2 years exp',
      projects: 112,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riya',
      technicalSkills: [
        { name: 'Training Program Design', level: 91 },
        { name: 'E-Learning Development', level: 87 },
        { name: 'Performance Assessment', level: 83 },
        { name: 'Learning Management Systems', level: 89 }
      ],
      softSkills: [
        { name: 'Public Speaking', value: 'Expert' },
        { name: 'Mentoring', value: 'Expert' },
        { name: 'Empathy', value: 'Expert' },
        { name: 'Adaptability', value: 'Advanced' }
      ],
      certifications: ['Certified Training Professional', 'Adult Learning', 'HR Management']
    },
    {
      id: 8,
      name: 'Vikram Choudhary',
      role: 'Project Coordinator',
      center: 'Kolkata',
      experience: '5 years exp',
      projects: 214,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
      technicalSkills: [
        { name: 'Project Management', level: 90 },
        { name: 'Resource Management', level: 88 },
        { name: 'Risk Assessment', level: 83 },
        { name: 'Agile Methodology', level: 92 }
      ],
      softSkills: [
        { name: 'Leadership', value: 'Advanced' },
        { name: 'Negotiation', value: 'Advanced' },
        { name: 'Conflict Resolution', value: 'Advanced' },
        { name: 'Strategic Thinking', value: 'Advanced' }
      ],
      certifications: ['PMP Certified', 'Agile Scrum Master', 'Change Management']
    }
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleSkillAssessment = () => {
    navigate('/skills-assessment');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 p-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Skills Matrix</h1>
            <p className="text-gray-600 mt-1">Comprehensive overview of team member skills and competencies</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2"
              onClick={handleSkillAssessment}
            >
              <span>Skill Assessment</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center bg-white">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">{teamMembers.length}</div>
              <div className="text-sm text-gray-600">Total Team Members</div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mt-3">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="text-center bg-white">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">12</div>
              <div className="text-sm text-gray-600">Expert Level Skills</div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mt-3">
                <Star className="h-4 w-4 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="text-center bg-white">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">6 yrs</div>
              <div className="text-sm text-gray-600">Avg Experience</div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mt-3">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="text-center bg-white">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">1281</div>
              <div className="text-sm text-gray-600">Total Projects</div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mt-3">
                <Target className="h-4 w-4 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter Team Members</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Roles">All Roles</SelectItem>
                  <SelectItem value="Senior Translator">Senior Translator</SelectItem>
                  <SelectItem value="QA Specialist">QA Specialist</SelectItem>
                  <SelectItem value="Content Editor">Content Editor</SelectItem>
                  <SelectItem value="TM Manager">TM Manager</SelectItem>
                  <SelectItem value="Research Analyst">Research Analyst</SelectItem>
                  <SelectItem value="Technical Writer">Technical Writer</SelectItem>
                  <SelectItem value="Training Co-ordinator">Training Co-ordinator</SelectItem>
                  <SelectItem value="Project Coordinator">Project Coordinator</SelectItem>
                </SelectContent>
              </Select>
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Skills">All Skills</SelectItem>
                  <SelectItem value="Translation">Translation</SelectItem>
                  <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                  <SelectItem value="Content">Content</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Team Members Grid - Matching the uploaded image design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Header Section with Avatar and Basic Info */}
                <div className="flex items-start space-x-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                    <p className="text-gray-500 text-sm">{member.center} • {member.experience}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{member.projects} projects</div>
                  </div>
                </div>

                {/* Technical Skills Section */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="h-4 w-4 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Technical Skills</h4>
                  </div>
                  <div className="space-y-3">
                    {member.technicalSkills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <span className="text-sm font-medium text-gray-700 min-w-0 flex-1">
                            {skill.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 min-w-[120px]">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 w-8 text-right">{skill.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soft Skills Section */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-4 w-4 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Soft Skills</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {member.softSkills.map((skill, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{skill.name}</span>
                        <Badge 
                          className={`text-xs px-2 py-1 ${
                            skill.value === 'Expert' ? 'bg-green-100 text-green-800' :
                            skill.value === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {skill.value}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications Section */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="h-4 w-4 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Certifications</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-2 py-1 border-gray-300 text-gray-600">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TeamSkills;
