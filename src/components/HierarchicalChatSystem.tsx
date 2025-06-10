
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Phone, Video, Send, Paperclip } from 'lucide-react';
import { users, projects } from '../data/dummyData';

const HierarchicalChatSystem: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const getChatRooms = () => {
    if (!currentUser) return [];

    const rooms = [];

    // Get users that current user can chat with based on C-DAC hierarchy
    const getAuthorizedChatUsers = () => {
      const authorizedUsers = [];

      switch (currentUser.role) {
        case 'DG':
          // DG can only chat with Center Heads
          authorizedUsers.push(...users.filter(u => u.role === 'Center Head'));
          break;

        case 'Center Head':
          // Center Heads can chat with DG and HODs in their center
          authorizedUsers.push(...users.filter(u => 
            (u.role === 'DG') || 
            (u.role === 'HOD' && u.center === currentUser.center)
          ));
          break;

        case 'HOD':
          // HODs can chat with their Center Head and Project Coordinators/Managers in their department
          authorizedUsers.push(...users.filter(u => 
            (u.role === 'Center Head' && u.center === currentUser.center) ||
            ((u.role === 'Project Coordinator' || u.role === 'Project Manager') && 
             u.department === currentUser.department && u.center === currentUser.center)
          ));
          break;

        case 'Project Coordinator':
        case 'Project Manager':
          // Project Coordinators/Managers can chat with their HOD and Project Engineers/Assistants
          authorizedUsers.push(...users.filter(u => 
            (u.role === 'HOD' && u.department === currentUser.department && u.center === currentUser.center) ||
            ((u.role === 'Project Engineer' || u.role === 'Project Assistant') && 
             u.department === currentUser.department && u.center === currentUser.center)
          ));
          break;

        case 'Project Engineer':
        case 'Project Assistant':
          // Project Engineers/Assistants can only chat with their immediate supervisor
          const supervisor = users.find(u => u.id === currentUser.reportsTo);
          if (supervisor) {
            authorizedUsers.push(supervisor);
          }
          break;
      }

      return authorizedUsers;
    };

    // Add private chats with authorized users
    const authorizedUsers = getAuthorizedChatUsers();
    authorizedUsers.forEach(user => {
      rooms.push({
        id: `private-${user.id}`,
        name: `${user.name} (${user.role})`,
        type: 'private' as const,
        participants: 2,
        lastMessage: 'Start conversation',
        canAccess: true,
        center: user.center,
        department: user.department
      });
    });

    // Add department-wide chats (for HODs and above)
    if (['DG', 'Center Head', 'HOD'].includes(currentUser.role)) {
      if (currentUser.role === 'DG') {
        // DG gets center-wide chats
        const centers = [...new Set(users.map(u => u.center).filter(Boolean))];
        centers.forEach(center => {
          rooms.push({
            id: `center-${center}`,
            name: `${center} Center Discussion`,
            type: 'center' as const,
            participants: users.filter(u => u.center === center).length,
            lastMessage: `${center} center updates`,
            canAccess: true
          });
        });
      } else if (currentUser.role === 'Center Head') {
        // Center Head gets department chats in their center
        const departments = [...new Set(users.filter(u => u.center === currentUser.center).map(u => u.department).filter(Boolean))];
        departments.forEach(department => {
          rooms.push({
            id: `dept-${department}`,
            name: `${department} Department`,
            type: 'department' as const,
            participants: users.filter(u => u.department === department && u.center === currentUser.center).length,
            lastMessage: `${department} department discussion`,
            canAccess: true
          });
        });
      } else if (currentUser.role === 'HOD') {
        // HOD gets their department chat
        rooms.push({
          id: `dept-${currentUser.department}`,
          name: `${currentUser.department} Department`,
          type: 'department' as const,
          participants: users.filter(u => u.department === currentUser.department && u.center === currentUser.center).length,
          lastMessage: `${currentUser.department} department discussion`,
          canAccess: true
        });
      }
    }

    // Add project-specific chats
    const userProjects = projects.filter(p => {
      if (currentUser.role === 'DG') return true;
      if (currentUser.role === 'Center Head') return p.center === currentUser.center;
      if (currentUser.role === 'HOD') return p.department === currentUser.department && p.center === currentUser.center;
      if (['Project Coordinator', 'Project Manager'].includes(currentUser.role)) return p.manager === currentUser.id;
      return p.assignedTo.includes(currentUser.id);
    });

    userProjects.forEach(project => {
      rooms.push({
        id: `project-${project.id}`,
        name: `${project.title} - Project Team`,
        type: 'project' as const,
        participants: project.assignedTo.length + 1,
        lastMessage: 'Project discussion ongoing',
        canAccess: true
      });
    });

    return rooms;
  };

  const chatRooms = getChatRooms();
  const selectedRoomData = chatRooms.find(room => room.id === selectedRoom);

  const sendMessage = () => {
    if (message.trim() && selectedRoom) {
      console.log(`Sending message to ${selectedRoom}: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="p-6 h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">C-DAC Chat System</h1>
          <p className="text-gray-600">Hierarchical communication within C-DAC organization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Chat Rooms List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Available Chats</CardTitle>
            <p className="text-sm text-gray-600">Role: {currentUser?.role}</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {chatRooms.length > 0 ? chatRooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedRoom === room.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        {room.type === 'private' ? <MessageCircle className="h-4 w-4 text-blue-600" /> : <Users className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{room.name}</h4>
                        <p className="text-xs text-gray-600">{room.lastMessage}</p>
                        {room.type === 'private' && (room as any).center && (
                          <p className="text-xs text-gray-500">{(room as any).center} • {(room as any).department}</p>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {room.participants}
                    </Badge>
                  </div>
                </div>
              )) : (
                <div className="p-4 text-center text-gray-500">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No authorized chat rooms available</p>
                  <p className="text-xs mt-1">Contact your supervisor for access</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2">
          {selectedRoomData ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedRoomData.name}</CardTitle>
                    <p className="text-sm text-gray-600">{selectedRoomData.participants} participants • {selectedRoomData.type} chat</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col h-96">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  <div className="text-center text-gray-500 text-sm">
                    <div className="mb-2">🔒 Secure C-DAC Communication</div>
                    <div>Start of conversation with {selectedRoomData.name}</div>
                    <div className="text-xs mt-2 text-gray-400">
                      This chat follows C-DAC's hierarchical communication policy
                    </div>
                  </div>
                </div>
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a chat room to start messaging</p>
                <p className="text-sm mt-2 text-gray-400">
                  Chat access is limited based on your role: {currentUser?.role}
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HierarchicalChatSystem;
