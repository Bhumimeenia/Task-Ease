
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Users, Shield, Hash } from 'lucide-react';
import { users } from '../data/dummyData';

interface CreateRoomFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    privacy: 'private',
    department: '',
    center: currentUser?.center || '',
    selectedMembers: [] as string[]
  });

  const availableMembers = users.filter(user => 
    user.center === currentUser?.center && user.id !== currentUser?.id
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating chat room:', formData);
    
    // Here you would typically send the data to your backend
    // For now, we'll just log it and close the form
    
    onClose();
    // Reset form
    setFormData({
      name: '',
      description: '',
      type: '',
      privacy: 'private',
      department: '',
      center: currentUser?.center || '',
      selectedMembers: []
    });
  };

  const handleMemberToggle = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.includes(memberId)
        ? prev.selectedMembers.filter(id => id !== memberId)
        : [...prev.selectedMembers, memberId]
    }));
  };

  const removeMember = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.filter(id => id !== memberId)
    }));
  };

  const getSelectedMemberNames = () => {
    return formData.selectedMembers.map(id => {
      const member = availableMembers.find(m => m.id === id);
      return member ? member.name : '';
    }).filter(Boolean);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Hash className="h-5 w-5" />
            <span>Create New Chat Room</span>
          </DialogTitle>
          <DialogDescription>
            Set up a new communication channel for your team or department.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Room Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Project Alpha Team"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Room Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project">Project Team</SelectItem>
                    <SelectItem value="departmental">Department Discussion</SelectItem>
                    <SelectItem value="announcement">Announcements</SelectItem>
                    <SelectItem value="general">General Chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the room's purpose..."
                rows={3}
              />
            </div>
          </div>

          {/* Privacy & Access */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy & Access</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="privacy">Privacy Level *</Label>
                <Select value={formData.privacy} onValueChange={(value) => setFormData(prev => ({ ...prev, privacy: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can join</SelectItem>
                    <SelectItem value="private">Private - Invite only</SelectItem>
                    <SelectItem value="restricted">Restricted - Admin approval required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Development">Software Development</SelectItem>
                    <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Team Members</span>
            </h3>
            
            {/* Selected Members */}
            {formData.selectedMembers.length > 0 && (
              <div>
                <Label>Selected Members ({formData.selectedMembers.length})</Label>
                <div className="flex flex-wrap gap-2 mt-2 p-3 border rounded-lg bg-gray-50">
                  {getSelectedMemberNames().map((name, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{name}</span>
                      <button
                        type="button"
                        onClick={() => removeMember(formData.selectedMembers[index])}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Available Members */}
            <div>
              <Label>Available Team Members</Label>
              <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg">
                {availableMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b last:border-b-0">
                    <Checkbox
                      checked={formData.selectedMembers.includes(member.id)}
                      onCheckedChange={() => handleMemberToggle(member.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.name || !formData.type}>
              Create Room
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomForm;
