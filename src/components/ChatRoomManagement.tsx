// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   Users, 
//   MessageSquare, 
//   Plus, 
//   Search, 
//   Filter,
//   Settings,
//   Shield,
//   Eye,
//   Edit,
//   Trash2,
//   Clock,
//   Hash
// } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { useToast } from '@/hooks/use-toast';
// import CreateRoomForm from './CreateRoomForm';
// import { db } from '@/lib/firebase';
// import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

// interface ChatRoom {
//   id: string;
//   name: string;
//   type: string;
//   members: number;
//   lastActivity: string;
//   status: string;
//   privacy: string;
//   department: string;
//   center: string;
//   teamMembers: Array<{
//     id: string;
//     name: string;
//     role: string;
//     avatar: string;
//   }>;
// }

// const ChatRoomManagement: React.FC = () => {
//   const { currentUser } = useAuth();
//   const { toast } = useToast();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showRoomDetails, setShowRoomDetails] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
//   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

//   // Fetch chat rooms from Firestore
//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'chatRooms'), (snapshot) => {
//       const rooms = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as ChatRoom[];
//       setChatRooms(rooms);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleCreateRoom = async (roomData: any) => {
//     try {
//       const docRef = await addDoc(collection(db, 'chatRooms'), {
//         ...roomData,
//         members: roomData.selectedMembers.length + (roomData.includeDG ? 1 : 0),
//         lastActivity: 'Just now',
//         status: 'active',
//         teamMembers: roomData.selectedMembers.map((id: string) => {
//           const member = users.find(u => u.id === id);
//           return {
//             id: member.id,
//             name: member.name,
//             role: member.role,
//             avatar: member.name.split(' ').map(n => n[0]).join('')
//           };
//         })
//       });
      
//       toast({
//         title: "Room Created",
//         description: `${roomData.name} has been successfully created`,
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create room",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeleteRoom = async (room: ChatRoom) => {
//     if (confirm(`Are you sure you want to delete "${room.name}"? This action cannot be undone.`)) {
//       try {
//         await deleteDoc(doc(db, 'chatRooms', room.id));
//         toast({
//           title: "Room Deleted",
//           description: `${room.name} has been permanently deleted`,
//           variant: "destructive",
//         });
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to delete room",
//           variant: "destructive",
//         });
//       }
//     }
//   };

//   // ... rest of the component remains the same ...
  
//   return (
//     <div className="p-6 space-y-6">
//       {/* ... existing JSX ... */}
      
//       <CreateRoomForm 
//         isOpen={showCreateForm}
//         onClose={() => setShowCreateForm(false)}
//         onCreateRoom={handleCreateRoom}
//       />
//     </div>
//   );
// };

// export default ChatRoomManagement;





import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  MessageSquare, 
  Plus, 
  Search, 
  Filter,
  Settings,
  Shield,
  Eye,
  Edit,
  Trash2,
  Clock,
  Hash
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import CreateRoomForm from './CreateRoomForm';

const ChatRoomManagement: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // Sample chat rooms data
  const chatRooms = [
    {
      id: '1',
      name: 'Project Alpha Team',
      type: 'project',
      members: 8,
      lastActivity: '2 hours ago',
      status: 'active',
      privacy: 'private',
      department: 'Software Development',
      center: 'C-DAC Pune',
      teamMembers: [
        { id: '1', name: 'John Doe', role: 'Project Manager', avatar: 'JD' },
        { id: '2', name: 'Jane Smith', role: 'Developer', avatar: 'JS' },
        { id: '3', name: 'Mike Johnson', role: 'Designer', avatar: 'MJ' }
      ]
    },
    {
      id: '2',
      name: 'General Announcements',
      type: 'announcement',
      members: 150,
      lastActivity: '1 day ago',
      status: 'active',
      privacy: 'public',
      department: 'All',
      center: 'All Centers',
      teamMembers: []
    },
    {
      id: '3',
      name: 'HODs Discussion',
      type: 'departmental',
      members: 12,
      lastActivity: '3 hours ago',
      status: 'active',
      privacy: 'restricted',
      department: 'Management',
      center: 'C-DAC Pune',
      teamMembers: [
        { id: '4', name: 'Sarah Wilson', role: 'HOD', avatar: 'SW' },
        { id: '5', name: 'David Brown', role: 'HOD', avatar: 'DB' }
      ]
    }
  ];

  const getFilteredRooms = () => {
    let filtered = chatRooms;

    // Role-based filtering
    if (currentUser?.role === 'HOD') {
      filtered = chatRooms.filter(room => 
        room.type === 'departmental' || 
        room.type === 'announcement' || 
        room.department === currentUser.department
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(room => room.type === selectedFilter);
    }

    return filtered;
  };

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'bg-blue-100 text-blue-800';
      case 'announcement':
        return 'bg-green-100 text-green-800';
      case 'departmental':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case 'public':
        return <Eye className="h-4 w-4 text-green-600" />;
      case 'private':
        return <Shield className="h-4 w-4 text-blue-600" />;
      case 'restricted':
        return <Shield className="h-4 w-4 text-red-600" />;
      default:
        return <Eye className="h-4 w-4 text-gray-600" />;
    }
  };

  const canManageRoom = (room: any) => {
    if (currentUser?.role === 'DG' || currentUser?.role === 'Center Head') {
      return true;
    }
    if (currentUser?.role === 'HOD' && room.department === currentUser.department) {
      return true;
    }
    return false;
  };

  const handleViewRoom = (room: any) => {
    setSelectedRoom(room);
    setShowRoomDetails(true);
    toast({
      title: "Room Details",
      description: `Viewing details for ${room.name}`,
    });
  };

  const handleEditRoom = (room: any) => {
    toast({
      title: "Edit Room Settings",
      description: `Opening settings for ${room.name}`,
    });
    console.log('Opening room settings:', room.name);
    // Implementation for editing room settings would go here
  };

  const handleDeleteRoom = (room: any) => {
    if (confirm(`Are you sure you want to delete "${room.name}"? This action cannot be undone.`)) {
      toast({
        title: "Room Deleted",
        description: `${room.name} has been permanently deleted`,
        variant: "destructive",
      });
      console.log('Deleting room:', room.name);
      // Implementation for deleting room would go here
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chat Room Management</h1>
          <p className="text-gray-600 mt-1">Manage communication channels across departments</p>
        </div>
        <Button className="flex items-center space-x-2" onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4" />
          <span>Create Room</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Advanced Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search chat rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="project">Private Rooms</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="departmental">Departmental</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold">{chatRooms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-bold">{chatRooms.reduce((sum, room) => sum + room.members, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Hash className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Project Rooms</p>
                <p className="text-2xl font-bold">{chatRooms.filter(r => r.type === 'project').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Private Rooms</p>
                <p className="text-2xl font-bold">{chatRooms.filter(r => r.privacy === 'private').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Rooms List */}
      <Card>
        <CardHeader>
          <CardTitle>Chat Rooms</CardTitle>
          <CardDescription>Manage and monitor all communication channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getFilteredRooms().map((room) => (
              <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {room.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{room.name}</h3>
                      <Badge className={getRoomTypeColor(room.type)} variant="secondary">
                        {room.type}
                      </Badge>
                      {getPrivacyIcon(room.privacy)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{room.members} members</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{room.lastActivity}</span>
                      </span>
                      <span>{room.department}</span>
                    </div>
                    
                    {/* Team Members Preview (up to 3 levels) */}
                    {room.teamMembers.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Team Members:</p>
                        <div className="flex space-x-2">
                          {room.teamMembers.slice(0, 3).map((member) => (
                            <div key={member.id} className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
                              <Avatar className="h-4 w-4">
                                <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-700">{member.name}</span>
                            </div>
                          ))}
                          {room.teamMembers.length > 3 && (
                            <span className="text-xs text-gray-500">+{room.teamMembers.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewRoom(room)}
                    title="View room details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {canManageRoom(room) && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditRoom(room)}
                        title="Edit room settings"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteRoom(room)}
                        title="Delete room"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Room Details Modal */}
      <Dialog open={showRoomDetails} onOpenChange={setShowRoomDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Room Details: {selectedRoom?.name}</DialogTitle>
            <DialogDescription>
              Detailed information about this chat room
            </DialogDescription>
          </DialogHeader>
          {selectedRoom && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Type:</p>
                  <p className="text-gray-600">{selectedRoom.type}</p>
                </div>
                <div>
                  <p className="font-medium">Privacy:</p>
                  <p className="text-gray-600">{selectedRoom.privacy}</p>
                </div>
                <div>
                  <p className="font-medium">Members:</p>
                  <p className="text-gray-600">{selectedRoom.members}</p>
                </div>
                <div>
                  <p className="font-medium">Department:</p>
                  <p className="text-gray-600">{selectedRoom.department}</p>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Team Members:</p>
                <div className="space-y-2">
                  {selectedRoom.teamMembers.map((member: any) => (
                    <div key={member.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Room Form */}
      <CreateRoomForm 
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
    </div>
  );
};

export default ChatRoomManagement;






// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   Users, 
//   MessageSquare, 
//   Plus, 
//   Search, 
//   Filter,
//   Settings,
//   Shield,
//   Eye,
//   Edit,
//   Trash2,
//   Clock,
//   Hash
// } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { useToast } from '@/hooks/use-toast';
// import CreateRoomForm from './CreateRoomForm';
// import { db } from '@/lib/firebase';
// import { collection, addDoc, onSnapshot, doc, deleteDoc, Timestamp } from 'firebase/firestore';

// interface TeamMember {
//   id: string;
//   name: string;
//   role: string;
//   avatar: string;
// }

// interface ChatRoom {
//   id: string;
//   name: string;
//   description: string;
//   type: 'project' | 'departmental' | 'announcement' | 'general';
//   members: number;
//   lastActivity: string;
//   status: 'active' | 'archived';
//   privacy: 'public' | 'private' | 'restricted';
//   department: string;
//   center: string;
//   teamMembers: TeamMember[];
//   createdAt: Timestamp;
// }

// const ChatRoomManagement: React.FC = () => {
//   const { currentUser } = useAuth();
//   const { toast } = useToast();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showRoomDetails, setShowRoomDetails] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
//   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch chat rooms from Firestore
//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'chatRooms'), (snapshot) => {
//       const rooms = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//         createdAt: doc.data().createdAt || Timestamp.now()
//       })) as ChatRoom[];
//       setChatRooms(rooms);
//       setLoading(false);
//     }, (error) => {
//       console.error("Error fetching chat rooms:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load chat rooms",
//         variant: "destructive",
//       });
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [toast]);

//   const handleCreateRoom = async (roomData: any) => {
//     try {
//       const teamMembers = roomData.selectedMembers.map((id: string) => {
//         const member = users.find(u => u.id === id);
//         return {
//           id: member?.id || id,
//           name: member?.name || 'Unknown',
//           role: member?.role || 'Member',
//           avatar: member?.name ? member.name.split(' ').map(n => n[0]).join('') : 'U'
//         };
//       });

//       if (roomData.includeDG) {
//         teamMembers.unshift({
//           id: 'dg',
//           name: 'Director General',
//           role: 'DG',
//           avatar: 'DG'
//         });
//       }

//       await addDoc(collection(db, 'chatRooms'), {
//         name: roomData.name.trim(),
//         description: roomData.description.trim(),
//         type: roomData.type,
//         privacy: roomData.privacy,
//         department: roomData.department,
//         center: roomData.center,
//         members: teamMembers.length,
//         lastActivity: 'Just now',
//         status: 'active',
//         teamMembers,
//         createdAt: Timestamp.now()
//       });
      
//       toast({
//         title: "Room Created",
//         description: `${roomData.name} has been successfully created`,
//       });
//     } catch (error) {
//       console.error("Error creating room:", error);
//       toast({
//         title: "Error",
//         description: "Failed to create room",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeleteRoom = async (room: ChatRoom) => {
//     if (!canManageRoom(room)) {
//       toast({
//         title: "Permission Denied",
//         description: "You don't have permission to delete this room",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (confirm(`Are you sure you want to delete "${room.name}"? This action cannot be undone.`)) {
//       try {
//         await deleteDoc(doc(db, 'chatRooms', room.id));
//         toast({
//           title: "Room Deleted",
//           description: `${room.name} has been permanently deleted`,
//           variant: "destructive",
//         });
//       } catch (error) {
//         console.error("Error deleting room:", error);
//         toast({
//           title: "Error",
//           description: "Failed to delete room",
//           variant: "destructive",
//         });
//       }
//     }
//   };

//   const getFilteredRooms = () => {
//     let filtered = chatRooms;

//     // Role-based filtering
//     if (currentUser?.role === 'HOD') {
//       filtered = chatRooms.filter(room => 
//         room.type === 'departmental' || 
//         room.type === 'announcement' || 
//         room.department === currentUser.department
//       );
//     }

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(room =>
//         room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         room.department.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Type filter
//     if (selectedFilter !== 'all') {
//       filtered = filtered.filter(room => room.type === selectedFilter);
//     }

//     return filtered;
//   };

//   const getRoomTypeColor = (type: string) => {
//     switch (type) {
//       case 'project':
//         return 'bg-blue-100 text-blue-800';
//       case 'announcement':
//         return 'bg-green-100 text-green-800';
//       case 'departmental':
//         return 'bg-purple-100 text-purple-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPrivacyIcon = (privacy: string) => {
//     switch (privacy) {
//       case 'public':
//         return <Eye className="h-4 w-4 text-green-600" />;
//       case 'private':
//         return <Shield className="h-4 w-4 text-blue-600" />;
//       case 'restricted':
//         return <Shield className="h-4 w-4 text-red-600" />;
//       default:
//         return <Eye className="h-4 w-4 text-gray-600" />;
//     }
//   };

//   const canManageRoom = (room: ChatRoom) => {
//     if (!currentUser) return false;
//     if (currentUser.role === 'DG' || currentUser.role === 'Center Head') {
//       return true;
//     }
//     if (currentUser.role === 'HOD' && room.department === currentUser.department) {
//       return true;
//     }
//     return false;
//   };

//   const handleViewRoom = (room: ChatRoom) => {
//     setSelectedRoom(room);
//     setShowRoomDetails(true);
//     toast({
//       title: "Room Details",
//       description: `Viewing details for ${room.name}`,
//     });
//   };

//   const handleEditRoom = (room: ChatRoom) => {
//     toast({
//       title: "Edit Room Settings",
//       description: `Opening settings for ${room.name}`,
//     });
//     console.log('Opening room settings:', room.name);
//     // Implementation for editing room settings would go here
//   };

//   if (loading) {
//     return (
//       <div className="p-6 flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Chat Room Management</h1>
//           <p className="text-gray-600 mt-1">Manage communication channels across departments</p>
//         </div>
//         <Button className="flex items-center space-x-2" onClick={() => setShowCreateForm(true)}>
//           <Plus className="h-4 w-4" />
//           <span>Create Room</span>
//         </Button>
//       </div>

//       {/* Search and Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center space-x-2">
//             <Filter className="h-5 w-5" />
//             <span>Advanced Filters</span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 placeholder="Search chat rooms..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={selectedFilter} onValueChange={setSelectedFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Filter by type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="project">Private Rooms</SelectItem>
//                 <SelectItem value="announcement">Announcements</SelectItem>
//                 <SelectItem value="departmental">Departmental</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button variant="outline" onClick={() => {
//               setSearchTerm('');
//               setSelectedFilter('all');
//             }}>
//               Clear Filters
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-2">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <MessageSquare className="h-5 w-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Total Rooms</p>
//                 <p className="text-2xl font-bold">{chatRooms.length}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-2">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <Users className="h-5 w-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Active Members</p>
//                 <p className="text-2xl font-bold">{chatRooms.reduce((sum, room) => sum + room.members, 0)}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-2">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <Hash className="h-5 w-5 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Project Rooms</p>
//                 <p className="text-2xl font-bold">{chatRooms.filter(r => r.type === 'project').length}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-2">
//               <div className="p-2 bg-orange-100 rounded-lg">
//                 <Shield className="h-5 w-5 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Private Rooms</p>
//                 <p className="text-2xl font-bold">{chatRooms.filter(r => r.privacy === 'private').length}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Chat Rooms List */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Chat Rooms</CardTitle>
//           <CardDescription>Manage and monitor all communication channels</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {getFilteredRooms().length > 0 ? (
//               getFilteredRooms().map((room) => (
//                 <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
//                   <div className="flex items-center space-x-4">
//                     <Avatar>
//                       <AvatarFallback>
//                         {room.name.split(' ').map(word => word[0]).join('').toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-2">
//                         <h3 className="font-medium text-gray-900">{room.name}</h3>
//                         <Badge className={getRoomTypeColor(room.type)} variant="secondary">
//                           {room.type}
//                         </Badge>
//                         {getPrivacyIcon(room.privacy)}
//                       </div>
//                       <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
//                         <span className="flex items-center space-x-1">
//                           <Users className="h-3 w-3" />
//                           <span>{room.members} members</span>
//                         </span>
//                         <span className="flex items-center space-x-1">
//                           <Clock className="h-3 w-3" />
//                           <span>{room.lastActivity}</span>
//                         </span>
//                         <span>{room.department}</span>
//                       </div>
                      
//                       {/* Team Members Preview (up to 3 levels) */}
//                       {room.teamMembers.length > 0 && (
//                         <div className="mt-2">
//                           <p className="text-xs text-gray-500 mb-1">Team Members:</p>
//                           <div className="flex space-x-2">
//                             {room.teamMembers.slice(0, 3).map((member) => (
//                               <div key={member.id} className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
//                                 <Avatar className="h-4 w-4">
//                                   <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
//                                 </Avatar>
//                                 <span className="text-xs text-gray-700">{member.name}</span>
//                               </div>
//                             ))}
//                             {room.teamMembers.length > 3 && (
//                               <span className="text-xs text-gray-500">+{room.teamMembers.length - 3} more</span>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <Button 
//                       variant="ghost" 
//                       size="sm"
//                       onClick={() => handleViewRoom(room)}
//                       title="View room details"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                     {canManageRoom(room) && (
//                       <>
//                         <Button 
//                           variant="ghost" 
//                           size="sm"
//                           onClick={() => handleEditRoom(room)}
//                           title="Edit room settings"
//                         >
//                           <Settings className="h-4 w-4" />
//                         </Button>
//                         <Button 
//                           variant="ghost" 
//                           size="sm" 
//                           className="text-red-600 hover:text-red-700"
//                           onClick={() => handleDeleteRoom(room)}
//                           title="Delete room"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-12">
//                 <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
//                 <h3 className="mt-2 text-sm font-medium text-gray-900">No chat rooms found</h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                   {searchTerm || selectedFilter !== 'all' 
//                     ? 'Try adjusting your search or filter' 
//                     : 'Create a new chat room to get started'}
//                 </p>
//                 <div className="mt-6">
//                   <Button onClick={() => setShowCreateForm(true)}>
//                     <Plus className="h-4 w-4 mr-2" />
//                     New Chat Room
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Room Details Modal */}
//       <Dialog open={showRoomDetails} onOpenChange={setShowRoomDetails}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Room Details: {selectedRoom?.name}</DialogTitle>
//             <DialogDescription>
//               Detailed information about this chat room
//             </DialogDescription>
//           </DialogHeader>
//           {selectedRoom && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="font-medium">Type:</p>
//                   <p className="text-gray-600 capitalize">{selectedRoom.type}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Privacy:</p>
//                   <p className="text-gray-600 capitalize">{selectedRoom.privacy}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Members:</p>
//                   <p className="text-gray-600">{selectedRoom.members}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Department:</p>
//                   <p className="text-gray-600">{selectedRoom.department}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Center:</p>
//                   <p className="text-gray-600">{selectedRoom.center}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Created:</p>
//                   <p className="text-gray-600">
//                     {selectedRoom.createdAt?.toDate().toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//               <div>
//                 <p className="font-medium">Description:</p>
//                 <p className="text-gray-600 mt-1 p-3 bg-gray-50 rounded">
//                   {selectedRoom.description || 'No description provided'}
//                 </p>
//               </div>
//               <div>
//                 <p className="font-medium mb-2">Team Members:</p>
//                 <div className="space-y-2">
//                   {selectedRoom.teamMembers.map((member) => (
//                     <div key={member.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
//                       <Avatar className="h-8 w-8">
//                         <AvatarFallback>{member.avatar}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-medium">{member.name}</p>
//                         <p className="text-sm text-gray-600">{member.role}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Create Room Form */}
//       <CreateRoomForm 
//         isOpen={showCreateForm}
//         onClose={() => setShowCreateForm(false)}
//         onCreateRoom={handleCreateRoom}
//       />
//     </div>
//   );
// };

// export default ChatRoomManagement;