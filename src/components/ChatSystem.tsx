
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Video, 
  Paperclip, 
  Search,
  MoreVertical,
  Users,
  Hash,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { chatRooms, chatMessages, users, projects } from '../data/dummyData';

const ChatSystem: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter chat rooms based on user participation
  const userChatRooms = chatRooms.filter(room => 
    room.participants.includes(currentUser?.id || '')
  );

  const filteredRooms = userChatRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoomMessages = (roomId: string) => {
    return chatMessages
      .filter(msg => msg.roomId === roomId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown User';
  };

  const getUserAvatar = (userId: string) => {
    return users.find(user => user.id === userId)?.avatar || '👤';
  };

  const getProjectName = (projectId: string) => {
    return projects.find(project => project.id === projectId)?.title || 'Unknown Project';
  };

  const getRoomIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Hash className="h-4 w-4" />;
      case 'department':
        return <Users className="h-4 w-4" />;
      case 'private':
        return <Lock className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedRoom) return;
    
    // In a real app, this would send the message to the server
    console.log('Sending message:', messageText, 'to room:', selectedRoom);
    setMessageText('');
  };

  const selectedRoomData = chatRooms.find(room => room.id === selectedRoom);
  const roomMessages = selectedRoom ? getRoomMessages(selectedRoom) : [];

  return (
    <div className="p-6 h-[calc(100vh-2rem)]">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Chat Rooms Sidebar */}
        <div className="w-full lg:w-1/3 space-y-4">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
            <p className="text-gray-600 mt-1">Collaborate with your team</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Chat Rooms List */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedRoom === room.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      room.type === 'project' ? 'bg-blue-100 text-blue-600' :
                      room.type === 'department' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {getRoomIcon(room.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 truncate">{room.name}</h4>
                        <span className="text-xs text-gray-500">
                          {formatTime(room.lastActivity)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {room.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary" className={
                          room.type === 'project' ? 'bg-blue-100 text-blue-800' :
                          room.type === 'department' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }>
                          {room.type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {room.participants.length} members
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedRoom ? (
            <Card className="flex-1 flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      selectedRoomData?.type === 'project' ? 'bg-blue-100 text-blue-600' :
                      selectedRoomData?.type === 'department' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {getRoomIcon(selectedRoomData?.type || 'private')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedRoomData?.name}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedRoomData?.participants.length} members
                        {selectedRoomData?.projectId && (
                          <span> • {getProjectName(selectedRoomData.projectId)}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {roomMessages.map((message) => {
                  const isCurrentUser = message.sender === currentUser?.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                        isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                          {getUserAvatar(message.sender)}
                        </div>
                        <div>
                          <div className={`p-3 rounded-lg ${
                            isCurrentUser 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            {!isCurrentUser && (
                              <p className="text-xs font-medium mb-1 text-gray-600">
                                {getUserName(message.sender)}
                              </p>
                            )}
                            <p className="text-sm">{message.message}</p>
                            {message.type === 'file' && message.fileName && (
                              <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-opacity-20">
                                <Paperclip className="h-3 w-3" />
                                <span className="text-xs">{message.fileName}</span>
                              </div>
                            )}
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 ${
                            isCurrentUser ? 'text-right' : ''
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a chat room to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
