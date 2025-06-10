import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { users, projects } from '../data/dummyData';
import { X, Calendar, User, Users, Clock, AlertCircle } from 'lucide-react';

interface TaskAssignmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
}

const TaskAssignmentForm: React.FC<TaskAssignmentFormProps> = ({ isOpen, onClose, projectId }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
    dueDate: '',
    estimatedHours: '',
    category: 'Development',
    skills: '',
    projectId: projectId || ''
  });

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  if (!isOpen) return null;

  const availableUsers = users.filter(user => 
    currentUser?.role === 'DG' || 
    (currentUser?.role === 'Center Head' && user.center === currentUser.center) ||
    (currentUser?.role === 'HOD' && user.department === currentUser.department) ||
    ((currentUser?.role === 'Project Manager' || currentUser?.role === 'Project Coordinator') && (user.role === 'Project Engineer' || user.role === 'Project Assistant'))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Task Assignment:', { ...formData, assignedMembers: selectedMembers });
    onClose();
  };

  const addMember = (userId: string) => {
    if (!selectedMembers.includes(userId)) {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const removeMember = (userId: string) => {
    setSelectedMembers(selectedMembers.filter(id => id !== userId));
  };

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown User';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Assign New Task</CardTitle>
            <CardDescription>Create and assign tasks to team members</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Development">Development</option>
                  <option value="Research">Research</option>
                  <option value="Testing">Testing</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Design">Design</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Task Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the task details"
                rows={3}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Assignment Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated Hours</Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({...formData, estimatedHours: e.target.value})}
                  placeholder="Hours"
                />
              </div>
            </div>

            {/* Team Member Selection */}
            <div className="space-y-4">
              <Label>Assign Team Members</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Available Members</Label>
                  <div className="border rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
                    {availableUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => addMember(user.id)}
                          disabled={selectedMembers.includes(user.id)}
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-600">Selected Members</Label>
                  <div className="border rounded-lg p-3 min-h-[10rem]">
                    {selectedMembers.length > 0 ? (
                      <div className="space-y-2">
                        {selectedMembers.map((userId) => (
                          <Badge key={userId} variant="secondary" className="flex items-center space-x-2">
                            <span>{getUserName(userId)}</span>
                            <button
                              type="button"
                              onClick={() => removeMember(userId)}
                              className="ml-2 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No members selected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                placeholder="Enter skills separated by commas"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="flex-1">
                <Users className="h-4 w-4 mr-2" />
                Assign Task
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskAssignmentForm;
