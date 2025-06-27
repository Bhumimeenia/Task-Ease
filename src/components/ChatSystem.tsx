
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



// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// // import { useSocket, useChatSocket } from '../contexts/SocketContext.tsx';
// import { 
//   MessageSquare, 
//   Send, 
//   Phone, 
//   Video, 
//   Paperclip, 
//   Search,
//   MoreVertical,
//   Users,
//   Hash,
//   Lock,
//   Circle,
//   Loader2
// } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { users } from '../data/dummyData';

// const ChatSystem: React.FC = () => {
//   const { currentUser } = useAuth();
//   const { socket, isConnected, onlineUsers, joinRoom, leaveRoom, sendMessage } = useSocket();
//   const { messages, rooms, sendTypingIndicator } = useChatSocket();
  
//   const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
//   const [messageText, setMessageText] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [typingUsers, setTypingUsers] = useState<{ [roomId: string]: string[] }>({});
//   const [isTyping, setIsTyping] = useState(false);
  
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const typingTimeoutRef = useRef<NodeJS.Timeout>();

//   // Filter chat rooms based on user participation
//   const userChatRooms = rooms.filter(room => 
//     room.participants && room.participants.includes(currentUser?.id || '')
//   );

//   const filteredRooms = userChatRooms.filter(room =>
//     room.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Get messages for selected room
//   const roomMessages = messages.filter(msg => msg.roomId === selectedRoom);

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [roomMessages]);

//   // Handle room selection
//   useEffect(() => {
//     if (selectedRoom && socket) {
//       joinRoom(selectedRoom);
//       // Request message history for the room
//       socket.emit('get_message_history', selectedRoom);
//     }

//     return () => {
//       if (selectedRoom) {
//         leaveRoom(selectedRoom);
//       }
//     };
//   }, [selectedRoom, socket]);

//   // Listen for typing indicators
//   useEffect(() => {
//     if (!socket) return;

//     socket.on('user_typing', (data: { userId: string; roomId: string; isTyping: boolean; userName: string }) => {
//       setTypingUsers(prev => {
//         const roomTyping = prev[data.roomId] || [];
//         if (data.isTyping) {
//           if (!roomTyping.includes(data.userName)) {
//             return {
//               ...prev,
//               [data.roomId]: [...roomTyping, data.userName]
//             };
//           }
//         } else {
//           return {
//             ...prev,
//             [data.roomId]: roomTyping.filter(name => name !== data.userName)
//           };
//         }
//         return prev;
//       });
//     });

//     return () => {
//       socket.off('user_typing');
//     };
//   }, [socket]);

//   const getUserName = (userId: string) => {
//     return users.find(user => user.id === userId)?.name || 'Unknown User';
//   };

//   const getUserAvatar = (userId: string) => {
//     return users.find(user => user.id === userId)?.avatar || '👤';
//   };

//   const getRoomIcon = (type: string) => {
//     switch (type) {
//       case 'project':
//         return <Hash className="h-4 w-4" />;
//       case 'department':
//         return <Users className="h-4 w-4" />;
//       case 'private':
//         return <Lock className="h-4 w-4" />;
//       default:
//         return <MessageSquare className="h-4 w-4" />;
//     }
//   };

//   const formatTime = (timestamp: string) => {
//     return new Date(timestamp).toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit',
//       hour12: true 
//     });
//   };

//   const formatDate = (timestamp: string) => {
//     const date = new Date(timestamp);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) {
//       return 'Today';
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return 'Yesterday';
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   const handleSendMessage = () => {
//     if (!messageText.trim() || !selectedRoom || !isConnected) return;
    
//     sendMessage(selectedRoom, messageText.trim());
//     setMessageText('');
    
//     // Stop typing indicator
//     if (isTyping) {
//       sendTypingIndicator(selectedRoom, false);
//       setIsTyping(false);
//     }
//   };

//   const handleTyping = (value: string) => {
//     setMessageText(value);
    
//     if (!selectedRoom) return;

//     // Clear existing timeout
//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     // Start typing if not already
//     if (!isTyping && value.length > 0) {
//       setIsTyping(true);
//       sendTypingIndicator(selectedRoom, true);
//     }

//     // Set timeout to stop typing
//     typingTimeoutRef.current = setTimeout(() => {
//       if (isTyping) {
//         setIsTyping(false);
//         sendTypingIndicator(selectedRoom, false);
//       }
//     }, 1000);

//     // Stop typing immediately if input is empty
//     if (value.length === 0 && isTyping) {
//       setIsTyping(false);
//       sendTypingIndicator(selectedRoom, false);
//     }
//   };

//   const isUserOnline = (userId: string) => {
//     return onlineUsers.includes(userId);
//   };

//   const selectedRoomData = rooms.find(room => room.id === selectedRoom);
//   const currentRoomTyping = typingUsers[selectedRoom || ''] || [];

//   return (
//     <div className="p-6 h-[calc(100vh-2rem)]">
//       {/* Connection Status */}
//       <div className="mb-4">
//         <div className="flex items-center space-x-2">
//           <Circle className={`h-3 w-3 ${isConnected ? 'text-green-500 fill-current' : 'text-red-500 fill-current'}`} />
//           <span className="text-sm text-gray-600">
//             {isConnected ? 'Connected' : 'Connecting...'}
//           </span>
//           {!isConnected && <Loader2 className="h-4 w-4 animate-spin" />}
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6 h-full">
//         {/* Chat Rooms Sidebar */}
//         <div className="w-full lg:w-1/3 space-y-4">
//           {/* Header */}
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
//             <p className="text-gray-600 mt-1">
//               Collaborate with your team • {onlineUsers.length} online
//             </p>
//           </div>

//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search chats..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>

//           {/* Chat Rooms List */}
//           <Card className="flex-1">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">Conversations</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               {filteredRooms.length === 0 ? (
//                 <div className="text-center py-8">
//                   <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                   <p className="text-gray-500">No chat rooms available</p>
//                 </div>
//               ) : (
//                 filteredRooms.map((room) => {
//                   const lastMessage = messages
//                     .filter(msg => msg.roomId === room.id)
//                     .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
                  
//                   return (
//                     <div
//                       key={room.id}
//                       className={`p-3 rounded-lg cursor-pointer transition-colors ${
//                         selectedRoom === room.id
//                           ? 'bg-blue-50 border border-blue-200'
//                           : 'hover:bg-gray-50'
//                       }`}
//                       onClick={() => setSelectedRoom(room.id)}
//                     >
//                       <div className="flex items-center space-x-3">
//                         <div className={`p-2 rounded-full relative ${
//                           room.type === 'project' ? 'bg-blue-100 text-blue-600' :
//                           room.type === 'department' ? 'bg-green-100 text-green-600' :
//                           'bg-purple-100 text-purple-600'
//                         }`}>
//                           {getRoomIcon(room.type)}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center justify-between">
//                             <h4 className="font-medium text-gray-900 truncate">{room.name}</h4>
//                             {lastMessage && (
//                               <span className="text-xs text-gray-500">
//                                 {formatTime(lastMessage.timestamp)}
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-sm text-gray-600 truncate mt-1">
//                             {typingUsers[room.id]?.length > 0 
//                               ? `${typingUsers[room.id][0]} is typing...`
//                               : lastMessage?.message || 'No messages yet'
//                             }
//                           </p>
//                           <div className="flex items-center justify-between mt-2">
//                             <Badge variant="secondary" className={
//                               room.type === 'project' ? 'bg-blue-100 text-blue-800' :
//                               room.type === 'department' ? 'bg-green-100 text-green-800' :
//                               'bg-purple-100 text-purple-800'
//                             }>
//                               {room.type}
//                             </Badge>
//                             <div className="flex items-center space-x-1">
//                               <Circle className="h-2 w-2 text-green-500 fill-current" />
//                               <span className="text-xs text-gray-500">
//                                 {room.participants?.filter((id: string) => onlineUsers.includes(id)).length || 0} online
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col">
//           {selectedRoom ? (
//             <Card className="flex-1 flex flex-col">
//               {/* Chat Header */}
//               <CardHeader className="border-b">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className={`p-2 rounded-full ${
//                       selectedRoomData?.type === 'project' ? 'bg-blue-100 text-blue-600' :
//                       selectedRoomData?.type === 'department' ? 'bg-green-100 text-green-600' :
//                       'bg-purple-100 text-purple-600'
//                     }`}>
//                       {getRoomIcon(selectedRoomData?.type || 'private')}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">{selectedRoomData?.name}</h3>
//                       <p className="text-sm text-gray-600">
//                         {selectedRoomData?.participants?.length || 0} members
//                         <span className="mx-1">•</span>
//                         {selectedRoomData?.participants?.filter((id: string) => onlineUsers.includes(id)).length || 0} online
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Button variant="ghost" size="sm" disabled={!isConnected}>
//                       <Phone className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm" disabled={!isConnected}>
//                       <Video className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm">
//                       <MoreVertical className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>

//               {/* Messages Area */}
//               <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {roomMessages.length === 0 ? (
//                   <div className="flex items-center justify-center h-full">
//                     <div className="text-center">
//                       <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
//                       <p className="text-gray-600">Start the conversation!</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     {roomMessages.map((message, index) => {
//                       const isCurrentUser = message.sender === currentUser?.id;
//                       const showDate = index === 0 || 
//                         formatDate(message.timestamp) !== formatDate(roomMessages[index - 1].timestamp);
                      
//                       return (
//                         <div key={message.id || index}>
//                           {/* Date Separator */}
//                           {showDate && (
//                             <div className="flex items-center justify-center my-4">
//                               <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
//                                 {formatDate(message.timestamp)}
//                               </div>
//                             </div>
//                           )}
                          
//                           {/* Message */}
//                           <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
//                             <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
//                               isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
//                             }`}>
//                               <div className="relative">
//                                 <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
//                                   {getUserAvatar(message.sender)}
//                                 </div>
//                                 {isUserOnline(message.sender) && (
//                                   <Circle className="absolute -bottom-1 -right-1 h-3 w-3 text-green-500 fill-current border-2 border-white rounded-full" />
//                                 )}
//                               </div>
//                               <div>
//                                 <div className={`p-3 rounded-lg ${
//                                   isCurrentUser 
//                                     ? 'bg-blue-600 text-white' 
//                                     : 'bg-gray-100 text-gray-900'
//                                 }`}>
//                                   {!isCurrentUser && (
//                                     <p className="text-xs font-medium mb-1 text-gray-600">
//                                       {getUserName(message.sender)}
//                                     </p>
//                                   )}
//                                   <p className="text-sm">{message.message}</p>
//                                   {message.type === 'file' && message.fileName && (
//                                     <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-opacity-20">
//                                       <Paperclip className="h-3 w-3" />
//                                       <span className="text-xs">{message.fileName}</span>
//                                     </div>
//                                   )}
//                                 </div>
//                                 <p className={`text-xs text-gray-500 mt-1 ${
//                                   isCurrentUser ? 'text-right' : ''
//                                 }`}>
//                                   {formatTime(message.timestamp)}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
                    
//                     {/* Typing indicators */}
//                     {currentRoomTyping.length > 0 && (
//                       <div className="flex justify-start">
//                         <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
//                           <div className="flex space-x-1">
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                           </div>
//                           <span className="text-sm text-gray-600">
//                             {currentRoomTyping.length === 1 
//                               ? `${currentRoomTyping[0]} is typing...`
//                               : `${currentRoomTyping.length} people are typing...`
//                             }
//                           </span>
//                         </div>
//                       </div>
//                     )}
                    
//                     <div ref={messagesEndRef} />
//                   </>
//                 )}
//               </CardContent>

//               {/* Message Input */}
//               <div className="border-t p-4">
//                 <div className="flex items-center space-x-2">
//                   <Button variant="ghost" size="sm" disabled={!isConnected}>
//                     <Paperclip className="h-4 w-4" />
//                   </Button>
//                   <Input
//                     placeholder={isConnected ? "Type a message..." : "Connecting..."}
//                     value={messageText}
//                     onChange={(e) => handleTyping(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                     className="flex-1"
//                     disabled={!isConnected}
//                   />
//                   <Button 
//                     onClick={handleSendMessage} 
//                     disabled={!messageText.trim() || !isConnected}
//                   >
//                     <Send className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           ) : (
//             <Card className="flex-1 flex items-center justify-center">
//               <div className="text-center">
//                 <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
//                 <p className="text-gray-600">Choose a chat room to start messaging</p>
//               </div>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatSystem;