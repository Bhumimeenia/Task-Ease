// // contexts/SocketContext.tsx
// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { useAuth } from './AuthContext';

// interface SocketContextType {
//   socket: Socket | null;
//   isConnected: boolean;
//   onlineUsers: string[];
//   joinRoom: (roomId: string) => void;
//   leaveRoom: (roomId: string) => void;
//   sendMessage: (roomId: string, message: string, type?: string, fileName?: string) => void;
//   createRoom: (roomData: any) => void;
//   deleteRoom: (roomId: string) => void;
// }

// const SocketContext = createContext<SocketContextType | undefined>(undefined);

// interface SocketProviderProps {
//   children: ReactNode;
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     if (currentUser) {
//       // Initialize socket connection
//       const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001', {
//         auth: {
//           userId: currentUser.id,
//           name: currentUser.name,
//           role: currentUser.role,
//           department: currentUser.department,
//           center: currentUser.center
//         }
//       });

//       // Connection event handlers
//       newSocket.on('connect', () => {
//         console.log('Connected to server');
//         setIsConnected(true);
//       });

//       newSocket.on('disconnect', () => {
//         console.log('Disconnected from server');
//         setIsConnected(false);
//       });

//       // Online users management
//       newSocket.on('users_online', (users: string[]) => {
//         setOnlineUsers(users);
//       });

//       newSocket.on('user_joined', (userId: string) => {
//         setOnlineUsers(prev => [...prev, userId]);
//       });

//       newSocket.on('user_left', (userId: string) => {
//         setOnlineUsers(prev => prev.filter(id => id !== userId));
//       });

//       // Error handling
//       newSocket.on('error', (error: string) => {
//         console.error('Socket error:', error);
//       });

//       setSocket(newSocket);

//       return () => {
//         newSocket.close();
//       };
//     }
//   }, [currentUser]);

//   const joinRoom = (roomId: string) => {
//     if (socket) {
//       socket.emit('join_room', roomId);
//     }
//   };

//   const leaveRoom = (roomId: string) => {
//     if (socket) {
//       socket.emit('leave_room', roomId);
//     }
//   };

//   const sendMessage = (roomId: string, message: string, type: string = 'text', fileName?: string) => {
//     if (socket && currentUser) {
//       const messageData = {
//         roomId,
//         message,
//         type,
//         fileName,
//         sender: currentUser.id,
//         timestamp: new Date().toISOString()
//       };
//       socket.emit('send_message', messageData);
//     }
//   };

//   const createRoom = (roomData: any) => {
//     if (socket && currentUser) {
//       const roomPayload = {
//         ...roomData,
//         createdBy: currentUser.id,
//         createdAt: new Date().toISOString()
//       };
//       socket.emit('create_room', roomPayload);
//     }
//   };

//   const deleteRoom = (roomId: string) => {
//     if (socket) {
//       socket.emit('delete_room', roomId);
//     }
//   };

//   const value: SocketContextType = {
//     socket,
//     isConnected,
//     onlineUsers,
//     joinRoom,
//     leaveRoom,
//     sendMessage,
//     createRoom,
//     deleteRoom
//   };

//   return (
//     <SocketContext.Provider value={value}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = (): SocketContextType => {
//   const context = useContext(SocketContext);
//   if (context === undefined) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };

// // Custom hook for chat-specific socket events
// export const useChatSocket = () => {
//   const { socket } = useSocket();
//   const [messages, setMessages] = useState<any[]>([]);
//   const [rooms, setRooms] = useState<any[]>([]);

//   useEffect(() => {
//     if (!socket) return;

//     // Message events
//     socket.on('new_message', (message: any) => {
//       setMessages(prev => [...prev, message]);
//     });

//     socket.on('message_history', (messageHistory: any[]) => {
//       setMessages(messageHistory);
//     });

//     // Room events
//     socket.on('room_created', (room: any) => {
//       setRooms(prev => [...prev, room]);
//     });

//     socket.on('room_updated', (updatedRoom: any) => {
//       setRooms(prev => prev.map(room => 
//         room.id === updatedRoom.id ? updatedRoom : room
//       ));
//     });

//     socket.on('room_deleted', (roomId: string) => {
//       setRooms(prev => prev.filter(room => room.id !== roomId));
//     });

//     socket.on('rooms_list', (roomsList: any[]) => {
//       setRooms(roomsList);
//     });

//     // Typing indicators
//     socket.on('user_typing', (data: { userId: string; roomId: string; isTyping: boolean }) => {
//       // Handle typing indicators
//       console.log('User typing:', data);
//     });

//     // Cleanup
//     return () => {
//       socket.off('new_message');
//       socket.off('message_history');
//       socket.off('room_created');
//       socket.off('room_updated');
//       socket.off('room_deleted');
//       socket.off('rooms_list');
//       socket.off('user_typing');
//     };
//   }, [socket]);

//   const sendTypingIndicator = (roomId: string, isTyping: boolean) => {
//     if (socket) {
//       socket.emit('typing', { roomId, isTyping });
//     }
//   };

//   return {
//     messages,
//     rooms,
//     sendTypingIndicator,
//     setMessages,
//     setRooms
//   };
// };