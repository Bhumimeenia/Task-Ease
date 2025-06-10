
// Dummy data for offline demonstration
export interface User {
  id: string;
  name: string;
  role: 'DG' | 'Center Head' | 'HOD' | 'Project Coordinator' | 'Project Manager' | 'Project Engineer' | 'Project Assistant';
  email: string;
  center?: string;
  department?: string;
  avatar: string;
  reportsTo?: string; // ID of immediate supervisor
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Completed' | 'Delayed' | 'Pending';
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string[];
  manager: string;
  deadline: string;
  progress: number;
  category: 'Business' | 'Funded' | 'Research';
  center: string;
  department: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'To Do' | 'In Progress' | 'Completed' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  completedDate?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'meeting' | 'leave' | 'tour' | 'ltc' | 'training' | 'conference' | 'medical' | 'holiday' | 'travel' | 'deadline';
  date: string;
  endDate?: string;
  time?: string;
  duration?: string;
  attendees?: string[];
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  assignedTo?: string;
  createdBy: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'text' | 'file';
  fileName?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'project' | 'department' | 'private';
  participants: string[];
  lastMessage?: string;
  lastActivity: string;
  projectId?: string;
}

// C-DAC Centers across India
export const cdacCenters = [
  'Pune', 'Mumbai', 'Bangalore', 'Chennai', 'Delhi', 'Kolkata', 
  'Patna', 'Mohali', 'Noida', 'Hyderabad', 'Thiruvananthapuram', 'Silchar'
];

// Dummy Users with proper C-DAC hierarchy
export const users: User[] = [
  // Director General
  { id: '1', name: 'Dr. Rajesh Kumar', role: 'DG', email: 'dg@cdac.in', avatar: '👨‍💼' },
  
  // Center Heads (report to DG)
  { id: '2', name: 'Dr. Priya Sharma', role: 'Center Head', email: 'priya.sharma@cdac.in', center: 'Pune', avatar: '👩‍💼', reportsTo: '1' },
  { id: '3', name: 'Dr. Amit Singh', role: 'Center Head', email: 'amit.singh@cdac.in', center: 'Mumbai', avatar: '👨‍💻', reportsTo: '1' },
  { id: '4', name: 'Dr. Sneha Patel', role: 'Center Head', email: 'sneha.patel@cdac.in', center: 'Bangalore', avatar: '👩‍💻', reportsTo: '1' },
  { id: '5', name: 'Dr. Rahul Gupta', role: 'Center Head', email: 'rahul.gupta@cdac.in', center: 'Chennai', avatar: '👨‍🔬', reportsTo: '1' },
  
  // HODs (report to Center Heads)
  { id: '6', name: 'Kavya Reddy', role: 'HOD', email: 'kavya.reddy@cdac.in', center: 'Pune', department: 'Advanced Computing', avatar: '👩‍🔬', reportsTo: '2' },
  { id: '7', name: 'Ravi Kumar', role: 'HOD', email: 'ravi.kumar@cdac.in', center: 'Pune', department: 'High Performance Computing', avatar: '👨‍💼', reportsTo: '2' },
  { id: '8', name: 'Meera Joshi', role: 'HOD', email: 'meera.joshi@cdac.in', center: 'Mumbai', department: 'Cybersecurity', avatar: '👩‍💻', reportsTo: '3' },
  { id: '9', name: 'Arjun Nair', role: 'HOD', email: 'arjun.nair@cdac.in', center: 'Bangalore', department: 'AI & Machine Learning', avatar: '👨‍🔬', reportsTo: '4' },
  
  // Project Coordinators/Managers (report to HODs)
  { id: '10', name: 'Anita Desai', role: 'Project Coordinator', email: 'anita.desai@cdac.in', center: 'Pune', department: 'Advanced Computing', avatar: '👩‍💼', reportsTo: '6' },
  { id: '11', name: 'Suresh Pillai', role: 'Project Manager', email: 'suresh.pillai@cdac.in', center: 'Pune', department: 'High Performance Computing', avatar: '👨‍💻', reportsTo: '7' },
  { id: '12', name: 'Deepika Shah', role: 'Project Coordinator', email: 'deepika.shah@cdac.in', center: 'Mumbai', department: 'Cybersecurity', avatar: '👩‍🔬', reportsTo: '8' },
  { id: '13', name: 'Vikram Singh', role: 'Project Manager', email: 'vikram.singh@cdac.in', center: 'Bangalore', department: 'AI & Machine Learning', avatar: '👨‍💼', reportsTo: '9' },
  
  // Project Engineers/Assistants (report to Coordinators/Managers)
  { id: '14', name: 'Pooja Rao', role: 'Project Engineer', email: 'pooja.rao@cdac.in', center: 'Pune', department: 'Advanced Computing', avatar: '👩‍💻', reportsTo: '10' },
  { id: '15', name: 'Rajesh Iyer', role: 'Project Assistant', email: 'rajesh.iyer@cdac.in', center: 'Pune', department: 'Advanced Computing', avatar: '👨‍🔬', reportsTo: '10' },
  { id: '16', name: 'Neha Agarwal', role: 'Project Engineer', email: 'neha.agarwal@cdac.in', center: 'Pune', department: 'High Performance Computing', avatar: '👩‍💼', reportsTo: '11' },
  { id: '17', name: 'Kiran Patil', role: 'Project Assistant', email: 'kiran.patil@cdac.in', center: 'Mumbai', department: 'Cybersecurity', avatar: '👨‍💻', reportsTo: '12' },
  { id: '18', name: 'Sanjay Reddy', role: 'Project Engineer', email: 'sanjay.reddy@cdac.in', center: 'Bangalore', department: 'AI & Machine Learning', avatar: '👨‍🔬', reportsTo: '13' }
];

// Dummy Projects across C-DAC centers
export const projects: Project[] = [
  {
    id: 'p1',
    title: 'National Supercomputing Mission',
    description: 'High-performance computing infrastructure development',
    status: 'Active',
    priority: 'High',
    assignedTo: ['14', '15', '16'],
    manager: '11',
    deadline: '2024-12-15',
    progress: 75,
    category: 'Funded',
    center: 'Pune',
    department: 'High Performance Computing'
  },
  {
    id: 'p2',
    title: 'Cybersecurity Framework for Banking',
    description: 'Advanced cybersecurity solutions for financial sector',
    status: 'Active',
    priority: 'High',
    assignedTo: ['17'],
    manager: '12',
    deadline: '2024-08-20',
    progress: 60,
    category: 'Business',
    center: 'Mumbai',
    department: 'Cybersecurity'
  },
  {
    id: 'p3',
    title: 'AI-based Healthcare Diagnostics',
    description: 'Machine learning models for medical image analysis',
    status: 'Active',
    priority: 'Medium',
    assignedTo: ['18'],
    manager: '13',
    deadline: '2024-10-30',
    progress: 45,
    category: 'Research',
    center: 'Bangalore',
    department: 'AI & Machine Learning'
  },
  {
    id: 'p4',
    title: 'Digital India e-Governance Platform',
    description: 'Scalable e-governance solutions for state governments',
    status: 'Completed',
    priority: 'High',
    assignedTo: ['14'],
    manager: '10',
    deadline: '2024-05-30',
    progress: 100,
    category: 'Funded',
    center: 'Pune',
    department: 'Advanced Computing'
  },
  {
    id: 'p5',
    title: 'Quantum Computing Research',
    description: 'Fundamental research in quantum algorithms',
    status: 'Active',
    priority: 'Low',
    assignedTo: ['15'],
    manager: '10',
    deadline: '2025-03-15',
    progress: 25,
    category: 'Research',
    center: 'Pune',
    department: 'Advanced Computing'
  }
];

// Dummy Tasks
export const tasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Cluster Configuration Setup',
    description: 'Configure high-performance computing cluster nodes',
    assignedTo: '14',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-06-15'
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Performance Benchmarking',
    description: 'Run performance tests on supercomputing infrastructure',
    assignedTo: '16',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '2024-06-20'
  },
  {
    id: 't3',
    projectId: 'p2',
    title: 'Security Audit Implementation',
    description: 'Implement security audit framework for banking systems',
    assignedTo: '17',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-06-10'
  },
  {
    id: 't4',
    projectId: 'p3',
    title: 'Medical Image Dataset Preparation',
    description: 'Prepare and annotate medical imaging datasets for ML training',
    assignedTo: '18',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2024-05-25',
    completedDate: '2024-05-20'
  },
  {
    id: 't5',
    projectId: 'p5',
    title: 'Quantum Algorithm Documentation',
    description: 'Document quantum computing algorithms and implementations',
    assignedTo: '15',
    status: 'Overdue',
    priority: 'Low',
    dueDate: '2024-05-30'
  }
];

// Dummy Calendar Events
export const calendarEvents: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Monthly Review Meeting - Pune Center',
    type: 'meeting',
    date: '2024-06-15',
    time: '10:00 AM',
    duration: '2 hours',
    attendees: ['2', '6', '7', '10', '11'],
    status: 'approved',
    requestedBy: '2',
    createdBy: '2'
  },
  {
    id: 'e2',
    title: 'All Center Heads Meeting',
    type: 'meeting',
    date: '2024-06-20',
    time: '2:00 PM',
    duration: '1.5 hours',
    attendees: ['1', '2', '3', '4', '5'],
    status: 'approved',
    requestedBy: '1',
    createdBy: '1'
  },
  {
    id: 'e3',
    title: 'Independence Day',
    type: 'holiday',
    date: '2024-08-15',
    status: 'approved',
    requestedBy: '1',
    createdBy: '1'
  },
  {
    id: 'e4',
    title: 'Annual Leave',
    type: 'leave',
    date: '2024-07-10',
    endDate: '2024-07-15',
    status: 'pending',
    requestedBy: '14',
    createdBy: '14',
    assignedTo: '14'
  },
  {
    id: 'e5',
    title: 'Technical Training - AI/ML',
    type: 'training',
    date: '2024-07-25',
    endDate: '2024-07-27',
    status: 'approved',
    requestedBy: '9',
    createdBy: '9'
  },
  {
    id: 'e6',
    title: 'Official Tour - Ministry Meeting',
    type: 'tour',
    date: '2024-06-28',
    endDate: '2024-06-30',
    status: 'approved',
    requestedBy: '1',
    createdBy: '1'
  },
  {
    id: 'e7',
    title: 'LTC - Family Vacation',
    type: 'ltc',
    date: '2024-08-05',
    endDate: '2024-08-12',
    status: 'pending',
    requestedBy: '6',
    createdBy: '6',
    assignedTo: '6'
  }
];

// Dummy Chat Rooms
export const chatRooms: ChatRoom[] = [
  {
    id: 'r1',
    name: 'Supercomputing Project Team',
    type: 'project',
    participants: ['11', '14', '15', '16'],
    lastMessage: 'Cluster setup is progressing well',
    lastActivity: '2024-06-14T15:30:00Z',
    projectId: 'p1'
  },
  {
    id: 'r2',
    name: 'Pune Center - Advanced Computing',
    type: 'department',
    participants: ['6', '10', '14', '15'],
    lastMessage: 'New project proposal submitted',
    lastActivity: '2024-06-14T14:20:00Z'
  },
  {
    id: 'r3',
    name: 'Center Heads Discussion',
    type: 'private',
    participants: ['1', '2', '3', '4', '5'],
    lastMessage: 'Quarterly targets discussion',
    lastActivity: '2024-06-14T16:45:00Z'
  }
];

// Dummy Chat Messages
export const chatMessages: ChatMessage[] = [
  {
    id: 'm1',
    roomId: 'r1',
    sender: '14',
    message: 'Cluster setup is progressing well. Should be ready for testing by next week.',
    timestamp: '2024-06-14T15:30:00Z',
    type: 'text'
  },
  {
    id: 'm2',
    roomId: 'r1',
    sender: '11',
    message: 'Excellent! Please coordinate with the testing team for the benchmarks.',
    timestamp: '2024-06-14T15:32:00Z',
    type: 'text'
  },
  {
    id: 'm3',
    roomId: 'r2',
    sender: '6',
    message: 'New project proposal has been submitted to the center head for review.',
    timestamp: '2024-06-14T14:20:00Z',
    type: 'text'
  },
  {
    id: 'm4',
    roomId: 'r3',
    sender: '1',
    message: 'Let\'s review the quarterly targets and plan for the next phase.',
    timestamp: '2024-06-14T16:45:00Z',
    type: 'text'
  }
];

// Analytics Data
export const analyticsData = {
  projectStats: {
    total: 45,
    active: 32,
    completed: 11,
    delayed: 2
  },
  taskStats: {
    total: 124,
    completed: 89,
    pending: 25,
    overdue: 10
  },
  centerEfficiency: [
    { name: 'Pune', efficiency: 92, projects: 15 },
    { name: 'Mumbai', efficiency: 88, projects: 12 },
    { name: 'Bangalore', efficiency: 85, projects: 10 },
    { name: 'Chennai', efficiency: 78, projects: 8 }
  ],
  departmentEfficiency: [
    { name: 'Advanced Computing', efficiency: 92 },
    { name: 'High Performance Computing', efficiency: 90 },
    { name: 'Cybersecurity', efficiency: 88 },
    { name: 'AI & Machine Learning', efficiency: 85 }
  ],
  monthlyProgress: [
    { month: 'Jan', completed: 24, total: 28 },
    { month: 'Feb', completed: 18, total: 22 },
    { month: 'Mar', completed: 32, total: 35 },
    { month: 'Apr', completed: 28, total: 30 },
    { month: 'May', completed: 22, total: 26 },
    { month: 'Jun', completed: 15, total: 24 }
  ]
};
