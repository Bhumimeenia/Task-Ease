
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Key,
  Smartphone,
  Mail,
  Users,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'system', label: 'System', icon: Database },
  ];

  // Filter tabs based on user role
  const availableTabs = settingsTabs.filter(tab => {
    if (tab.id === 'team' || tab.id === 'system') {
      return ['DG', 'Center Head', 'Department Head'].includes(currentUser?.role || '');
    }
    return true;
  });

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
              {currentUser?.avatar}
            </div>
            <Button variant="outline">Change Avatar</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={currentUser?.name} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={currentUser?.email} />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue={currentUser?.role} disabled />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue={currentUser?.department || 'N/A'} disabled />
            </div>
          </div>
          
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update your contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+91 98765 43210" />
            </div>
            <div>
              <Label htmlFor="extension">Extension</Label>
              <Input id="extension" placeholder="1234" />
            </div>
            <div>
              <Label htmlFor="location">Office Location</Label>
              <Input id="location" defaultValue={currentUser?.center || 'Head Office'} />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <select className="w-full p-2 border rounded">
                <option>IST (UTC+5:30)</option>
                <option>EST (UTC-5:00)</option>
                <option>PST (UTC-8:00)</option>
              </select>
            </div>
          </div>
          
          <Button>Update Contact Info</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Project Updates</Label>
                <p className="text-sm text-gray-600">Get notified about project status changes</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Task Assignments</Label>
                <p className="text-sm text-gray-600">Get notified when tasks are assigned to you</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Calendar Events</Label>
                <p className="text-sm text-gray-600">Receive reminders for upcoming events</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Chat Messages</Label>
                <p className="text-sm text-gray-600">Get notified about new chat messages</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Schedule</CardTitle>
          <CardDescription>Set your notification preferences by time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Do Not Disturb Start</Label>
              <Input id="startTime" type="time" defaultValue="22:00" />
            </div>
            <div>
              <Label htmlFor="endTime">Do Not Disturb End</Label>
              <Input id="endTime" type="time" defaultValue="08:00" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Weekend Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications on weekends</p>
            </div>
            <Switch />
          </div>
          
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password & Authentication</CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          
          <Button>Change Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>SMS Authentication</Label>
              <p className="text-sm text-gray-600">Receive codes via SMS</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Authenticator App</Label>
              <p className="text-sm text-gray-600">Use an authenticator app</p>
            </div>
            <Switch />
          </div>
          
          <Button variant="outline">Setup 2FA</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Chrome on Windows</p>
                  <p className="text-sm text-gray-600">Current session • Last active now</p>
                </div>
              </div>
              <Badge variant="secondary">Current</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Mobile App</p>
                  <p className="text-sm text-gray-600">Last active 2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Revoke</Button>
            </div>
          </div>
          
          <Button variant="destructive">Sign Out All Devices</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
          <CardDescription>Customize your app appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
                <div className="w-full h-16 bg-white border rounded mb-2"></div>
                <p className="text-sm text-center">Light</p>
              </div>
              <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
                <div className="w-full h-16 bg-gray-800 border rounded mb-2"></div>
                <p className="text-sm text-center">Dark</p>
              </div>
              <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
                <div className="w-full h-16 bg-gradient-to-r from-white to-gray-800 border rounded mb-2"></div>
                <p className="text-sm text-center">Auto</p>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="language">Language</Label>
            <select id="language" className="w-full p-2 border rounded mt-1">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="dateFormat">Date Format</Label>
            <select id="dateFormat" className="w-full p-2 border rounded mt-1">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
          
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard Settings</CardTitle>
          <CardDescription>Customize your dashboard layout</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Project Statistics</Label>
              <p className="text-sm text-gray-600">Display project stats on dashboard</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Calendar Events</Label>
              <p className="text-sm text-gray-600">Display upcoming events</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Team Activity</Label>
              <p className="text-sm text-gray-600">Display recent team activities</p>
            </div>
            <Switch />
          </div>
          
          <Button>Update Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'preferences':
        return renderPreferencesSettings();
      case 'team':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage team members and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Team management features will be available soon.</p>
            </CardContent>
          </Card>
        );
      case 'system':
        return (
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">System settings are available to administrators only.</p>
            </CardContent>
          </Card>
        );
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and application settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full lg:w-1/4">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {availableTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
