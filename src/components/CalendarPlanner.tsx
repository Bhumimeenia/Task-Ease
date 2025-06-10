import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Filter,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  List,
  Grid
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NewScheduleModal from './NewScheduleModal';
import CalendarEventPreview from './CalendarEventPreview';
import CalendarViewModal from './CalendarViewModal';
import TaskRescheduleModal from './TaskRescheduleModal';
import Footer from './Footer';

const CalendarPlanner: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'month' | 'day' | 'list'>('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCalendarViewOpen, setIsCalendarViewOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Enhanced calendar events with location property
  const calendarEvents = [
    {
      id: 1,
      title: 'Project Review Meeting',
      description: 'Quarterly project review and planning session',
      type: 'meeting',
      status: 'approved',
      date: '2025-06-05',
      time: '10:00 AM',
      location: 'Conference Room A',
      assignedTo: 'team-1',
      createdBy: 'pm-1',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson']
    },
    {
      id: 2,
      title: 'Annual Leave',
      description: 'Vacation time',
      type: 'leave',
      status: 'pending',
      date: '2025-06-10',
      time: 'All Day',
      location: null,
      assignedTo: 'emp-1',
      createdBy: 'emp-1',
      attendees: []
    },
    {
      id: 3,
      title: 'Technical Training',
      description: 'Advanced React training session',
      type: 'training',
      status: 'approved',
      date: '2025-06-08',
      time: '2:00 PM',
      location: 'Training Center',
      assignedTo: 'team-2',
      createdBy: 'hr-1',
      attendees: ['Alice Brown', 'Bob Wilson', 'Carol Davis']
    },
    {
      id: 4,
      title: 'Client Conference',
      description: 'Annual client meeting and presentation',
      type: 'conference',
      status: 'approved',
      date: '2025-06-15',
      time: '9:00 AM',
      location: 'Grand Hall',
      assignedTo: 'team-3',
      createdBy: 'mgr-1',
      attendees: ['David Lee', 'Emma Wilson']
    },
    {
      id: 5,
      title: 'Medical Checkup',
      description: 'Annual health screening',
      type: 'medical',
      status: 'rejected',
      date: '2025-06-12',
      time: '11:00 AM',
      location: 'Medical Center',
      assignedTo: 'emp-2',
      createdBy: 'emp-2',
      attendees: []
    }
  ];

  const users = [
    { id: 'team-1', name: 'Development Team' },
    { id: 'emp-1', name: 'John Doe' },
    { id: 'team-2', name: 'Training Group' },
    { id: 'team-3', name: 'Client Relations' },
    { id: 'emp-2', name: 'Jane Smith' }
  ];

  const getFilteredEvents = () => {
    return calendarEvents.filter(event => {
      if (selectedCategory !== 'all' && event.type !== selectedCategory) return false;
      if (selectedStatus !== 'all' && event.status !== selectedStatus) return false;
      
      // Role-based filtering
      if (currentUser?.role === 'Project Engineer' || currentUser?.role === 'Project Assistant') {
        return event.assignedTo === currentUser.id || event.createdBy === currentUser.id;
      }
      
      return true;
    });
  };

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown User';
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'tour': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ltc': return 'bg-green-100 text-green-800 border-green-200';
      case 'training': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'conference': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'medical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getApprovalStats = () => {
    const filteredEvents = getFilteredEvents();
    const total = filteredEvents.length;
    const pending = filteredEvents.filter(e => e.status === 'pending').length;
    const approved = filteredEvents.filter(e => e.status === 'approved').length;
    const rejected = filteredEvents.filter(e => e.status === 'rejected').length;
    
    return { total, pending, approved, rejected };
  };

  // Calendar navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return getFilteredEvents().filter(event => event.date === dateStr);
  };

  const handleDayClick = (day: number, events: any[]) => {
    if (events.length > 0) {
      setSelectedEvent(events[0]);
      setIsPreviewOpen(true);
    }
  };

  const handleEdit = () => {
    setIsPreviewOpen(false);
    // Handle edit logic
    console.log('Edit event:', selectedEvent);
  };

  const handleReschedule = () => {
    setIsPreviewOpen(false);
    setIsRescheduleOpen(true);
  };

  const handleDelete = () => {
    setIsPreviewOpen(false);
    // Handle delete logic
    console.log('Delete event:', selectedEvent);
  };

  const stats = getApprovalStats();
  const filteredEvents = getFilteredEvents();

  const eventCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'meeting', label: 'Meetings' },
    { value: 'tour', label: 'Official Tours' },
    { value: 'leave', label: 'Leave' },
    { value: 'ltc', label: 'LTC' },
    { value: 'training', label: 'Training' },
    { value: 'conference', label: 'Conference' },
    { value: 'medical', label: 'Medical' }
  ];

  const renderMonthView = () => (
    <Card className="xl:col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Calendar View</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold min-w-[140px] text-center">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays().map((day, index) => {
            const dayEvents = day ? getEventsForDate(day) : [];
            return (
              <div
                key={index}
                className={`
                  min-h-[80px] p-2 border rounded-lg relative
                  ${day ? 'bg-white hover:bg-gray-50 cursor-pointer border-gray-200' : 'bg-gray-50 border-transparent'}
                  ${day === new Date().getDate() && 
                    selectedDate.getMonth() === new Date().getMonth() && 
                    selectedDate.getFullYear() === new Date().getFullYear() 
                    ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                `}
                onClick={() => day && handleDayClick(day, dayEvents)}
              >
                {day && (
                  <>
                    <span className="text-sm font-medium text-gray-900">{day}</span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const renderDayView = () => (
    <Card className="xl:col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Today's Schedule</CardTitle>
          <div className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredEvents.slice(0, 6).map((event) => (
            <div key={event.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{event.time.split(' ')[0]}</div>
                <div className="text-xs text-gray-500">{event.time.split(' ')[1] || ''}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium">{event.title}</h4>
                  {getStatusIcon(event.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  {event.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{getUserName(event.assignedTo)}</span>
                  </div>
                </div>
              </div>
              <Badge className={`${getEventTypeColor(event.type)} border`}>
                {event.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderListView = () => (
    <Card className="xl:col-span-3">
      <CardHeader>
        <CardTitle>All Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="text-center min-w-[60px]">
                  <div className="text-sm font-medium">{event.date}</div>
                  <div className="text-xs text-gray-500">{event.time}</div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{event.title}</h4>
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    {event.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{getUserName(event.assignedTo)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Badge className={`${getEventTypeColor(event.type)} border`}>
                {event.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Schedule & Calendar Planner</h1>
            <p className="text-gray-600 mt-1">Plan and track activities across C-DAC centers</p>
          </div>
          <Button 
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>New Schedule</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Plans</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <CalendarIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
                </div>
                <div className="p-3 rounded-full bg-yellow-50">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
                </div>
                <div className="p-3 rounded-full bg-green-50">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
                </div>
                <div className="p-3 rounded-full bg-red-50">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              <Grid className="h-4 w-4 mr-1" />
              Month
            </Button>
            <Button
              variant={viewMode === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('day')}
            >
              <CalendarIcon className="h-4 w-4 mr-1" />
              Day
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventCategories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Calendar/Day/List View */}
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'day' && renderDayView()}
          {viewMode === 'list' && renderListView()}

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Schedule
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setIsCalendarViewOpen(true)}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  View My Calendar
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Pending Approvals
                </Button>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredEvents.length === 0 ? (
                  <p className="text-sm text-gray-500">No schedule today</p>
                ) : (
                  <div className="space-y-3">
                    {filteredEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-sm">{event.title}</h4>
                              {getStatusIcon(event.status)}
                            </div>
                            <Badge className={`${getEventTypeColor(event.type)} text-xs mb-2 border`}>
                              {event.type}
                            </Badge>
                            <div className="space-y-1 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{event.time}</span>
                              </div>
                              {event.location && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <NewScheduleModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        <CalendarEventPreview
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          event={selectedEvent}
          onEdit={handleEdit}
          onReschedule={handleReschedule}
          onDelete={handleDelete}
        />
        <CalendarViewModal
          isOpen={isCalendarViewOpen}
          onClose={() => setIsCalendarViewOpen(false)}
        />
        <TaskRescheduleModal
          isOpen={isRescheduleOpen}
          onClose={() => setIsRescheduleOpen(false)}
          task={selectedEvent}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default CalendarPlanner;
