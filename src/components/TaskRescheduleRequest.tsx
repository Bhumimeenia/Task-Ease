
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Clock, 
  AlertTriangle, 
  Send, 
  Calendar,
  FileText,
  X
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskRescheduleRequestProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string;
  taskTitle?: string;
}

const TaskRescheduleRequest: React.FC<TaskRescheduleRequestProps> = ({ 
  isOpen, 
  onClose, 
  taskId, 
  taskTitle 
}) => {
  const { currentUser } = useAuth();
  const [requestType, setRequestType] = useState<'interrupt' | 'reschedule'>('interrupt');
  const [reason, setReason] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [comments, setComments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requestData = {
      type: requestType,
      taskId,
      taskTitle,
      reason,
      newDeadline: requestType === 'reschedule' ? newDeadline : undefined,
      priority,
      comments,
      requestedBy: currentUser?.id,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };

    console.log('Task reschedule request submitted:', requestData);
    
    // Here you would send the request to your backend
    // For now, we'll just close the dialog
    onClose();
    
    // Reset form
    setReason('');
    setNewDeadline('');
    setPriority('Medium');
    setComments('');
  };

  const reasonOptions = {
    interrupt: [
      'High priority task assigned',
      'Technical blocker encountered',
      'Resource unavailable',
      'Client meeting scheduled',
      'Emergency support required',
      'Other'
    ],
    reschedule: [
      'Insufficient time allocation',
      'Dependency delay',
      'Resource conflict',
      'Scope change required',
      'Technical complexity increased',
      'Other'
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span>Task Request</span>
          </DialogTitle>
          <DialogDescription>
            Request to interrupt current task or reschedule deadline
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Request Type */}
          <div>
            <Label>Request Type</Label>
            <Select value={requestType} onValueChange={(value: 'interrupt' | 'reschedule') => setRequestType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interrupt">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span>Mark as Interrupted</span>
                  </div>
                </SelectItem>
                <SelectItem value="reschedule">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Request Deadline Extension</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Task Info */}
          {taskTitle && (
            <Card>
              <CardContent className="p-3">
                <p className="text-sm font-medium">Current Task:</p>
                <p className="text-sm text-gray-600">{taskTitle}</p>
              </CardContent>
            </Card>
          )}

          {/* Reason */}
          <div>
            <Label>Reason</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {reasonOptions[requestType].map((reasonOption) => (
                  <SelectItem key={reasonOption} value={reasonOption}>
                    {reasonOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* New Deadline (only for reschedule) */}
          {requestType === 'reschedule' && (
            <div>
              <Label>Requested New Deadline</Label>
              <Input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          )}

          {/* Priority */}
          <div>
            <Label>Priority Level</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Comments */}
          <div>
            <Label>Additional Comments</Label>
            <Textarea
              placeholder="Provide additional context or details..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!reason}>
              <Send className="h-4 w-4 mr-2" />
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskRescheduleRequest;
