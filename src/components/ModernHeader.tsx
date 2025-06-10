
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  User, 
  Building2,
  ChevronDown,
  Settings,
  LogOut,
  Award,
  Rocket
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SidebarTrigger } from '@/components/ui/sidebar';
import FeaturedUpdatesPanel from './FeaturedUpdatesPanel';

interface ModernHeaderProps {
  pageTitle: string;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({ pageTitle }) => {
  const { currentUser, logout } = useAuth();
  const [notifications] = useState([
    {
      id: 1,
      title: 'Task Deadline Approaching',
      message: 'AI Research Model due in 2 hours',
      time: '2h ago',
      type: 'deadline',
      unread: true
    },
    {
      id: 2,
      title: 'Extension Request',
      message: 'John Doe requested extension for Database Optimization',
      time: '4h ago',
      type: 'request',
      unread: true
    },
    {
      id: 3,
      title: 'New Task Assigned',
      message: 'Web Portal Enhancement assigned to your team',
      time: '6h ago',
      type: 'assignment',
      unread: false
    },
    {
      id: 4,
      title: 'Meeting Reminder',
      message: 'Team standup in 30 minutes',
      time: '8h ago',
      type: 'meeting',
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deadline': return '⏰';
      case 'request': return '📝';
      case 'assignment': return '📋';
      case 'meeting': return '📅';
      default: return '📢';
    }
  };

  const featuredItems = [
    { title: 'Advanced Analytics Dashboard', description: 'New comprehensive data visualization tools', category: 'Analytics', isNew: true },
    { title: 'Team Collaboration Hub', description: 'Enhanced team communication features', category: 'Collaboration', isNew: false },
    { title: 'Project Timeline View', description: 'Interactive Gantt charts and milestones', category: 'Planning', isNew: true },
    { title: 'Resource Management', description: 'Optimized allocation and tracking system', category: 'Management', isNew: false },
    { title: 'Smart Notifications', description: 'AI-powered priority alerts', category: 'Intelligence', isNew: true },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex items-center space-x-4">
          {/* C-DAC Logo */}
          <img 
            src="https://ictaccessibility.in/images/cdac-logo.svg" 
            alt="C-DAC Logo" 
            className="h-10 w-auto"
            onError={(e) => {
              // Fallback to Building2 icon if logo fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <Building2 className="h-8 w-8 text-blue-600 hidden" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Featured Updates Button - Restructured */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Award className="h-5 w-5" />
              <span className="hidden sm:inline ml-2">Featured</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" align="end">
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="font-semibold text-lg">Featured Updates</h3>
              <p className="text-sm text-gray-600">Discover the latest platform enhancements</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="p-2 space-y-2">
                {featuredItems.map((item, index) => (
                  <div key={index} className="p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-sm text-gray-900">{item.title}</h4>
                          {item.isNew && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 border-t bg-gray-50">
              <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700">
                View All Features →
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* What's New Button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Rocket className="h-5 w-5" />
              <span className="hidden sm:inline ml-2">What's New</span>
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-semibold">What's New</h3>
              <p className="text-sm text-gray-500">Latest platform updates</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-sm">Enhanced Dashboard</h4>
                  <p className="text-xs text-gray-600">New analytics widgets added</p>
                  <p className="text-xs text-gray-500">Jan 15, 2024</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-sm">Mobile App Update</h4>
                  <p className="text-xs text-gray-600">Better offline support</p>
                  <p className="text-xs text-gray-500">Jan 12, 2024</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-sm">Security Enhancement</h4>
                  <p className="text-xs text-gray-600">Multi-factor authentication</p>
                  <p className="text-xs text-gray-500">Jan 10, 2024</p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    notification.unread ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t">
              <Button variant="ghost" size="sm" className="w-full">
                View All Notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">{currentUser?.avatar}</span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                <p className="text-xs text-gray-500">{currentUser?.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {currentUser?.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {currentUser?.center}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default ModernHeader;
