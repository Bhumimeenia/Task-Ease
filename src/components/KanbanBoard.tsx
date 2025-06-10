import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Clock, CheckCircle, AlertTriangle, User } from 'lucide-react';
import { tasks, users } from '../data/dummyData';

interface KanbanColumn {
  id: string;
  title: string;
  status: string;
  color: string;
  icon: React.ReactNode;
}

const KanbanBoard: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const columns: KanbanColumn[] = [
    { id: 'todo', title: 'To Do', status: 'To Do', color: 'bg-gray-100', icon: <Clock className="h-4 w-4" /> },
    { id: 'inprogress', title: 'In Progress', status: 'In Progress', color: 'bg-blue-100', icon: <Clock className="h-4 w-4 text-blue-600" /> },
    { id: 'review', title: 'Under Review', status: 'Under Review', color: 'bg-yellow-100', icon: <AlertTriangle className="h-4 w-4 text-yellow-600" /> },
    { id: 'completed', title: 'Completed', status: 'Completed', color: 'bg-green-100', icon: <CheckCircle className="h-4 w-4 text-green-600" /> }
  ];

  const getUserTasks = () => {
    if (!currentUser) return [];
    
    switch (currentUser.role) {
      case 'DG':
        return tasks;
      case 'Center Head':
        return tasks.filter(task => {
          const assignedUser = users.find(u => u.id === task.assignedTo);
          return assignedUser?.center === currentUser.center;
        });
      case 'HOD':
        return tasks.filter(task => {
          const assignedUser = users.find(u => u.id === task.assignedTo);
          return assignedUser?.department === currentUser.department;
        });
      case 'Project Manager':
      case 'Project Coordinator':
        return tasks.filter(task => {
          // For now, we'll show all tasks - in a real app, you'd filter by project manager
          return true;
        });
      case 'Project Engineer':
      case 'Project Assistant':
        return tasks.filter(task => task.assignedTo === currentUser.id);
      default:
        return [];
    }
  };

  const getTasksByStatus = (status: string) => {
    return getUserTasks().filter(task => task.status === status);
  };

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown User';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    console.log(`Updating task ${taskId} to status: ${newStatus}`);
    // In a real app, this would update the task status
  };

  const getTaskProgress = (task: any) => {
    // Calculate progress based on status
    switch (task.status) {
      case 'To Do': return 0;
      case 'In Progress': return 50;
      case 'Under Review': return 80;
      case 'Completed': return 100;
      default: return 0;
    }
  };

  return (
    <div className="p-6 h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Management - Kanban Board</h1>
          <p className="text-gray-600">Manage and track task progress</p>
        </div>
        {(currentUser?.role === 'Project Manager' || currentUser?.role === 'Project Coordinator' || currentUser?.role === 'HOD') && (
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);
          
          return (
            <div key={column.id} className="flex flex-col">
              <div className={`p-4 rounded-t-lg border-b-2 ${column.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {column.icon}
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  </div>
                  <Badge variant="secondary" className="bg-white">
                    {columnTasks.length}
                  </Badge>
                </div>
              </div>
              
              <div className="flex-1 bg-gray-50 p-4 space-y-4 overflow-y-auto">
                {columnTasks.map((task) => {
                  const progress = getTaskProgress(task);
                  
                  return (
                    <Card 
                      key={task.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow bg-white"
                      onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-sm font-medium line-clamp-2">
                            {task.title}
                          </CardTitle>
                          <Badge className={getPriorityColor(task.priority)} variant="secondary">
                            {task.priority}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {task.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-1" />
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{getUserName(task.assignedTo)}</span>
                            </div>
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>

                          {selectedTask === task.id && (
                            <div className="mt-3 pt-3 border-t space-y-2">
                              <div className="flex flex-wrap gap-1">
                                {columns.map((col) => (
                                  <Button
                                    key={col.id}
                                    size="sm"
                                    variant={task.status === col.status ? "default" : "outline"}
                                    className="text-xs h-6"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateTaskStatus(task.id, col.status);
                                    }}
                                  >
                                    {col.title}
                                  </Button>
                                ))}
                              </div>
                              <div className="text-xs text-gray-500">
                                <p>Project: {task.projectId}</p>
                                <p>Created: {new Date().toLocaleDateString()}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
