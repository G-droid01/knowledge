
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContinueLearningItemProps {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  thumbnail: string;
}

function ContinueLearningItem({ id, title, subtitle, progress, thumbnail }: ContinueLearningItemProps) {
  return (
    <Card className="overflow-hidden mb-4">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-32 relative">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute inset-0 m-auto rounded-full h-10 w-10 opacity-90 hover:opacity-100"
          >
            <Play className="h-5 w-5 text-primary" />
          </Button>
        </div>
        
        <div className="flex-1 p-4">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>
          
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Link to={`/courses/${id}`}>
              <Button variant="outline" size="sm">
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ContinueLearning() {
  const inProgressCourses = [
    {
      id: '1',
      title: 'Complete React Developer in 2024',
      subtitle: 'Next lesson: React Hooks in Depth - 25 min',
      progress: 65,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: '2',
      title: 'UX/UI Design Fundamentals',
      subtitle: 'Next lesson: User Research Methods - 40 min',
      progress: 32,
      thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80',
    },
    {
      id: '3',
      title: 'Digital Marketing Masterclass',
      subtitle: 'Next lesson: Social Media Strategies - 35 min',
      progress: 10,
      thumbnail: 'https://images.unsplash.com/photo-1533750349088-cd871a92f7b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    },
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Continue Learning</CardTitle>
        <CardDescription>
          Pick up where you left off
        </CardDescription>
      </CardHeader>
      <CardContent>
        {inProgressCourses.map((course) => (
          <ContinueLearningItem key={course.id} {...course} />
        ))}
      </CardContent>
    </Card>
  );
}
