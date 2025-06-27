
// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Badge } from '@/components/ui/badge';
// import { X, Users, Shield, Hash } from 'lucide-react';
// import { users } from '../data/dummyData';

// interface CreateRoomFormProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ isOpen, onClose }) => {
//   const { currentUser } = useAuth();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     type: '',
//     privacy: 'private',
//     department: '',
//     center: currentUser?.center || '',
//     selectedMembers: [] as string[]
//   });

//   const availableMembers = users.filter(user => 
//     user.center === currentUser?.center && user.id !== currentUser?.id
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Creating chat room:', formData);
    
//     // Here you would typically send the data to your backend
//     // For now, we'll just log it and close the form
    
//     onClose();
//     // Reset form
//     setFormData({
//       name: '',
//       description: '',
//       type: '',
//       privacy: 'private',
//       department: '',
//       center: currentUser?.center || '',
//       selectedMembers: []
//     });
//   };

//   const handleMemberToggle = (memberId: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedMembers: prev.selectedMembers.includes(memberId)
//         ? prev.selectedMembers.filter(id => id !== memberId)
//         : [...prev.selectedMembers, memberId]
//     }));
//   };

//   const removeMember = (memberId: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedMembers: prev.selectedMembers.filter(id => id !== memberId)
//     }));
//   };

//   const getSelectedMemberNames = () => {
//     return formData.selectedMembers.map(id => {
//       const member = availableMembers.find(m => m.id === id);
//       return member ? member.name : '';
//     }).filter(Boolean);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center space-x-2">
//             <Hash className="h-5 w-5" />
//             <span>Create New Chat Room</span>
//           </DialogTitle>
//           <DialogDescription>
//             Set up a new communication channel for your team or department.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Basic Information</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name">Room Name *</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                   placeholder="e.g., Project Alpha Team"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <Label htmlFor="type">Room Type *</Label>
//                 <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select room type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="project">Project Team</SelectItem>
//                     <SelectItem value="departmental">Department Discussion</SelectItem>
//                     <SelectItem value="announcement">Announcements</SelectItem>
//                     <SelectItem value="general">General Chat</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                 placeholder="Brief description of the room's purpose..."
//                 rows={3}
//               />
//             </div>
//           </div>

//           {/* Privacy & Access */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold flex items-center space-x-2">
//               <Shield className="h-5 w-5" />
//               <span>Privacy & Access</span>
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="privacy">Privacy Level *</Label>
//                 <Select value={formData.privacy} onValueChange={(value) => setFormData(prev => ({ ...prev, privacy: value }))}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="public">Public - Anyone can join</SelectItem>
//                     <SelectItem value="private">Private - Invite only</SelectItem>
//                     <SelectItem value="restricted">Restricted - Admin approval required</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
              
//               <div>
//                 <Label htmlFor="department">Department</Label>
//                 <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select department" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Software Development">Software Development</SelectItem>
//                     <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
//                     <SelectItem value="Data Science">Data Science</SelectItem>
//                     <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
//                     <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
//                     <SelectItem value="Management">Management</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           {/* Team Members */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold flex items-center space-x-2">
//               <Users className="h-5 w-5" />
//               <span>Team Members</span>
//             </h3>
            
//             {/* Selected Members */}
//             {formData.selectedMembers.length > 0 && (
//               <div>
//                 <Label>Selected Members ({formData.selectedMembers.length})</Label>
//                 <div className="flex flex-wrap gap-2 mt-2 p-3 border rounded-lg bg-gray-50">
//                   {getSelectedMemberNames().map((name, index) => (
//                     <Badge key={index} variant="secondary" className="flex items-center space-x-1">
//                       <span>{name}</span>
//                       <button
//                         type="button"
//                         onClick={() => removeMember(formData.selectedMembers[index])}
//                         className="ml-1 hover:text-red-600"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Available Members */}
//             <div>
//               <Label>Available Team Members</Label>
//               <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg">
//                 {availableMembers.map((member) => (
//                   <div key={member.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b last:border-b-0">
//                     <Checkbox
//                       checked={formData.selectedMembers.includes(member.id)}
//                       onCheckedChange={() => handleMemberToggle(member.id)}
//                     />
//                     <div className="flex-1">
//                       <p className="font-medium">{member.name}</p>
//                       <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end space-x-3 pt-6 border-t">
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={!formData.name || !formData.type}>
//               Create Room
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateRoomForm;





// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Badge } from '@/components/ui/badge';
// import { X, Users, Shield, Hash } from 'lucide-react';
// import { users } from '../data/dummyData';

// interface CreateRoomFormProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ isOpen, onClose }) => {
//   const { currentUser } = useAuth();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     type: '',
//     privacy: 'private',
//     department: '',
//     center: currentUser?.center || '',
//     selectedMembers: [] as string[],
//     memberSelection: '' // 'dg' or 'centres'
//   });

//   const centers = [
//     'Bengaluru',
//     'Chennai', 
//     'Delhi',
//     'Hyderabad',
//     'Kolkata',
//     'Mohali',
//     'Mumbai',
//     'Noida',
//     'Patna',
//     'Pune',
//     'Silchar',
//     'Thiruvananthapuram'
//   ];

//   const availableMembers = users.filter(user => 
//     user.center === currentUser?.center && user.id !== currentUser?.id
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Creating chat room:', formData);
    
//     // Here you would typically send the data to your backend
//     // For now, we'll just log it and close the form
    
//     onClose();
//     // Reset form
//     setFormData({
//       name: '',
//       description: '',
//       type: '',
//       privacy: 'private',
//       department: '',
//       center: currentUser?.center || '',
//       selectedMembers: [],
//       memberSelection: ''
//     });
//   };

//   const handleMemberToggle = (memberId: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedMembers: prev.selectedMembers.includes(memberId)
//         ? prev.selectedMembers.filter(id => id !== memberId)
//         : [...prev.selectedMembers, memberId]
//     }));
//   };

//   const removeMember = (memberId: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedMembers: prev.selectedMembers.filter(id => id !== memberId)
//     }));
//   };

//   const getSelectedMemberNames = () => {
//     return formData.selectedMembers.map(id => {
//       const member = availableMembers.find(m => m.id === id);
//       return member ? member.name : '';
//     }).filter(Boolean);
//   };

//   const handleMemberSelectionChange = (value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       memberSelection: value,
//       selectedMembers: [] // Reset selected members when changing selection type
//     }));
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center space-x-2">
//             <Hash className="h-5 w-5" />
//             <span>Create New Chat Room</span>
//           </DialogTitle>
//           <DialogDescription>
//             Set up a new communication channel for your team or department.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Basic Information</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name">Room Name *</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                   placeholder="e.g., Project Alpha Team"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <Label htmlFor="type">Room Type *</Label>
//                 <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select room type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="project">Project Team</SelectItem>
//                     <SelectItem value="departmental">Department Discussion</SelectItem>
//                     <SelectItem value="announcement">Announcements</SelectItem>
//                     <SelectItem value="general">General Chat</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                 placeholder="Brief description of the room's purpose..."
//                 rows={3}
//               />
//             </div>
//           </div>

//           {/* Privacy & Access */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold flex items-center space-x-2">
//               <Shield className="h-5 w-5" />
//               <span>Privacy & Access</span>
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="privacy">Privacy Level *</Label>
//                 <Select value={formData.privacy} onValueChange={(value) => setFormData(prev => ({ ...prev, privacy: value }))}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="public">Public - Anyone can join</SelectItem>
//                     <SelectItem value="private">Private - Invite only</SelectItem>
//                     <SelectItem value="restricted">Restricted - Admin approval required</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
              
//               <div>
//                 <Label htmlFor="department">Department</Label>
//                 <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select department" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Software Development">Software Development</SelectItem>
//                     <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
//                     <SelectItem value="Data Science">Data Science</SelectItem>
//                     <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
//                     <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
//                     <SelectItem value="Management">Management</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           {/* Team Members */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold flex items-center space-x-2">
//               <Users className="h-5 w-5" />
//               <span>Team Members</span>
//             </h3>
            
//             {/* Member Selection Type */}
//             <div>
//               <Label htmlFor="memberSelection">Select Member Type *</Label>
//               <Select value={formData.memberSelection} onValueChange={handleMemberSelectionChange}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Choose DG or Centres" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="dg">DG</SelectItem>
//                   <SelectItem value="centres">Centres</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Centre Selection (only show if centres is selected) */}
//             {formData.memberSelection === 'centres' && (
//               <div>
//                 <Label htmlFor="centerSelect">Select Centre *</Label>
//                 <Select value={formData.center} onValueChange={(value) => setFormData(prev => ({ ...prev, center: value }))}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a centre" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {centers.map((center) => (
//                       <SelectItem key={center} value={center}>
//                         {center}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}
            
//             {/* Selected Members */}
//             {formData.selectedMembers.length > 0 && (
//               <div>
//                 <Label>Selected Members ({formData.selectedMembers.length})</Label>
//                 <div className="flex flex-wrap gap-2 mt-2 p-3 border rounded-lg bg-gray-50">
//                   {getSelectedMemberNames().map((name, index) => (
//                     <Badge key={index} variant="secondary" className="flex items-center space-x-1">
//                       <span>{name}</span>
//                       <button
//                         type="button"
//                         onClick={() => removeMember(formData.selectedMembers[index])}
//                         className="ml-1 hover:text-red-600"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Available Members (only show if member selection type is chosen) */}
//             {formData.memberSelection && (
//               <div>
//                 <Label>
//                   Available {formData.memberSelection === 'dg' ? 'DG' : 'Centre'} Members
//                 </Label>
//                 <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg">
//                   {availableMembers.map((member) => (
//                     <div key={member.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b last:border-b-0">
//                       <Checkbox
//                         checked={formData.selectedMembers.includes(member.id)}
//                         onCheckedChange={() => handleMemberToggle(member.id)}
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{member.name}</p>
//                         <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Show message when no selection is made */}
//             {!formData.memberSelection && (
//               <div className="text-center py-8 text-gray-500">
//                 <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
//                 <p>Please select DG or Centres to view available members</p>
//               </div>
//             )}
//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end space-x-3 pt-6 border-t">
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={!formData.name || !formData.type}>
//               Create Room
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateRoomForm;




// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Badge } from '@/components/ui/badge';
// import { X, Users, Shield, Hash, ChevronRight } from 'lucide-react';
// import { users } from '../data/dummyData';

// interface CreateRoomFormProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ isOpen, onClose }) => {
//   const { currentUser } = useAuth();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     type: '',
//     privacy: 'private',
//     department: '',
//     center: currentUser?.center || '',
//     selectedMembers: [] as string[],
//     memberSelection: '', // 'dg' or 'centres'
//     selectedCentre: '',
//     selectedDomain: ''
//   });

//   const centers = [
//     'Bengaluru',
//     'Chennai', 
//     'Delhi',
//     'Hyderabad',
//     'Kolkata',
//     'Mohali',
//     'Mumbai',
//     'Noida',
//     'Patna',
//     'Pune',
//     'Silchar',
//     'Thiruvananthapuram'
//   ];

//   const domains = [
//     'Software Development',
//     'AI & Machine Learning',
//     'Data Science',
//     'Cloud Computing',
//     'Cybersecurity',
//     'Management',
//     'Research & Development',
//     'Quality Assurance',
//     'DevOps',
//     'UI/UX Design'
//   ];

//   // Filter members based on current selection
//   const getFilteredMembers = () => {
//     let filteredUsers = users;

//     if (formData.memberSelection === 'dg') {
//       // For DG, show all users (you might want to add a specific filter for DG members)
//       filteredUsers = users.filter(user => user.role.includes('Director') || user.role.includes('Head'));
//     } else if (formData.memberSelection === 'centres') {
//       if (formData.selectedCentre) {
//         filteredUsers = users.filter(user => user.center === formData.selectedCentre);
//       }
//       if (formData.selectedDomain) {
//         filteredUsers = filteredUsers.filter(user => user.department === formData.selectedDomain);
//       }
//     }

//     // Exclude current user
//     return filteredUsers.filter(user => user.id !== currentUser?.id);
//   };

//   const availableMembers = getFilteredMembers();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Creating chat room:', formData);
    
//     // Here you would typically send the data to your backend
//     // For now, we'll just log it and close the form
    
//     onClose();
//     // Reset form
//     setFormData({
//       name: '',
//       description: '',
//       type: '',
//       privacy: 'private',
//       department: '',
//       center: currentUser?.center || '',
//       selectedMembers: [],
//       memberSelection: '',
//       selectedCentre: '',
//       selectedDomain: ''
//     });
//   };

//   const handleMemberToggle = (memberId: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedMembers: prev.selectedMembers.includes(memberId)
//         ? prev.selectedMembers.filter(id => id !== memberId)
//         : [...prev.selectedMembers, memberId]
//     }));
//   };

//   const removeMember = (memberId: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedMembers: prev.selectedMembers.filter(id => id !== memberId)
//     }));
//   };

//   const getSelectedMemberNames = () => {
//     return formData.selectedMembers.map(id => {
//       const member = users.find(m => m.id === id);
//       return member ? member.name : '';
//     }).filter(Boolean);
//   };

//   const handleMemberSelectionChange = (value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       memberSelection: value,
//       selectedMembers: [], // Reset selected members when changing selection type
//       selectedCentre: '', // Reset centre selection
//       selectedDomain: '' // Reset domain selection
//     }));
//   };

//   const handleCentreChange = (value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedCentre: value,
//       selectedMembers: [], // Reset selected members when changing centre
//       selectedDomain: '' // Reset domain selection
//     }));
//   };

//   const handleDomainChange = (value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedDomain: value,
//       selectedMembers: [] // Reset selected members when changing domain
//     }));
//   };

//   const renderSelectionBreadcrumb = () => {
//     const breadcrumbs = [];
    
//     if (formData.memberSelection) {
//       breadcrumbs.push(formData.memberSelection === 'dg' ? 'DG' : 'Centres');
//     }
    
//     if (formData.selectedCentre) {
//       breadcrumbs.push(formData.selectedCentre);
//     }
    
//     if (formData.selectedDomain) {
//       breadcrumbs.push(formData.selectedDomain);
//     }

//     return breadcrumbs.length > 0 ? (
//       <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
//         <span>Selection Path:</span>
//         {breadcrumbs.map((crumb, index) => (
//           <React.Fragment key={index}>
//             <span className="font-medium">{crumb}</span>
//             {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4" />}
//           </React.Fragment>
//         ))}
//       </div>
//     ) : null;
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center space-x-2">
//             <Hash className="h-5 w-5" />
//             <span>Create New Chat Room</span>
//           </DialogTitle>
//           <DialogDescription>
//             Set up a new communication channel for your team or department.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Basic Information</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name">Room Name *</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                   placeholder="e.g., Project Alpha Team"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <Label htmlFor="type">Room Type *</Label>
//                 <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select room type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="project">Project Team</SelectItem>
//                     <SelectItem value="departmental">Department Discussion</SelectItem>
//                     <SelectItem value="announcement">Announcements</SelectItem>
//                     <SelectItem value="general">General Chat</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                 placeholder="Brief description of the room's purpose..."
//                 rows={3}
//               />
//             </div>
//           </div>

//           {/* Privacy & Access */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold flex items-center space-x-2">
//               <Shield className="h-5 w-5" />
//               <span>Privacy & Access</span>
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="privacy">Privacy Level *</Label>
//                 <Select value={formData.privacy} onValueChange={(value) => setFormData(prev => ({ ...prev, privacy: value }))}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="public">Public - Anyone can join</SelectItem>
//                     <SelectItem value="private">Private - Invite only</SelectItem>
//                     <SelectItem value="restricted">Restricted - Admin approval required</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
              
//               <div>
//                 <Label htmlFor="department">Department</Label>
//                 <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select department" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Software Development">Software Development</SelectItem>
//                     <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
//                     <SelectItem value="Data Science">Data Science</SelectItem>
//                     <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
//                     <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
//                     <SelectItem value="Management">Management</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           {/* Team Members */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold flex items-center space-x-2">
//               <Users className="h-5 w-5" />
//               <span>Team Members</span>
//             </h3>
            
//             {/* Selection Breadcrumb */}
//             {renderSelectionBreadcrumb()}

//             {/* Step 1: Member Selection Type */}
//             <div>
//               <Label htmlFor="memberSelection">Step 1: Select Member Type *</Label>
//               <Select value={formData.memberSelection} onValueChange={handleMemberSelectionChange}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Choose DG or Centres" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="dg">DG (Director General)</SelectItem>
//                   <SelectItem value="centres">Centres</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Step 2: Centre Selection (only show if centres is selected) */}
//             {formData.memberSelection === 'centres' && (
//               <div>
//                 <Label htmlFor="centerSelect">Step 2: Select Centre *</Label>
//                 <Select value={formData.selectedCentre} onValueChange={handleCentreChange}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a centre" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {centers.map((center) => (
//                       <SelectItem key={center} value={center}>
//                         {center}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}

//             {/* Step 3: Domain Selection (only show if centre is selected) */}
//             {formData.memberSelection === 'centres' && formData.selectedCentre && (
//               <div>
//                 <Label htmlFor="domainSelect">Step 3: Select Domain *</Label>
//                 <Select value={formData.selectedDomain} onValueChange={handleDomainChange}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a domain" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {domains.map((domain) => (
//                       <SelectItem key={domain} value={domain}>
//                         {domain}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}
            
//             {/* Selected Members */}
//             {formData.selectedMembers.length > 0 && (
//               <div>
//                 <Label>Selected Members ({formData.selectedMembers.length})</Label>
//                 <div className="flex flex-wrap gap-2 mt-2 p-3 border rounded-lg bg-gray-50">
//                   {getSelectedMemberNames().map((name, index) => (
//                     <Badge key={index} variant="secondary" className="flex items-center space-x-1">
//                       <span>{name}</span>
//                       <button
//                         type="button"
//                         onClick={() => removeMember(formData.selectedMembers[index])}
//                         className="ml-1 hover:text-red-600"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Available Members */}
//             {((formData.memberSelection === 'dg') || 
//               (formData.memberSelection === 'centres' && formData.selectedCentre && formData.selectedDomain)) && (
//               <div>
//                 <Label>
//                   Step {formData.memberSelection === 'dg' ? '2' : '4'}: Select Members
//                 </Label>
//                 {availableMembers.length > 0 ? (
//                   <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg">
//                     {availableMembers.map((member) => (
//                       <div key={member.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b last:border-b-0">
//                         <Checkbox
//                           checked={formData.selectedMembers.includes(member.id)}
//                           onCheckedChange={() => handleMemberToggle(member.id)}
//                         />
//                         <div className="flex-1">
//                           <p className="font-medium">{member.name}</p>
//                           <p className="text-sm text-gray-600">{member.role} • {member.department} • {member.center}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="mt-2 p-4 border rounded-lg text-center text-gray-500">
//                     <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                     <p>No members found for the selected criteria</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Show progress message */}
//             {formData.memberSelection && (
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                 <div className="text-sm text-blue-800">
//                   {formData.memberSelection === 'dg' && (
//                     <p>✓ DG selected. Now you can select specific members.</p>
//                   )}
//                   {formData.memberSelection === 'centres' && !formData.selectedCentre && (
//                     <p>✓ Centres selected. Next, select a specific centre.</p>
//                   )}
//                   {formData.memberSelection === 'centres' && formData.selectedCentre && !formData.selectedDomain && (
//                     <p>✓ Centre selected. Next, select a domain.</p>
//                   )}
//                   {formData.memberSelection === 'centres' && formData.selectedCentre && formData.selectedDomain && (
//                     <p>✓ All filters applied. Now you can select specific members.</p>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Show initial message when no selection is made */}
//             {!formData.memberSelection && (
//               <div className="text-center py-8 text-gray-500">
//                 <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
//                 <p>Please start by selecting DG or Centres</p>
//                 <p className="text-xs mt-1">Follow the steps to filter and select members</p>
//               </div>
//             )}
//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end space-x-3 pt-6 border-t">
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={!formData.name || !formData.type}>
//               Create Room
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateRoomForm;



// working version with step 1&2

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
import { X, Users, Shield, Hash, ChevronRight, Crown } from 'lucide-react';
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
    selectedMembers: [] as string[],
    includeDG: false,
    selectedCentre: '',
    selectedDomain: ''
  });

  const centers = [
    'Bengaluru',
    'Chennai', 
    'Delhi',
    'Hyderabad',
    'Kolkata',
    'Mohali',
    'Mumbai',
    'Noida',
    'Patna',
    'Pune',
    'Silchar',
    'Thiruvananthapuram'
  ];

  const domains = [
    'Software Development',
    'AI & Machine Learning',
    'Data Science',
    'Cloud Computing',
    'Cybersecurity',
    'Management',
    'Research & Development',
    'Quality Assurance',
    'DevOps',
    'UI/UX Design'
  ];


  // Filter members based on current selection
  const getFilteredMembers = () => {
    let filteredUsers = users;

    if (formData.selectedCentre) {
      filteredUsers = users.filter(user => user.center === formData.selectedCentre);
    }
    if (formData.selectedDomain) {
      filteredUsers = filteredUsers.filter(user => user.department === formData.selectedDomain);
    }

    // Exclude current user
    return filteredUsers.filter(user => user.id !== currentUser?.id);
  };

  const availableMembers = getFilteredMembers();

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
      selectedMembers: [],
      includeDG: false,
      selectedCentre: '',
      selectedDomain: ''
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
    const memberNames = formData.selectedMembers.map(id => {
      const member = users.find(m => m.id === id);
      return member ? member.name : '';
    }).filter(Boolean);

    // Add DG if selected
    if (formData.includeDG) {
      memberNames.unshift('Director General (DG)');
    }

    return memberNames;
  };

  const handleCentreChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCentre: value,
      selectedMembers: [], // Reset selected members when changing centre
      selectedDomain: '' // Reset domain selection
    }));
  };

  const handleDomainChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      selectedDomain: value,
      selectedMembers: [] // Reset selected members when changing domain
    }));
  };

  const handleDGToggle = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      includeDG: checked
    }));
  };

  const renderSelectionBreadcrumb = () => {
    const breadcrumbs = [];
    
    if (formData.selectedCentre) {
      breadcrumbs.push(formData.selectedCentre);
    }
    
    if (formData.selectedDomain) {
      breadcrumbs.push(formData.selectedDomain);
    }

    return breadcrumbs.length > 0 ? (
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
        <span>Selection Path:</span>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span className="font-medium">{crumb}</span>
            {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4" />}
          </React.Fragment>
        ))}
      </div>
    ) : null;
  };

  const getTotalSelectedCount = () => {
    return formData.selectedMembers.length + (formData.includeDG ? 1 : 0);
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
            
            {/* DG Selection */}
            <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="includeDG"
                  checked={formData.includeDG}
                  onCheckedChange={handleDGToggle}
                />
                <Label htmlFor="includeDG" className="flex items-center space-x-2 cursor-pointer">
                  {/* <Crown className="h-4 w-4 text-amber-600" /> */}
                  <span className="font-medium">Director General (DG)</span>
                </Label>
              </div>
              <p className="text-sm text-amber-700 mt-1 ml-6">
                Add the Director General to this chat room
              </p>
            </div>

            {/* Centre Selection */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Centre Members Selection</h4>
              
              {/* Selection Breadcrumb */}
              {renderSelectionBreadcrumb()}

              {/* Step 1: Centre Selection */}
              <div>
                <Label htmlFor="centerSelect">Step 1: Select Centre</Label>
                <Select value={formData.selectedCentre} onValueChange={handleCentreChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a centre" />
                  </SelectTrigger>
                  <SelectContent>
                    {centers.map((center) => (
                      <SelectItem key={center} value={center}>
                        {center}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Step 2: Domain Selection */}
              {formData.selectedCentre && (
                <div>
                  <Label htmlFor="domainSelect">Step 2: Select Domain</Label>
                  <Select value={formData.selectedDomain} onValueChange={handleDomainChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Selected Members Summary */}
            {getTotalSelectedCount() > 0 && (
              <div>
                <Label>Selected Members ({getTotalSelectedCount()})</Label>
                <div className="flex flex-wrap gap-2 mt-2 p-3 border rounded-lg bg-gray-50">
                  {formData.includeDG && (
                    <Badge variant="default" className="flex items-center space-x-1 bg-amber-600">
                      <Crown className="h-3 w-3" />
                      <span>Director General (DG)</span>
                      <button
                        type="button"
                        onClick={() => handleDGToggle(false)}
                        className="ml-1 hover:text-red-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {formData.selectedMembers.map((memberId, index) => {
                    const member = users.find(m => m.id === memberId);
                    return member ? (
                      <Badge key={memberId} variant="secondary" className="flex items-center space-x-1">
                        <span>{member.name}</span>
                        <button
                          type="button"
                          onClick={() => removeMember(memberId)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Available Members */}
            {formData.selectedCentre && formData.selectedDomain && (
              <div>
                <Label>Step 3: Select Team Members</Label>
                {availableMembers.length > 0 ? (
                  <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg">
                    {availableMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b last:border-b-0">
                        <Checkbox
                          checked={formData.selectedMembers.includes(member.id)}
                          onCheckedChange={() => handleMemberToggle(member.id)}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role} • {member.department} • {member.center}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 p-4 border rounded-lg text-center text-gray-500">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No members found for the selected criteria</p>
                  </div>
                )}
              </div>
            )}

            {/* Show progress message */}
            {formData.selectedCentre && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm text-blue-800">
                  {!formData.selectedDomain && (
                    <p>✓ Centre selected. Next, select a domain to view available members.</p>
                  )}
                  {formData.selectedDomain && (
                    <p>✓ All filters applied. You can now select specific team members.</p>
                  )}
                </div>
              </div>
            )}

            {/* Show initial message when no selection is made */}
            {!formData.selectedCentre && !formData.includeDG && (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Add DG and/or select centre members</p>
                <p className="text-xs mt-1">Choose from Director General or follow the steps to select centre members</p>
              </div>
            )}
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

