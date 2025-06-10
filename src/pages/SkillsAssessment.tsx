
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Award, Target, TrendingUp, Star, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const SkillsAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);

  const skillAssessments = [
    {
      id: 'translation',
      title: 'Translation Skills',
      description: 'Assess your proficiency in translation techniques and language skills',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      topics: ['Hindi Translation', 'Technical Documentation', 'Cultural Adaptation', 'Grammar & Syntax'],
      completionRate: 0,
      status: 'Available'
    },
    {
      id: 'cat-tools',
      title: 'CAT Tools Proficiency',
      description: 'Evaluate your expertise with Computer-Assisted Translation tools',
      duration: '30 minutes',
      difficulty: 'Advanced',
      topics: ['SDL Trados', 'MemoQ', 'Wordfast', 'Translation Memory'],
      completionRate: 75,
      status: 'In Progress'
    },
    {
      id: 'quality-assurance',
      title: 'Quality Assurance',
      description: 'Test your knowledge of QA processes and quality standards',
      duration: '35 minutes',
      difficulty: 'Intermediate',
      topics: ['Error Detection', 'Review Processes', 'Quality Metrics', 'Standards Compliance'],
      completionRate: 100,
      status: 'Completed'
    },
    {
      id: 'project-management',
      title: 'Project Management',
      description: 'Assess your project coordination and management capabilities',
      duration: '40 minutes',
      difficulty: 'Advanced',
      topics: ['Resource Planning', 'Timeline Management', 'Team Coordination', 'Client Communication'],
      completionRate: 0,
      status: 'Available'
    },
    {
      id: 'localization',
      title: 'Localization Expertise',
      description: 'Evaluate your understanding of localization processes and cultural adaptation',
      duration: '50 minutes',
      difficulty: 'Expert',
      topics: ['Cultural Adaptation', 'UI/UX Localization', 'Market Research', 'Regional Compliance'],
      completionRate: 0,
      status: 'Available'
    },
    {
      id: 'technical-writing',
      title: 'Technical Writing',
      description: 'Test your technical documentation and writing skills',
      duration: '25 minutes',
      difficulty: 'Beginner',
      topics: ['Documentation Standards', 'API Documentation', 'User Manuals', 'Style Guides'],
      completionRate: 60,
      status: 'In Progress'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getOverallStats = () => {
    const completed = skillAssessments.filter(a => a.status === 'Completed').length;
    const inProgress = skillAssessments.filter(a => a.status === 'In Progress').length;
    const available = skillAssessments.filter(a => a.status === 'Available').length;
    const avgCompletion = Math.round(skillAssessments.reduce((sum, a) => sum + a.completionRate, 0) / skillAssessments.length);
    
    return { completed, inProgress, available, avgCompletion };
  };

  const stats = getOverallStats();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 p-6 space-y-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Skills Assessment</h1>
              <p className="text-gray-600 mt-1">Take skill assessments to showcase your expertise and identify areas for improvement</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
              <Award className="h-8 w-8 text-green-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
              <Clock className="h-8 w-8 text-yellow-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.available}</div>
              <div className="text-sm text-gray-600">Available</div>
              <Target className="h-8 w-8 text-blue-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.avgCompletion}%</div>
              <div className="text-sm text-gray-600">Avg Progress</div>
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillAssessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{assessment.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{assessment.description}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Badge className={`${getDifficultyColor(assessment.difficulty)} border text-xs`}>
                      {assessment.difficulty}
                    </Badge>
                    <Badge className={`${getStatusColor(assessment.status)} border text-xs`}>
                      {assessment.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{assessment.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{assessment.topics.length} topics</span>
                    </div>
                  </div>

                  {assessment.completionRate > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">{assessment.completionRate}%</span>
                      </div>
                      <Progress value={assessment.completionRate} className="h-2" />
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {assessment.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    variant={assessment.status === 'Completed' ? 'outline' : 'default'}
                    onClick={() => setSelectedAssessment(assessment.id)}
                  >
                    {assessment.status === 'Available' && 'Start Assessment'}
                    {assessment.status === 'In Progress' && 'Continue Assessment'}
                    {assessment.status === 'Completed' && 'View Results'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Recommended Assessments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Translation Skills Assessment</p>
                  <p className="text-sm text-blue-700">Complete this assessment to validate your core translation abilities</p>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Start Now
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Project Management Assessment</p>
                  <p className="text-sm text-green-700">Enhance your career prospects with project management skills</p>
                </div>
                <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default SkillsAssessment;
