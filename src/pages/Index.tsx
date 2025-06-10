import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import LoginForm from '../components/LoginForm';
import ModernSidebar from '../components/ModernSidebar';
import ModernHeader from '../components/ModernHeader';
import DGDashboard from '../components/DGDashboard';
import CenterHeadDashboard from '../components/CenterHeadDashboard';
import EmployeeDashboard from '../components/EmployeeDashboard';
import Dashboard from '../components/Dashboard';
import ProjectManagement from '../components/ProjectManagement';
import CalendarPlanner from '../components/CalendarPlanner';
import HierarchicalChatSystem from '../components/HierarchicalChatSystem';
import ChatRoomManagement from '../components/ChatRoomManagement';
import Analytics from '../components/Analytics';
import Settings from '../components/Settings';
import KanbanBoard from '../components/KanbanBoard';
import Reports from '../components/Reports';
import TeamSkills from '../components/TeamSkills';
import TeamPage from '../components/TeamPage';
import ReportsPage from '../components/ReportsPage';

const Index: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'analytics': return 'Analytics & Reports';
      case 'projects': return 'Project Management';
      case 'kanban': return 'Kanban Board';
      case 'calendar': return 'Calendar & Planner';
      case 'team-skills': return 'Team Skills Matrix';
      case 'chat': return 'Communication Hub';
      case 'chat-management': return 'Chat Management';
      case 'reports': return 'Reports & Documentation';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const getDashboardComponent = () => {
    if (currentUser?.role === 'DG') {
      return <DGDashboard />;
    } else if (currentUser?.role === 'Center Head') {
      return <CenterHeadDashboard />;
    } else if (currentUser?.role === 'Project Engineer' || currentUser?.role === 'Project Assistant') {
      return <EmployeeDashboard />;
    } else {
      return <Dashboard />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return getDashboardComponent();
      case 'projects':
        return <ProjectManagement />;
      case 'kanban':
        return <KanbanBoard />;
      case 'team-skills':
        return <TeamPage />;
      case 'reports':
        return <ReportsPage />;
      case 'calendar':
        return <CalendarPlanner />;
      case 'chat':
        return <HierarchicalChatSystem />;
      case 'chat-management':
        return <ChatRoomManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return getDashboardComponent();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <ModernSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ModernHeader pageTitle={getPageTitle()} />
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
