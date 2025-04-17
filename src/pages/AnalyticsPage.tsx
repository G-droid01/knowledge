
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, Line, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const courseProgressData = [
  { name: 'Mathematics', progress: 85, total: 100 },
  { name: 'Physics', progress: 72, total: 100 },
  { name: 'Chemistry', progress: 68, total: 100 },
  { name: 'Literature', progress: 90, total: 100 },
  { name: 'History', progress: 62, total: 100 },
];

const monthlyEngagementData = [
  { month: 'Jan', students: 45, courses: 12 },
  { month: 'Feb', students: 52, courses: 14 },
  { month: 'Mar', students: 49, courses: 13 },
  { month: 'Apr', students: 63, courses: 15 },
  { month: 'May', students: 59, courses: 14 },
  { month: 'Jun', students: 80, courses: 17 },
  { month: 'Jul', students: 85, courses: 18 },
  { month: 'Aug', students: 92, courses: 20 },
  { month: 'Sep', students: 95, courses: 21 },
  { month: 'Oct', students: 102, courses: 22 },
  { month: 'Nov', students: 110, courses: 24 },
  { month: 'Dec', students: 120, courses: 25 },
];

const subjectDistributionData = [
  { name: 'Science', value: 35, color: '#8884d8' },
  { name: 'Mathematics', value: 25, color: '#83a6ed' },
  { name: 'Languages', value: 20, color: '#8dd1e1' },
  { name: 'Arts', value: 10, color: '#82ca9d' },
  { name: 'Social Studies', value: 10, color: '#ffc658' },
];

const gradeDistributionData = [
  { grade: 'A', count: 42 },
  { grade: 'B', count: 63 },
  { grade: 'C', count: 48 },
  { grade: 'D', count: 27 },
  { grade: 'F', count: 9 },
];

const AnalyticsPage = () => {
  const [period, setPeriod] = useState('yearly');
  
  // Simulate different data based on period
  const getPeriodData = () => {
    if (period === 'monthly') {
      return monthlyEngagementData.slice(-1);
    } else if (period === 'quarterly') {
      return monthlyEngagementData.slice(-3);
    } else {
      return monthlyEngagementData;
    }
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <div className="flex items-center gap-2">
            <select 
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">+4.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">B+</div>
              <p className="text-xs text-muted-foreground">+0.3 from last semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+5% from last year</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Average completion rate per course</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="progress" fill="#8884d8" name="Progress %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Engagement</CardTitle>
              <CardDescription>Student and course activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getPeriodData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="students" stroke="#8884d8" name="Active Students" />
                  <Line yAxisId="right" type="monotone" dataKey="courses" stroke="#82ca9d" name="Active Courses" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="grade">
          <TabsList>
            <TabsTrigger value="grade">Grade Distribution</TabsTrigger>
            <TabsTrigger value="subject">Subject Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="grade">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Student performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gradeDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" name="Number of Students" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subject">
            <Card>
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
                <CardDescription>Course categories breakdown</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subjectDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subjectDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;
