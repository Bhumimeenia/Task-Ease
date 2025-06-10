import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Grid3X3,
  Users,
  MessageSquare,
  FileText,
  Settings,
  Building2,
  ChevronLeft
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

interface ModernSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentUser, logout } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const navItems = {
    main: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'calendar', label: 'Calendar & Planner', icon: Calendar },
      { id: 'kanban', label: 'Kanban Board', icon: Grid3X3 },
      { id: 'team-skills', label: 'Team Skills', icon: Users }
    ],
    communication: [
      { id: 'chat', label: 'Chat', icon: MessageSquare },
      ...(currentUser?.role === 'DG' || currentUser?.role === 'Center Head' || currentUser?.role === 'HOD'
        ? [{ id: 'chat-management', label: 'Chat Management', icon: Users }]
        : [])
    ],
    management: [
      { id: 'projects', label: 'Projects', icon: FileText },
      { id: 'reports', label: 'Reports', icon: FileText }
    ],
    system: [
      { id: 'settings', label: 'Settings', icon: Settings }
    ]
  };

  const getButtonClass = (itemId: string) =>
    activeTab === itemId
      ? 'w-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
      : 'w-full text-gray-700 hover:bg-gray-50';

  const renderNavGroup = (label: string, items: any[]) => (
    <SidebarGroup>
      <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ id, label, icon: Icon }) => (
            <SidebarMenuItem key={id}>
              <SidebarMenuButton asChild className={getButtonClass(id)}>
                <button
                  onClick={() => setActiveTab(id)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors"
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium truncate">{label}</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar
      className={`border-r border-gray-200 bg-white ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}
      collapsible="icon"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Building2 className="h-8 w-8 text-blue-600 flex-shrink-0" />
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900 truncate">C-DAC Portal</h1>
              <p className="text-sm text-gray-500 truncate">Project Management</p>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && currentUser && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">{currentUser.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-sm text-gray-500 truncate">{currentUser.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Groups */}
      <SidebarContent className="p-2">
        {renderNavGroup('Main', navItems.main)}
        {renderNavGroup('Communication', navItems.communication)}
        {renderNavGroup('Management', navItems.management)}
        {renderNavGroup('System', navItems.system)}
      </SidebarContent>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 mt-auto">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      )}
    </Sidebar>
  );
};

export default ModernSidebar;
