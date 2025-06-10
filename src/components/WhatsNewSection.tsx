
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  FileText, 
  Lightbulb, 
  Rocket,
  Plus,
  Calendar,
  User,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface Update {
  id: number;
  title: string;
  description: string;
  category: 'awards' | 'publications' | 'patents' | 'launches';
  contributor: string;
  date: string;
  link?: string;
  featured?: boolean;
}

const WhatsNewSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const updates: Update[] = [
    {
      id: 1,
      title: 'Excellence Award in AI Research',
      description: 'C-DAC Pune team received national recognition for breakthrough in machine learning algorithms.',
      category: 'awards',
      contributor: 'Dr. Rajesh Kumar',
      date: '2024-01-15',
      link: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Quantum Computing Research Paper',
      description: 'Published in Nature Computing: "Novel Quantum Algorithms for Optimization Problems"',
      category: 'publications',
      contributor: 'Dr. Priya Sharma',
      date: '2024-01-12',
      link: '#',
      featured: true
    },
    {
      id: 3,
      title: 'AI-Based Security Patent Granted',
      description: 'Patent approved for innovative cybersecurity framework using artificial intelligence.',
      category: 'patents',
      contributor: 'Security Team',
      date: '2024-01-10',
      link: '#',
      featured: true
    },
    {
      id: 4,
      title: 'New Project Management Module',
      description: 'Enhanced task tracking and collaboration features now available in the portal.',
      category: 'launches',
      contributor: 'Development Team',
      date: '2024-01-08',
      link: '#'
    },
    {
      id: 5,
      title: 'IEEE Conference Best Paper',
      description: 'Research on distributed computing architectures wins best paper award.',
      category: 'awards',
      contributor: 'Dr. Ankit Verma',
      date: '2024-01-05',
      link: '#'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Updates', icon: FileText, color: 'bg-gray-100 text-gray-800' },
    { id: 'awards', label: 'Awards', icon: Award, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'publications', label: 'Publications', icon: FileText, color: 'bg-blue-100 text-blue-800' },
    { id: 'patents', label: 'Patents', icon: Lightbulb, color: 'bg-green-100 text-green-800' },
    { id: 'launches', label: 'Launches', icon: Rocket, color: 'bg-purple-100 text-purple-800' }
  ];

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    const Icon = categoryData?.icon || FileText;
    return <Icon className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData?.color || 'bg-gray-100 text-gray-800';
  };

  const filteredUpdates = selectedCategory === 'all' 
    ? updates 
    : updates.filter(update => update.category === selectedCategory);

  const featuredUpdates = updates.filter(update => update.featured).slice(0, 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredUpdates.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredUpdates.length) % featuredUpdates.length);
  };

  return (
    <div className="space-y-6">
      {/* Featured Updates Carousel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-purple-600" />
              <span>Featured Updates</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={prevSlide}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={nextSlide}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {featuredUpdates.length > 0 && (
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredUpdates.map((update) => (
                  <div key={update.id} className="w-full flex-shrink-0">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={getCategoryColor(update.category)} variant="secondary">
                          {getCategoryIcon(update.category)}
                          <span className="ml-1 capitalize">{update.category}</span>
                        </Badge>
                        <span className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{update.title}</h3>
                      <p className="text-gray-600 mb-3">{update.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          <span>{update.contributor}</span>
                        </div>
                        {update.link && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {featuredUpdates.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Updates with Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>What's New</CardTitle>
            <Button size="sm" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Update</span>
            </Button>
          </div>
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  size="sm"
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </Button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredUpdates.map((update) => (
              <div key={update.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(update.category)} variant="secondary">
                      {getCategoryIcon(update.category)}
                      <span className="ml-1 capitalize">{update.category}</span>
                    </Badge>
                    {update.featured && (
                      <Badge variant="destructive">Featured</Badge>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{update.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{update.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{update.contributor}</span>
                  </div>
                  {update.link && (
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsNewSection;
