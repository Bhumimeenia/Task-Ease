
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';

interface TaskStatusChartProps {
  taskStatusCounts: {
    [key: string]: number;
  };
}

const TaskStatusChart: React.FC<TaskStatusChartProps> = ({ taskStatusCounts }) => {
  const maxCount = Math.max(...Object.values(taskStatusCounts));
  
  const statusColors = {
    'Completed': { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-700' },
    'In Progress': { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-700' },
    'Pending': { bg: 'bg-gray-500', light: 'bg-gray-100', text: 'text-gray-700' },
    'Overdue': { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-700' },
    'On Hold': { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-700' },
    'Total': { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-700' }
  };

  const getRandomHeight = () => Math.random() * 20 + 10; // Animation effect

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <span>Task Status Distribution</span>
          <TrendingUp className="h-4 w-4 text-green-500 ml-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Object.entries(taskStatusCounts).map(([status, count]) => {
            const colors = statusColors[status as keyof typeof statusColors] || statusColors.Total;
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
            
            return (
              <div key={status} className="text-center group cursor-pointer transition-transform hover:scale-105">
                <div className="relative mb-3">
                  {/* Background bar */}
                  <div className={`w-12 h-24 mx-auto rounded-lg ${colors.light} opacity-30`} />
                  
                  {/* Animated progress bar */}
                  <div 
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 rounded-lg ${colors.bg} transition-all duration-1000 ease-out shadow-lg`}
                    style={{
                      height: `${Math.max(8, percentage * 0.24 * 100)}px`, // Convert to px with minimum height
                      animation: 'slideUp 1s ease-out'
                    }}
                  />
                  
                  {/* Count badge */}
                  <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {count}
                  </div>
                </div>
                
                {/* Status label */}
                <div className="space-y-1">
                  <p className={`text-sm font-semibold ${colors.text}`}>{status}</p>
                  <p className="text-xs text-gray-500">{percentage.toFixed(0)}%</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Chart Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(statusColors).map(([status, colors]) => (
              <div key={status} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
                <span className="text-xs text-gray-600">{status}</span>
              </div>
            ))}
          </div>
        </div>
        
        <style>
          {`
            @keyframes slideUp {
              from {
                height: 0;
                opacity: 0;
              }
              to {
                height: var(--final-height);
                opacity: 1;
              }
            }
          `}
        </style>
      </CardContent>
    </Card>
  );
};

export default TaskStatusChart;
