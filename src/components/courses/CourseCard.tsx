
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  category: string;
  duration: string;
  students: number;
  progress?: number;
}

export function CourseCard({
  id,
  title,
  instructor,
  thumbnail,
  category,
  duration,
  students,
  progress,
}: CourseCardProps) {
  return (
    <Link to={`/courses/${id}`}>
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md course-card">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover course-card-image transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3">{category}</Badge>
        </div>
        
        <CardContent className="p-5">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">By {instructor}</p>
          
          {progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="px-5 py-3 border-t flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{students} students</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
