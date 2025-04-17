
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CourseList } from '@/components/courses/CourseList';

export default function CoursesPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="text-muted-foreground mt-1">
              Browse our collection of courses to enhance your skills
            </p>
          </div>
        </div>
        
        <CourseList showFilters={true} />
      </div>
    </AppLayout>
  );
}
