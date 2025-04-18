import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, BarChart, BookOpen, CheckCircle2, Lock, Play, Check } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Lesson {
  title: string;
  duration: string;
  completed: boolean;
  youtubeUrl: string;
}

interface CurriculumSection {
  title: string;
  lessons: Lesson[];
}

interface Instructor {
  name: string;
  avatar: string;
  title: string;
  bio: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  thumbnail: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
  totalRatings: number;
  progress: number;
  lastUpdated: string;
  language: string;
  curriculum: CurriculumSection[];
}

// Mock data for courses
const mockCourse: Course[] = [
  {
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
          { 
            title: 'Introduction to the Course', 
            duration: '10m', 
            completed: true,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8'
          },
          { 
            title: 'Setting Up Your Development Environment', 
            duration: '15m', 
            completed: true,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=10m'
          },
          { 
            title: 'Your First React Component', 
            duration: '25m', 
            completed: true,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=25m'
          },
        ]
      },
      {
        title: 'React Fundamentals',
        lessons: [
          { 
            title: 'JSX Syntax in Depth', 
            duration: '30m', 
            completed: true,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=50m'
          },
          { 
            title: 'Props and State', 
            duration: '45m', 
            completed: true,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=80m'
          },
          { 
            title: 'Handling Events', 
            duration: '20m', 
            completed: true,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=125m'
          },
          { 
            title: 'Conditional Rendering', 
            duration: '25m', 
            completed: true,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=145m'
          },
        ]
      },
      {
        title: 'Working with React Hooks',
        lessons: [
          { 
            title: 'Introduction to Hooks', 
            duration: '20m', 
            completed: true,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=170m'
          },
          { 
            title: 'useState Hook', 
            duration: '30m', 
            completed: true,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=190m'
          },
          { 
            title: 'useEffect Hook', 
            duration: '40m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=220m'
          },
          { 
            title: 'Custom Hooks', 
            duration: '35m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=260m'
          },
        ]
      },
      {
        title: 'Advanced React Concepts',
        lessons: [
          { 
            title: 'Context API', 
            duration: '35m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=295m'
          },
          { 
            title: 'React Router', 
            duration: '45m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=330m'
          },
          { 
            title: 'Performance Optimization', 
            duration: '30m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=375m'
          },
          { 
            title: 'Error Boundaries', 
            duration: '25m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=405m'
          },
        ]
      },
      {
        title: 'State Management',
        lessons: [
          { 
            title: 'Introduction to Redux', 
            duration: '40m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=430m'
          },
          { 
            title: 'Redux Toolkit', 
            duration: '50m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=470m'
          },
          { 
            title: 'Redux Middleware', 
            duration: '35m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=520m'
          },
          { 
            title: 'Alternative State Solutions', 
            duration: '30m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=555m'
          },
        ]
      },
      {
        title: 'Building a Real-World Application',
        lessons: [
          { 
            title: 'Project Setup', 
            duration: '15m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=585m'
          },
          { 
            title: 'Implementing Features', 
            duration: '60m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=600m'
          },
          { 
            title: 'Styling with CSS-in-JS', 
            duration: '25m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=660m'
          },
          { 
            title: 'Testing React Components', 
            duration: '45m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=685m'
          },
          { 
            title: 'Deployment', 
            duration: '20m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=730m'
          },
        ]
      },
      {
        title: 'Advanced Topics',
        lessons: [
          { 
            title: 'Server-Side Rendering', 
            duration: '40m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=750m'
          },
          { 
            title: 'Static Site Generation', 
            duration: '35m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=790m'
          },
          { 
            title: 'Authentication & Authorization', 
            duration: '45m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=825m'
          },
          { 
            title: 'API Integration', 
            duration: '50m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=870m'
          },
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Complete UI/UX Designer in 2024',
    description: 'Master UI/UX design from beginner to professional. This comprehensive course covers essential design principles, user research methods, wireframing, prototyping with industry-standard tools, and creating compelling design systems.',
    instructor: {
      name: 'Alex Rivera',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      title: 'Lead Product Designer',
      bio: 'Alex has 10+ years of experience in UI/UX design and has worked with startups and Fortune 500 companies. Previously a design lead at Airbnb and Spotify, Alex specializes in user-centered design approaches.',
    },
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    category: 'Design',
    duration: '22h 45m',
    students: 3156,
    rating: 4.9,
    totalRatings: 387,
    progress: 0,
    lastUpdated: 'April 2024',
    language: 'English',
    curriculum: [
      {
        title: 'Introduction to UI/UX Design',
        lessons: [
          { 
            title: 'Course Overview & Design Fundamentals', 
            duration: '15m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=example17'
          },
          { 
            title: 'Understanding the Design Process', 
            duration: '25m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=example18'
          },
          { 
            title: 'UI vs UX: Key Differences and Synergies', 
            duration: '20m', 
            completed: false,
            youtubeUrl: 'https://www.youtube.com/watch?v=example19'
          },
        ]
      },
      // More sections...
    ]
  },
  {
    id: '3',
    title: 'Digital Marketing Masterclass 2024',
    description: 'Become a digital marketing expert with this comprehensive masterclass.',
    instructor: {
      name: 'Marcus Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      title: 'Digital Marketing Strategist',
      bio: 'Marcus has over 12 years of experience in digital marketing.',
    },
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    category: 'Marketing',
    duration: '28h 15m',
    students: 4572,
    rating: 4.7,
    totalRatings: 529,
    progress: 0,
    lastUpdated: 'April 2024',
    language: 'English',
    curriculum: [
      {
        title: "Introduction to Digital Marketing",
        lessons: [
          { 
            title: "Welcome to the Course", 
            duration: "5m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=0m"
          },
          { 
            title: "What is Digital Marketing?", 
            duration: "12m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=5m"
          },
          { 
            title: "The Digital Marketing Funnel", 
            duration: "10m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=17m"
          },
        ],
      },
      {
        title: "Content Marketing",
        lessons: [
          { 
            title: "Understanding Content Strategy", 
            duration: "18m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=27m"
          },
          { 
            title: "Creating High-Quality Content", 
            duration: "22m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=45m"
          },
          { 
            title: "Content Distribution Channels", 
            duration: "15m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=67m"
          },
        ],
      },
      {
        title: "Search Engine Optimization (SEO)",
        lessons: [
          { 
            title: "SEO Fundamentals", 
            duration: "20m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=82m"
          },
          { 
            title: "On-Page vs Off-Page SEO", 
            duration: "25m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=102m"
          },
          { 
            title: "Keyword Research Techniques", 
            duration: "17m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=127m"
          },
          { 
            title: "SEO Tools and Analytics", 
            duration: "19m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=144m"
          },
        ],
      },
      {
        title: "Social Media Marketing",
        lessons: [
          { 
            title: "Major Social Platforms Overview", 
            duration: "14m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=163m"
          },
          { 
            title: "Building a Social Media Strategy", 
            duration: "20m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=177m"
          },
          { 
            title: "Paid Social Ads (Facebook, Instagram, LinkedIn)", 
            duration: "27m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=197m"
          },
        ],
      },
      {
        title: "Email Marketing",
        lessons: [
          { 
            title: "Email Marketing Strategy", 
            duration: "18m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=224m"
          },
          { 
            title: "Building and Segmenting Email Lists", 
            duration: "15m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=242m"
          },
          { 
            title: "Writing Effective Email Copy", 
            duration: "12m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=257m"
          },
        ],
      },
      {
        title: "Pay-Per-Click (PPC) Advertising",
        lessons: [
          { 
            title: "Introduction to PPC and Google Ads", 
            duration: "16m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=269m"
          },
          { 
            title: "Setting Up Your First Campaign", 
            duration: "20m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=285m"
          },
          { 
            title: "Optimizing Ad Performance", 
            duration: "19m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=305m"
          },
        ],
      },
      {
        title: "Analytics & Data-Driven Marketing",
        lessons: [
          { 
            title: "Intro to Google Analytics", 
            duration: "22m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=324m"
          },
          { 
            title: "Tracking Conversions and KPIs", 
            duration: "17m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=346m"
          },
          { 
            title: "A/B Testing & Optimization", 
            duration: "15m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=363m"
          },
        ],
      },
      {
        title: "Final Project & Certification",
        lessons: [
          { 
            title: "Capstone Project Brief", 
            duration: "10m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=378m"
          },
          { 
            title: "Submission Guidelines", 
            duration: "5m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=388m"
          },
          { 
            title: "Next Steps After Course Completion", 
            duration: "8m",
            completed: false,
            youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=393m"
          },
        ],
      },
    ]
  }
];

export function CourseDetail() {
  const { id } = useParams();
  const selectedCourse = mockCourse.find(course => course.id === id) || mockCourse[0];
  
  if (!selectedCourse) {
    return <div>Course not found</div>;
  }

  const totalLessons = selectedCourse.curriculum.reduce(
    (total, section) => total + section.lessons.length, 0
  );
  const completedLessons = selectedCourse.curriculum.reduce(
    (total, section) => total + section.lessons.filter(lesson => lesson.completed).length, 0
  );
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <img
              src={selectedCourse.thumbnail}
              alt={selectedCourse.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold mb-4">{selectedCourse.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className="bg-secondary">{selectedCourse.category}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{selectedCourse.duration}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>{selectedCourse.students} students</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <BarChart className="h-4 w-4 mr-1" />
              <span>{selectedCourse.rating} ({selectedCourse.totalRatings} ratings)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <Avatar className="h-12 w-12">
              <AvatarImage src={selectedCourse.instructor.avatar} alt={selectedCourse.instructor.name} />
              <AvatarFallback>{selectedCourse.instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{selectedCourse.instructor.name}</div>
              <div className="text-sm text-muted-foreground">{selectedCourse.instructor.title}</div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">About This Course</h2>
            <p className="text-muted-foreground">{selectedCourse.description}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
            <Accordion type="single" collapsible className="w-full">
              {selectedCourse.curriculum.map((section, index) => (
                <AccordionItem key={index} value={`section-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex justify-between items-center w-full pr-4">
                      <span>{section.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {section.lessons.length} lessons
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div 
                          key={lessonIndex} 
                          className="flex items-center justify-between p-3 rounded-md hover:bg-accent"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                {lesson.completed ? (
                                  <Check className="h-4 w-4 text-primary" />
                                ) : (
                                  <Play className="h-4 w-4 text-primary" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground" asChild>
                                <a href={lesson.youtubeUrl} target="_blank" rel="noopener noreferrer">
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                  </svg>
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96">
          <div className="sticky top-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Your Progress</span>
                    <span>{selectedCourse.progress}% completed</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${selectedCourse.progress}%` }}
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
                      <div className="text-sm text-muted-foreground">{selectedCourse.duration}</div>
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