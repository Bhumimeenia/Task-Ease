import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Calendar as CalendarIcon, Clock, MapPin, Users, AlertCircle, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CalendarScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarScheduleForm: React.FC<CalendarScheduleFormProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    startTime: '',
    endTime: '',
    location: '',
    priority: 'medium',
    requiresApproval: false,
    approvingAuthority: '',
    participants: '',
    travelDetails: '',
    accommodation: '',
    budget: '',
    purpose: '',
    expectedOutcome: '',
    isInterrupted: false,
    requestExtension: false,
    extensionReason: ''
  });

  if (!isOpen) return null;

  const getApprovalAuthorities = () => {
    const authorities = [];
    
    switch (currentUser?.role) {
      case 'Project Engineer':
      case 'Project Assistant':
        authorities.push(
          { value: 'project-manager', label: 'Project Manager' },
          { value: 'hod', label: 'HOD' }
        );
        break;
      case 'Project Manager':
        authorities.push(
          { value: 'hod', label: 'HOD' },
          { value: 'center-head', label: 'Center Head' }
        );
        break;
      case 'HOD':
        authorities.push(
          { value: 'center-head', label: 'Center Head' },
          { value: 'dg', label: 'Director General' }
        );
        break;
      case 'Center Head':
        authorities.push(
          { value: 'dg', label: 'Director General' }
        );
        break;
      default:
        authorities.push({ value: 'ministry', label: 'Ministry' });
    }
    
    return authorities;
  };

  const eventCategories = [
    { value: 'meeting', label: 'Meeting', icon: '🤝', requiresApproval: false },
    { value: 'tour', label: 'Official Tour', icon: '✈️', requiresApproval: true },
    { value: 'leave', label: 'Leave', icon: '🏖️', requiresApproval: true },
    { value: 'ltc', label: 'LTC (Leave Travel Concession)', icon: '🎫', requiresApproval: true },
    { value: 'training', label: 'Training/Workshop', icon: '📚', requiresApproval: true },
    { value: 'conference', label: 'Conference/Seminar', icon: '🎤', requiresApproval: true },
    { value: 'site-visit', label: 'Site Visit', icon: '🏢', requiresApproval: true },
    { value: 'medical', label: 'Medical Leave', icon: '🏥', requiresApproval: true },
    { value: 'personal', label: 'Personal Work', icon: '👤', requiresApproval: false }
  ];

  const cdacCenters = [
    'C-DAC Pune (Headquarters)',
    'C-DAC Mumbai',
    'C-DAC Bangalore',
    'C-DAC Chennai',
    'C-DAC Delhi',
    'C-DAC Kolkata',
    'C-DAC Patna',
    'C-DAC Mohali',
    'C-DAC Noida',
    'C-DAC Hyderabad',
    'C-DAC Thiruvananthapuram',
    'C-DAC Silchar'
  ];

  const handleCategoryChange = (category: string) => {
    const selectedCategory = eventCategories.find(cat => cat.value === category);
    setFormData({
      ...formData,
      category,
      requiresApproval: selectedCategory?.requiresApproval || false
    });
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return 'Select dates';
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day' : `${diffDays} days`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const scheduleEvent = {
      ...formData,
      startDate: startDate?.toISOString().split('T')[0],
      endDate: endDate?.toISOString().split('T')[0],
      duration: calculateDuration(),
      submittedBy: currentUser?.id,
      submittedAt: new Date().toISOString(),
      status: formData.requiresApproval ? 'pending' : 'approved'
    };

    console.log('Schedule Event Created:', scheduleEvent);
    onClose();
  };

  const selectedCategory = eventCategories.find(cat => cat.value === formData.category);
  const canRequestExtension = currentUser?.role === 'Project Engineer' || currentUser?.role === 'Project Assistant';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div>
            <CardTitle className="text-xl flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Schedule New Plan</span>
            </CardTitle>
            <CardDescription>Create and schedule activities across C-DAC centers</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 border-b">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === 'basic' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Basic Details
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === 'advanced' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Advanced Options
            </button>
            {['tour', 'ltc', 'training', 'conference'].includes(formData.category) && (
              <button
                onClick={() => setActiveTab('travel')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                  activeTab === 'travel' 
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Travel & Logistics
              </button>
            )}
            {canRequestExtension && (
              <button
                onClick={() => setActiveTab('extension')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                  activeTab === 'extension' 
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Task Management
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'basic' && (
              <>
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Plan Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Plan Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Enter plan title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={handleCategoryChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventCategories.map(category => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center space-x-2">
                                <span>{category.icon}</span>
                                <span>{category.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe the purpose and details of your plan"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Date & Time Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date *</Label>
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
                            {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            className="pointer-events-auto"
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
                            {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <div className="p-2 border rounded-lg bg-gray-50">
                        <span className="text-sm font-medium">{calculateDuration()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select C-DAC center or enter custom location" />
                    </SelectTrigger>
                    <SelectContent>
                      {cdacCenters.map(center => (
                        <SelectItem key={center} value={center}>{center}</SelectItem>
                      ))}
                      <SelectItem value="external">External Location</SelectItem>
                      <SelectItem value="virtual">Virtual/Online</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {activeTab === 'advanced' && (
              <>
                {/* Priority & Approval */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="participants">Participants/Team</Label>
                      <Input
                        id="participants"
                        value={formData.participants}
                        onChange={(e) => setFormData({...formData, participants: e.target.value})}
                        placeholder="List participants or team members"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Purpose</Label>
                      <Textarea
                        id="purpose"
                        value={formData.purpose}
                        onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                        placeholder="Detailed purpose of this plan"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedOutcome">Expected Outcome</Label>
                      <Textarea
                        id="expectedOutcome"
                        value={formData.expectedOutcome}
                        onChange={(e) => setFormData({...formData, expectedOutcome: e.target.value})}
                        placeholder="What do you expect to achieve?"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Approval Section */}
                {selectedCategory?.requiresApproval && (
                  <div className="space-y-4 p-4 border rounded-lg bg-yellow-50">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-900">Approval Required</h4>
                        <p className="text-sm text-yellow-700 mb-3">
                          This type of plan requires approval from your reporting authority.
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="approvingAuthority">Approving Authority</Label>
                          <Select value={formData.approvingAuthority} onValueChange={(value) => setFormData({...formData, approvingAuthority: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select who should approve this plan" />
                            </SelectTrigger>
                            <SelectContent>
                              {getApprovalAuthorities().map(authority => (
                                <SelectItem key={authority.value} value={authority.value}>
                                  {authority.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'travel' && ['tour', 'ltc', 'training', 'conference'].includes(formData.category) && (
              <>
                {/* Travel & Logistics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Travel & Logistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="travelDetails">Travel Details</Label>
                      <Textarea
                        id="travelDetails"
                        value={formData.travelDetails}
                        onChange={(e) => setFormData({...formData, travelDetails: e.target.value})}
                        placeholder="Transportation mode, routes, etc."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accommodation">Accommodation</Label>
                      <Textarea
                        id="accommodation"
                        value={formData.accommodation}
                        onChange={(e) => setFormData({...formData, accommodation: e.target.value})}
                        placeholder="Hotel booking, guest house, etc."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Budget</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      placeholder="Enter estimated budget in INR"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'extension' && canRequestExtension && (
              <>
                {/* Task Management for Engineers/Assistants */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Task Management</h3>
                  
                  {/* Interrupt Task */}
                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <div className="flex items-start space-x-2">
                      <Flag className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-yellow-900">Mark Task as Interrupted</h4>
                        <p className="text-sm text-yellow-700 mb-3">
                          Flag current task as interrupted due to this schedule.
                        </p>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.isInterrupted}
                            onChange={(e) => setFormData({...formData, isInterrupted: e.target.checked})}
                            className="rounded"
                          />
                          <span className="text-sm">Mark current task as interrupted</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Request Extension */}
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-start space-x-2">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-900">Request Deadline Extension</h4>
                        <p className="text-sm text-blue-700 mb-3">
                          Request an extension for assigned tasks due to this schedule.
                        </p>
                        <label className="flex items-center space-x-2 mb-3">
                          <input
                            type="checkbox"
                            checked={formData.requestExtension}
                            onChange={(e) => setFormData({...formData, requestExtension: e.target.checked})}
                            className="rounded"
                          />
                          <span className="text-sm">Request deadline extension</span>
                        </label>
                        
                        {formData.requestExtension && (
                          <div className="space-y-2">
                            <Label htmlFor="extensionReason">Extension Reason *</Label>
                            <Textarea
                              id="extensionReason"
                              value={formData.extensionReason}
                              onChange={(e) => setFormData({...formData, extensionReason: e.target.value})}
                              placeholder="Explain why you need a deadline extension"
                              rows={3}
                              required={formData.requestExtension}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" className="flex-1">
                {formData.requiresApproval ? 'Submit for Approval' : 'Schedule Plan'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarScheduleForm;
