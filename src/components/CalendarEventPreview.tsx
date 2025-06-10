
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface CalendarEventPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  onEdit: () => void;
  onReschedule: () => void;
  onDelete: () => void;
}

const CalendarEventPreview: React.FC<CalendarEventPreviewProps> = ({
  isOpen,
  onClose,
  event,
  onEdit,
  onReschedule,
  onDelete
}) => {
  if (!event) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Event Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                {getStatusIcon(event.status)}
              </div>
              <Badge className={`${getEventTypeColor(event.type)} border mb-3`}>
                {event.type}
              </Badge>
            </div>
          </div>

          <p className="text-gray-600 text-sm">{event.description}</p>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            {event.location && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            )}
            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{event.attendees.join(', ')}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={onReschedule} className="flex-1">
              <Calendar className="h-4 w-4 mr-1" />
              Reschedule
            </Button>
            <Button variant="outline" size="sm" onClick={onDelete} className="flex-1">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarEventPreview;
