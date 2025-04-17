
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, GraduationCap, Award, BookOpen } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

function StatCard({ icon, title, value, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export function ProgressStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        title="Enrolled Courses"
        value="12"
        description="3 in progress"
      />
      <StatCard
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        title="Study Time"
        value="48h 30m"
        description="+2h 15m this week"
      />
      <StatCard
        icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
        title="Completed"
        value="8"
        description="Courses completed"
      />
      <StatCard
        icon={<Award className="h-4 w-4 text-muted-foreground" />}
        title="Certificates"
        value="5"
        description="Earned certificates"
      />
    </div>
  );
}
