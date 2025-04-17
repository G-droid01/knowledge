
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, BarChart, BookOpen, CheckCircle2, Lock, Play } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Mock data for a single course
const mockCourse = {
  id: '1',
  title: 'Complete React Developer in 2024',
  description: 'Learn React from scratch and build real-world applications. This comprehensive course covers everything from the fundamentals to advanced concepts including React Router, Redux, Hooks, and more.',
  instructor: {
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    title: 'Senior Frontend Developer',
    bio: 'Sarah has over 8 years of experience in web development and has worked with companies like Google and Facebook. She specializes in React and modern JavaScript.',
  },
  thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
  category: 'Development',
  duration: '24h 30m',
  students: 2843,
  rating: 4.8,
  totalRatings: 342,
  progress: 65,
  lastUpdated: 'March 2024',
  language: 'English',
  curriculum: [
    {
      title: 'Getting Started with React',
      lessons: [
        { title: 'Introduction to the Course', duration: '10m', completed: true },
        { title: 'Setting Up Your Development Environment', duration: '15m', completed: true },
        { title: 'Your First React Component', duration: '25m', completed: true },
      ]
    },
    {
      title: 'React Fundamentals',
      lessons: [
        { title: 'JSX Syntax in Depth', duration: '30m', completed: true },
        { title: 'Props and State', duration: '45m', completed: true },
        { title: 'Handling Events', duration: '20m', completed: true },
        { title: 'Conditional Rendering', duration: '25m', completed: true },
      ]
    },
    {
      title: 'Working with React Hooks',
      lessons: [
        { title: 'Introduction to Hooks', duration: '20m', completed: true },
        { title: 'useState Hook', duration: '30m', completed: true },
        { title: 'useEffect Hook', duration: '40m', completed: false },
        { title: 'Custom Hooks', duration: '35m', completed: false },
      ]
    },
    {
      title: 'Building a Real-World Application',
      lessons: [
        { title: 'Project Setup', duration: '15m', completed: false },
        { title: 'Implementing Features', duration: '60m', completed: false },
        { title: 'Styling with CSS-in-JS', duration: '25m', completed: false },
        { title: 'Testing React Components', duration: '45m', completed: false },
        { title: 'Deployment', duration: '20m', completed: false },
      ]
    },
  ]
};

export function CourseDetail() {
  const { id } = useParams();
  // In a real app, you would fetch the course data based on the ID
  const course = mockCourse;
  
  // Calculate completion statistics
  const totalLessons = course.curriculum.reduce(
    (total, section) => total + section.lessons.length, 0
  );
  const completedLessons = course.curriculum.reduce(
    (total, section) => total + section.lessons.filter(lesson => lesson.completed).length, 0
  );
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge variant="secondary">{course.category}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <BarChart className="h-4 w-4 mr-1" />
              <span>{course.rating} ({course.totalRatings} ratings)</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-8">
            <Avatar className="h-12 w-12">
              <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
              <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{course.instructor.name}</div>
              <div className="text-sm text-muted-foreground">{course.instructor.title}</div>
            </div>
          </div>
          
          <Tabs defaultValue="curriculum">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curriculum" className="animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Course Content</h2>
                <div className="text-sm text-muted-foreground">
                  {completedLessons} / {totalLessons} lessons completed
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {course.curriculum.map((section, index) => (
                  <AccordionItem key={index} value={`section-${index}`}>
                    <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-lg">
                      <div className="flex justify-between w-full">
                        <span>{section.title}</span>
                        <span className="text-sm text-muted-foreground mr-4">
                          {section.lessons.filter(l => l.completed).length} / {section.lessons.length} lessons
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="px-4 py-2">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div 
                            key={lessonIndex}
                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 mb-1 cursor-pointer"
                          >
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-primary mr-3" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-muted-foreground/60 mr-3 flex items-center justify-center">
                                  {lessonIndex === 0 && !section.lessons[lessonIndex - 1]?.completed && (
                                    <Play className="h-2.5 w-2.5 text-muted-foreground/60" />
                                  )}
                                  {lessonIndex > 0 && section.lessons[lessonIndex - 1]?.completed && (
                                    <Play className="h-2.5 w-2.5 text-muted-foreground/60" />
                                  )}
                                  {lessonIndex > 0 && !section.lessons[lessonIndex - 1]?.completed && (
                                    <Lock className="h-2.5 w-2.5 text-muted-foreground/60" />
                                  )}
                                </div>
                              )}
                              <span className={lesson.completed ? "text-muted-foreground" : ""}>
                                {lesson.title}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="overview" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">About This Course</h3>
                  <p className="mb-6 text-muted-foreground">{course.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-medium mb-2">Last Updated</h4>
                      <p className="text-sm text-muted-foreground">{course.lastUpdated}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Language</h4>
                      <p className="text-sm text-muted-foreground">{course.language}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Build powerful, fast, user-friendly and reactive web apps</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Apply for high-paid jobs or work as a freelancer</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Understand the latest React patterns and best practices</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Become fluent in concepts like Hooks, State Management, and Redux</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="instructor" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{course.instructor.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mb-6">
                    <div className="text-center">
                      <div className="font-bold text-xl">42</div>
                      <div className="text-sm text-muted-foreground">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl">15,487</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl">4.8</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>
                  
                  <p className="mb-6">{course.instructor.bio}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96">
          <div className="sticky top-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Your Progress</span>
                    <span>{course.progress}% completed</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button className="w-full mb-4">
                  <Play className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
                
                <div className="border-t pt-4 space-y-4">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <div className="text-sm font-medium">Total Lessons</div>
                      <div className="text-sm text-muted-foreground">{totalLessons} lessons</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <div className="text-sm font-medium">Total Duration</div>
                      <div className="text-sm text-muted-foreground">{course.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <div className="text-sm font-medium">Level</div>
                      <div className="text-sm text-muted-foreground">Beginner to Advanced</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
