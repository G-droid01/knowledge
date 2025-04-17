
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProgressStats } from '@/components/dashboard/ProgressStats';
import { ContinueLearning } from '@/components/dashboard/ContinueLearning';
import { CourseList } from '@/components/courses/CourseList';

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground mt-1">
              You've completed 65% of your weekly goal.
            </p>
          </div>
        </div>
        
        <ProgressStats />
        <ContinueLearning />
        
        <div className="mt-8">
          <CourseList title="Recommended Courses" showFilters={false} limit={3} />
        </div>
      </div>
    </AppLayout>
  );
}
