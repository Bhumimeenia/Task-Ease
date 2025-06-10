
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, TrendingUp, Target, Star, Award, Calendar, FileText, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const PerformanceReview: React.FC = () => {
  const navigate = useNavigate();

  const performanceData = {
    overallRating: 4.2,
    currentPeriod: 'Q1 2025',
    reviewDate: '2025-03-15',
    nextReview: '2025-06-15',
    categories: [
      {
        name: 'Translation Quality',
        score: 4.5,
        maxScore: 5,
        feedback: 'Excellent attention to detail and cultural nuances',
        improvement: 'Continue developing specialized terminology knowledge'
      },
      {
        name: 'Productivity',
        score: 4.0,
        maxScore: 5,
        feedback: 'Consistently meets deadlines and maintains high output',
        improvement: 'Focus on time management for complex projects'
      },
      {
        name: 'Team Collaboration',
        score: 4.3,
        maxScore: 5,
        feedback: 'Great team player, actively shares knowledge',
        improvement: 'Take on more mentoring responsibilities'
      },
      {
        name: 'Technical Skills',
        score: 3.8,
        maxScore: 5,
        feedback: 'Good proficiency with CAT tools',
        improvement: 'Explore advanced features and automation'
      },
      {
        name: 'Client Communication',
        score: 4.1,
        maxScore: 5,
        feedback: 'Professional and clear communication',
        improvement: 'Develop presentation skills for client meetings'
      }
    ],
    achievements: [
      {
        title: 'Quality Excellence Award',
        date: '2025-02-15',
        description: 'Achieved 99.2% accuracy rate in Q4 2024 translations'
      },
      {
        title: 'Team Player Recognition',
        date: '2025-01-20',
        description: 'Helped onboard 3 new team members successfully'
      },
      {
        title: 'Innovation Contributor',
        date: '2024-12-10',
        description: 'Suggested workflow improvements that increased team efficiency by 15%'
      }
    ],
    goals: [
      {
        title: 'Complete Advanced CAT Tools Certification',
        status: 'In Progress',
        progress: 65,
        deadline: '2025-07-01',
        priority: 'High'
      },
      {
        title: 'Lead Translation Quality Workshop',
        status: 'Planned',
        progress: 0,
        deadline: '2025-08-15',
        priority: 'Medium'
      },
      {
        title: 'Increase Translation Output by 20%',
        status: 'In Progress',
        progress: 45,
        deadline: '2025-06-30',
        priority: 'High'
      },
      {
        title: 'Mentor Junior Translators',
        status: 'Completed',
        progress: 100,
        deadline: '2025-03-01',
        priority: 'Medium'
      }
    ],
    feedback: [
      {
        from: 'PM Sharma - Project Manager',
        date: '2025-03-10',
        comment: 'Exceptional work on the medical translation project. Your attention to technical terminology was outstanding.',
        type: 'Positive'
      },
      {
        from: 'QA Team Lead',
        date: '2025-03-05',
        comment: 'Consistently delivers high-quality work with minimal revisions required.',
        type: 'Positive'
      },
      {
        from: 'Team Lead',
        date: '2025-02-28',
        comment: 'Consider taking on more complex projects to further develop your skills.',
        type: 'Constructive'
      }
    ]
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Planned': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Performance Review</h1>
              <p className="text-gray-600 mt-1">Your performance metrics and feedback for {performanceData.currentPeriod}</p>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{performanceData.overallRating}</div>
              <div className="text-sm text-gray-600">Overall Rating</div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-4 w-4 ${star <= performanceData.overallRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{performanceData.achievements.length}</div>
              <div className="text-sm text-gray-600">Achievements</div>
              <Award className="h-8 w-8 text-green-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{performanceData.goals.filter(g => g.status === 'Completed').length}</div>
              <div className="text-sm text-gray-600">Goals Achieved</div>
              <Target className="h-8 w-8 text-purple-500 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-lg font-bold text-orange-600 mb-2">{performanceData.nextReview}</div>
              <div className="text-sm text-gray-600">Next Review</div>
              <Calendar className="h-8 w-8 text-orange-500 mx-auto mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {performanceData.categories.map((category, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <span className={`font-bold ${getScoreColor(category.score, category.maxScore)}`}>
                          {category.score}/{category.maxScore}
                        </span>
                      </div>
                      <Progress value={(category.score / category.maxScore) * 100} className="h-3" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-green-700 mb-1">Feedback:</p>
                          <p className="text-gray-600">{category.feedback}</p>
                        </div>
                        <div>
                          <p className="font-medium text-blue-700 mb-1">Areas for Improvement:</p>
                          <p className="text-gray-600">{category.improvement}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.goals.map((goal, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                        <div className="flex space-x-2">
                          <Badge className={`${getPriorityColor(goal.priority)} border text-xs`}>
                            {goal.priority}
                          </Badge>
                          <Badge className={`${getStatusColor(goal.status)} border text-xs`}>
                            {goal.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Deadline: {goal.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                        <span className="text-xs text-gray-500">Achieved on {achievement.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.feedback.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.from}</h3>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <Badge className={`${item.type === 'Positive' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} border text-xs`}>
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-gray-700">{item.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default PerformanceReview;
