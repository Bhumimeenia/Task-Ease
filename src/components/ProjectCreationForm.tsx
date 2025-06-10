
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { X, Calendar as CalendarIcon, Users, Target, DollarSign, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { users } from '../data/dummyData';

interface ProjectCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectCreationForm: React.FC<ProjectCreationFormProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    department: '',
    center: '',
    priority: 'medium',
    budget: '',
    objectives: '',
    deliverables: '',
    risks: '',
    approvalRequired: false
  });

  if (!isOpen) return null;

  const getAvailableUsers = () => {
    let availableUsers = users;

    // Role-based filtering
    if (currentUser?.role === 'HOD') {
      // HODs can assign users from their department
      availableUsers = users.filter(user => user.department === currentUser.department);
    } else if (currentUser?.role === 'Project Engineer' || currentUser?.role === 'Project Assistant') {
      // Engineers can only suggest team members, final approval from higher authority
      availableUsers = users.filter(user => 
        user.role === 'Project Engineer' || 
        user.role === 'Project Assistant' ||
        user.role === 'Project Coordinator'
      );
    }

    return availableUsers;
  };

  const handleMemberToggle = (userId: string) => {
    setSelectedMembers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      startDate: startDate?.toISOString().split('T')[0],
      endDate: endDate?.toISOString().split('T')[0],
      teamMembers: selectedMembers,
      createdBy: currentUser?.id,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };

    console.log('Project Created:', projectData);
    onClose();
  };

  const handleNext = () => {
    const tabs = ['details', 'timeline', 'team', 'resources'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const tabs = ['details', 'timeline', 'team', 'resources'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div>
            <CardTitle className="text-xl flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Add New Project</span>
            </CardTitle>
            <CardDescription>Create and manage project information</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* Step 1: Project Details */}
            <TabsContent value="details" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="center">Center</Label>
                    <Select value={formData.center} onValueChange={(value) => setFormData({...formData, center: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pune">C-DAC Pune</SelectItem>
                        <SelectItem value="mumbai">C-DAC Mumbai</SelectItem>
                        <SelectItem value="bangalore">C-DAC Bangalore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Project Type</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="research">Research & Development</SelectItem>
                        <SelectItem value="software">Software Development</SelectItem>
                        <SelectItem value="hardware">Hardware Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Estimated Team Size</Label>
                    <Input
                      id="teamSize"
                      placeholder="Enter team size"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter project description"
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Project Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select defaultValue="not-started">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-started">Not Started</SelectItem>
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Step 2: Team */}
            <TabsContent value="team" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Team Members</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search and select teams" className="pl-10" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Available Members</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto border rounded-lg p-3">
                      {getAvailableUsers().map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              {user.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-gray-600">{user.role}</p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMemberToggle(user.id)}
                          >
                            {selectedMembers.includes(user.id) ? 'Remove' : 'Add'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Selected Members</h4>
                    <div className="min-h-60 border-2 border-dashed border-gray-200 rounded-lg p-3">
                      {selectedMembers.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-center text-gray-500">
                          <div>
                            <Users className="h-8 w-8 mx-auto mb-2" />
                            <p>No members selected</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selectedMembers.map((memberId) => {
                            const user = users.find(u => u.id === memberId);
                            return user ? (
                              <div key={user.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
                                    {user.avatar}
                                  </div>
                                  <span className="text-sm">{user.name}</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleMemberToggle(user.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Step 3: Timeline */}
            <TabsContent value="timeline" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Project Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Select start date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Select end date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Step 4: Resources */}
            <TabsContent value="resources" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tags</h3>
                <div className="space-y-2">
                  <Label>Project Tags</Label>
                  <Input placeholder="Add tags separated by commas" />
                  <p className="text-sm text-gray-600">Add relevant tags to categorize your project</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <div>
              {activeTab !== 'details' && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="outline">Save as Draft</Button>
              {activeTab === 'resources' ? (
                <Button onClick={handleSubmit}>Create Project</Button>
              ) : (
                <Button onClick={handleNext}>
                  {activeTab === 'details' ? 'Next: Team' :
                   activeTab === 'team' ? 'Next: Timeline' :
                   activeTab === 'timeline' ? 'Next: Resources' : 'Next'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectCreationForm;
