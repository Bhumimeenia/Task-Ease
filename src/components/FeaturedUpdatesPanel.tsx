
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, BookOpen, FileText, Rocket } from 'lucide-react';

const FeaturedUpdatesPanel: React.FC = () => {
  const featuredUpdates = [
    {
      id: 1,
      category: 'Awards',
      icon: Award,
      title: 'Excellence Award 2024',
      description: 'C-DAC Mumbai wins National Innovation Award',
      contributor: 'Dr. Rajesh Kumar',
      date: '2024-01-15',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 2,
      category: 'Research',
      icon: BookOpen,
      title: 'AI Research Paper Published',
      description: 'Breakthrough in quantum computing algorithms',
      contributor: 'Dr. Priya Sharma',
      date: '2024-01-12',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 3,
      category: 'Patents',
      icon: FileText,
      title: 'New Patent Filed',
      description: 'Innovative IoT security framework',
      contributor: 'Team Alpha',
      date: '2024-01-10',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      category: 'Launches',
      icon: Rocket,
      title: 'Product Launch',
      description: 'Next-gen cloud platform released',
      contributor: 'Development Team',
      date: '2024-01-08',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const whatsNewItems = [
    {
      id: 1,
      title: 'Enhanced Dashboard Features',
      description: 'New analytics widgets and improved performance',
      date: '2024-01-15',
      type: 'feature'
    },
    {
      id: 2,
      title: 'Mobile App Update',
      description: 'Better offline support and sync capabilities',
      date: '2024-01-12',
      type: 'update'
    },
    {
      id: 3,
      title: 'Security Enhancement',
      description: 'Multi-factor authentication now available',
      date: '2024-01-10',
      type: 'security'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Featured Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-600" />
            <span>Featured Updates</span>
          </CardTitle>
          <CardDescription>Latest achievements and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featuredUpdates.slice(0, 3).map((update) => {
              const Icon = update.icon;
              return (
                <div key={update.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={update.color} variant="secondary">
                        {update.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{update.date}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm truncate">{update.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{update.description}</p>
                    <p className="text-xs text-gray-500 mt-1">by {update.contributor}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* What's New */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="h-5 w-5 text-blue-600" />
            <span>What's New</span>
          </CardTitle>
          <CardDescription>Latest platform updates and features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {whatsNewItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded transition-colors">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedUpdatesPanel;
