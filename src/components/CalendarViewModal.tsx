
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';

interface CalendarViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarViewModal: React.FC<CalendarViewModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  // Dummy events for preview
  const dummyEvents = [
    {
      id: 1,
      title: 'Team Meeting',
      date: '2025-06-05',
      time: '10:00 AM',
      location: 'Conference Room A',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Training Session',
      date: '2025-06-08',
      time: '2:00 PM',
      location: 'Training Center',
      type: 'training'
    },
    {
      id: 3,
      title: 'Client Conference',
      date: '2025-06-15',
      time: '9:00 AM',
      location: 'Grand Hall',
      type: 'conference'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'training': return 'bg-indigo-100 text-indigo-800';
      case 'conference': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>My Calendar Overview</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="space-y-4">
            <h3 className="font-semibold">Calendar View</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
            />
          </div>

          {/* Events List */}
          <div className="space-y-4">
            <h3 className="font-semibold">Upcoming Events</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {dummyEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge className={`${getEventTypeColor(event.type)} text-xs`}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarViewModal;
