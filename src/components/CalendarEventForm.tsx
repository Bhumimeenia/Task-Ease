
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Calendar, Clock, MapPin, Users, Plane, Briefcase } from 'lucide-react';

interface CalendarEventFormProps {
  isOpen: boolean;
  onClose: () => void;
  eventType?: string;
}

const CalendarEventForm: React.FC<CalendarEventFormProps> = ({ isOpen, onClose, eventType = 'meeting' }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    title: '',
    type: eventType,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    center: currentUser?.center || '',
    description: '',
    location: '',
    // Travel specific fields
    tourType: '',
    destination: '',
    travelMedium: 'flight',
    travelDetails: '',
    requiresApproval: true,
    approvingAuthority: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Calendar Event:', formData);
    onClose();
  };

  const eventTypes = [
    { value: 'meeting', label: 'Meeting', icon: Users },
    { value: 'leave', label: 'Leave', icon: Calendar },
    { value: 'travel', label: 'Travel', icon: Plane },
    { value: 'holiday', label: 'Holiday', icon: Calendar },
    { value: 'training', label: 'Training', icon: Briefcase },
    { value: 'workshop', label: 'Workshop', icon: Users }
  ];

  const centers = ['Mumbai Center', 'Delhi Center', 'Bangalore Center', 'Pune Center', 'Hyderabad Center', 'Kolkata Center'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Create New Event</CardTitle>
            <CardDescription>Schedule a new event, meeting, or travel plan</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 border-b">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === 'details' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Plan Details
            </button>
            {formData.type === 'travel' && (
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                  activeTab === 'notifications' 
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Notifications
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'details' && (
              <>
                {/* Plan Information */}
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
                      <Label htmlFor="center">Center</Label>
                      <select
                        id="center"
                        value={formData.center}
                        onChange={(e) => setFormData({...formData, center: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                      >
                        {centers.map(center => (
                          <option key={center} value={center}>{center}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Plan Type</Label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                      >
                        {eventTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                        required
                      />
                    </div>
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
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Travel Specific Fields */}
                {formData.type === 'travel' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tour Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tourType">Tour Type</Label>
                        <select
                          id="tourType"
                          value={formData.tourType}
                          onChange={(e) => setFormData({...formData, tourType: e.target.value})}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="">Select tour type</option>
                          <option value="official">Official</option>
                          <option value="training">Training</option>
                          <option value="conference">Conference</option>
                          <option value="site-visit">Site Visit</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input
                          id="destination"
                          value={formData.destination}
                          onChange={(e) => setFormData({...formData, destination: e.target.value})}
                          placeholder="Enter destination"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Travel Medium</Label>
                      <div className="flex space-x-4">
                        {[
                          { value: 'bus', label: 'Bus', icon: '🚌' },
                          { value: 'train', label: 'Train', icon: '🚂' },
                          { value: 'flight', label: 'Flight', icon: '✈️' }
                        ].map(medium => (
                          <label key={medium.value} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="travelMedium"
                              value={medium.value}
                              checked={formData.travelMedium === medium.value}
                              onChange={(e) => setFormData({...formData, travelMedium: e.target.value})}
                              className="text-blue-600"
                            />
                            <span className="text-2xl">{medium.icon}</span>
                            <span>{medium.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="travelDetails">Travel Details</Label>
                      <textarea
                        id="travelDetails"
                        value={formData.travelDetails}
                        onChange={(e) => setFormData({...formData, travelDetails: e.target.value})}
                        placeholder="Enter travel details (PNR, flight number, etc.)"
                        rows={3}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {/* Plan Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter plan description and details"
                    rows={4}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                {/* Approval Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Approval Requirements</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="requiresApproval"
                      checked={formData.requiresApproval}
                      onChange={(e) => setFormData({...formData, requiresApproval: e.target.checked})}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="requiresApproval">Requires Approval</Label>
                  </div>
                  
                  {formData.requiresApproval && (
                    <div className="space-y-2">
                      <Label htmlFor="approvingAuthority">Approving Authority</Label>
                      <select
                        id="approvingAuthority"
                        value={formData.approvingAuthority}
                        onChange={(e) => setFormData({...formData, approvingAuthority: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="">Select who should approve this plan</option>
                        <option value="department-head">Department Head</option>
                        <option value="center-head">Center Head</option>
                        <option value="dg">Director General</option>
                      </select>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'notifications' && formData.type === 'travel' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Auto-notifications will be sent to:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Your immediate supervisor</li>
                      <li>• Department Head (if applicable)</li>
                      <li>• Center Head (if applicable)</li>
                      <li>• Project team members (for project-related travel)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" className="flex-1">
                Save & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarEventForm;
