
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

interface TaskRescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

const TaskRescheduleModal: React.FC<TaskRescheduleModalProps> = ({ isOpen, onClose, task }) => {
  const [actionType, setActionType] = useState<'reschedule' | 'extend'>('reschedule');
  const [newDate, setNewDate] = useState('');
  const [extensionDays, setExtensionDays] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    console.log('Task action:', { actionType, newDate, extensionDays, reason, task });
    onClose();
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Task Schedule Management</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">{task.title}</h4>
            <p className="text-sm text-blue-700">Current due: {task.dueDate}</p>
          </div>

          <div>
            <Label>Action Type</Label>
            <Select value={actionType} onValueChange={(value: 'reschedule' | 'extend') => setActionType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reschedule">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Reschedule Task</span>
                  </div>
                </SelectItem>
                <SelectItem value="extend">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Extend Timeline</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {actionType === 'reschedule' ? (
            <div>
              <Label htmlFor="newDate">New Due Date</Label>
              <Input
                id="newDate"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="extensionDays">Extension Days</Label>
              <Input
                id="extensionDays"
                type="number"
                placeholder="Number of days to extend"
                value={extensionDays}
                onChange={(e) => setExtensionDays(e.target.value)}
              />
            </div>
          )}

          <div>
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Please provide a reason for this change..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              This action will notify your project manager for approval.
            </span>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Submit Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskRescheduleModal;
