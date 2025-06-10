
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, MessageSquare, Video, Calendar, FileText, Search, Send, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const TeamCollaboration: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const teamMembers = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Senior Translator',
      department: 'Language Technology',
      status: 'online',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      email: 'priya.sharma@cdac.in',
      phone: '+91 98765 43210',
      currentProject: 'Medical Translation Portal',
      skills: ['Hindi Translation', 'Technical Documentation', 'Quality Assurance']
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      role: 'QA Specialist',
      department: 'Quality Assurance',
      status: 'online',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      email: 'rahul.kumar@cdac.in',
      phone: '+91 98765 43211',
      currentProject: 'Banking System QA',
      skills: ['Quality Assessment', 'Error Analysis', 'Process Improvement']
    },
    {
      id: 3,
      name: 'Anjali Patel',
      role: 'Content Editor',
      department: 'Content Development',
      status: 'away',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
      email: 'anjali.patel@cdac.in',
      phone: '+91 98765 43212',
      currentProject: 'Website Content Review',
      skills: ['Content Writing', 'Copy Editing', 'SEO Writing']
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'Technical Translator',
      department: 'Language Technology',
      status: 'offline',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
      email: 'vikram.singh@cdac.in',
      phone: '+91 98765 43213',
      currentProject: 'Software Localization',
      skills: ['Technical Translation', 'Localization', 'API Documentation']
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: 'Priya Sharma',
      message: 'Hey team! I need help with the medical terminology for the cardiology section. Any suggestions?',
      time: '10:30 AM',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      replies: 3
    },
    {
      id: 2,
      from: 'Rahul Kumar',
      message: 'Great job on the quality review yesterday! The error rate has improved significantly.',
      time: '9:45 AM',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      replies: 1
    },
    {
      id: 3,
      from: 'Anjali Patel',
      message: 'I\'ve uploaded the style guide for the new project. Please review it before we start.',
      time: '9:15 AM',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
      replies: 0
    }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Weekly Team Standup',
      time: '2:00 PM - 2:30 PM',
      date: 'Today',
      attendees: ['Priya Sharma', 'Rahul Kumar', 'Anjali Patel'],
      type: 'video'
    },
    {
      id: 2,
      title: 'Project Review Meeting',
      time: '10:00 AM - 11:00 AM',
      date: 'Tomorrow',
      attendees: ['Vikram Singh', 'Priya Sharma'],
      type: 'video'
    },
    {
      id: 3,
      title: 'Quality Standards Discussion',
      time: '3:00 PM - 4:00 PM',
      date: 'June 7',
      attendees: ['Rahul Kumar', 'Team Leads'],
      type: 'meeting'
    }
  ];

  const sharedResources = [
    {
      id: 1,
      title: 'Translation Style Guide 2025',
      type: 'document',
      sharedBy: 'Anjali Patel',
      date: '2025-06-05',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Medical Terminology Database',
      type: 'database',
      sharedBy: 'Priya Sharma',
      date: '2025-06-04',
      size: '15.2 MB'
    },
    {
      id: 3,
      title: 'CAT Tools Best Practices',
      type: 'guide',
      sharedBy: 'Vikram Singh',
      date: '2025-06-03',
      size: '1.8 MB'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-3xl font-bold text-gray-900">Team Collaboration</h1>
              <p className="text-gray-600 mt-1">Connect with team members and share knowledge</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{teamMembers.filter(m => m.status === 'online').length}</div>
              <div className="text-sm text-gray-600">Online Now</div>
              <Users className="h-8 w-8 text-green-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{recentMessages.length}</div>
              <div className="text-sm text-gray-600">Recent Messages</div>
              <MessageSquare className="h-8 w-8 text-blue-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{upcomingMeetings.length}</div>
              <div className="text-sm text-gray-600">Upcoming Meetings</div>
              <Video className="h-8 w-8 text-purple-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{sharedResources.length}</div>
              <div className="text-sm text-gray-600">Shared Resources</div>
              <FileText className="h-8 w-8 text-orange-500 mx-auto mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="team" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <p className="text-xs text-gray-500">{member.department}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Current Project:</p>
                        <p className="text-sm text-gray-600">{member.currentProject}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {member.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.skills.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Video className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Team Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={msg.avatar} />
                        <AvatarFallback>
                          {msg.from.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{msg.from}</span>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{msg.message}</p>
                        {msg.replies > 0 && (
                          <Button variant="ghost" size="sm" className="mt-2 text-xs">
                            {msg.replies} replies
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                          <p className="text-sm text-gray-600">{meeting.time}</p>
                          <p className="text-xs text-gray-500">{meeting.date}</p>
                        </div>
                        <Badge className={`${meeting.type === 'video' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} border`}>
                          {meeting.type === 'video' ? 'Video Call' : 'Meeting'}
                        </Badge>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Attendees:</p>
                        <p className="text-sm text-gray-600">{meeting.attendees.join(', ')}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">
                          <Video className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4 mr-1" />
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shared Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sharedResources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{resource.title}</h3>
                          <p className="text-sm text-gray-600">
                            Shared by {resource.sharedBy} • {resource.date} • {resource.size}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default TeamCollaboration;
