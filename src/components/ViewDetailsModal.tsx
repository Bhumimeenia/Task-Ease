
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'project' | 'task' | 'performance' | 'general';
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ isOpen, onClose, title, type }) => {
  const getDummyContent = () => {
    switch (type) {
      case 'project':
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <Progress value={75} className="w-full" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Team Size</p>
                    <p className="font-semibold">12 members</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-semibold">Dec 15, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'task':
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Assigned To</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Priority</p>
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Hours</p>
                    <p className="font-semibold">24 hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="text-gray-700">Complete the technical documentation and review process for the new module implementation.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">This is a placeholder for detailed information. The actual content would be loaded dynamically based on the selected item.</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Created:</span>
                    <span className="text-sm font-medium">June 9, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Updated:</span>
                    <span className="text-sm font-medium">June 8, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Detailed information and metrics
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {getDummyContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;
