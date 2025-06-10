
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  Search,
  Filter,
  AlertTriangle
} from 'lucide-react';
import TaskRescheduleModal from './TaskRescheduleModal';

const TaskStatusDistribution: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const taskStats = [
    { name: 'Total', count: 1, color: 'bg-slate-700' },
    { name: 'In Progress', count: 0, color: 'bg-blue-600' },
    { name: 'Pending', count: 0, color: 'bg-yellow-600' },
    { name: 'Completed', count: 1, color: 'bg-slate-700' },
    { name: 'Overdue', count: 0, color: 'bg-red-600' },
    { name: 'Upcoming', count: 0, color: 'bg-green-600' }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Medical Image Dataset Preparation',
      description: 'Prepare and annotate medical imaging datasets for ML training',
      status: 'Completed',
      priority: 'Medium',
      dueDate: '5/25/2024',
      overlaps: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTaskAction = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Task Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Task Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {taskStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-full h-20 ${stat.color} rounded-lg mb-2 flex items-center justify-center text-white font-bold text-xl`}>
                  {stat.count}
                </div>
                <div className="text-sm font-medium">{stat.name}</div>
                <div className="text-xs text-gray-500">{stat.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Tasks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Tasks</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            {['All Tasks', 'In Progress', 'Pending', 'Completed', 'Overdue'].map((tab) => (
              <Button key={tab} variant={tab === 'All Tasks' ? 'default' : 'outline'} size="sm">
                {tab}
              </Button>
            ))}
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <h4 className="font-semibold text-blue-600">{task.title}</h4>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Due: {task.dueDate}</span>
                      <span>{task.priority} Priority</span>
                      <span>Overlaps with {task.overlaps} tasks</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTaskAction(task)}
                  >
                    Options
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Button variant="link" className="text-blue-600">
              View All Tasks
            </Button>
          </div>
        </CardContent>
      </Card>

      <TaskRescheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskStatusDistribution;
