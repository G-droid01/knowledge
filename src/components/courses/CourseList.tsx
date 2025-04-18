import React, { useState } from 'react';
import { CourseCard } from './CourseCard';
import { CourseFilters } from './CourseFilters';

// Mock data - in a real app this would come from an API
const mockCourses = [
  {
    id: '1',
    title: 'Complete React Developer in 2024',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    category: 'Development',
    duration: '24h 30m',
    students: 2843,
    progress: 65,
  },
  {
    id: '2',
    title: 'UX/UI Design Fundamentals',
    instructor: 'Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80',
    category: 'Design',
    duration: '18h 15m',
    students: 1954,
    progress: 32,
  },
  {
    id: '3',
    title: 'Digital Marketing Masterclass',
    instructor: 'Emma Wilson',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    category: 'Marketing',
    duration: '15h 45m',
    students: 3211,
    progress: 10,
  },
  {
    id: '4',
    title: 'JavaScript Algorithms and Data Structures',
    instructor: 'David Lee',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    category: 'Development',
    duration: '21h 10m',
    students: 2157,
  },
  {
    id: '5',
    title: 'Business Strategy: Start-up to Scale-up',
    instructor: 'Jessica Brown',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    category: 'Business',
    duration: '16h 20m',
    students: 1823,
  },
  {
    id: '6',
    title: 'Full-Stack Web Development Bootcamp',
    instructor: 'Alex Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    category: 'Development',
    duration: '32h 45m',
    students: 3506,
  },
];

interface CourseListProps {
  showFilters?: boolean;
  limit?: number;
  showProgress?: boolean;
  title?: string;
}

export function CourseList({ showFilters = true, limit, showProgress = false, title }: CourseListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Filter courses based on category and search query
  const filteredCourses = mockCourses
    .filter(course => {
      const matchesCategory = selectedCategory === 'all' || 
        course.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = !searchQuery || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return -1; // In a real app, you'd compare dates
        case 'rated':
          return b.students - a.students; // Using students as a proxy for rating
        case 'popular':
        default:
          return b.students - a.students;
      }
    });

  const displayCourses = limit ? filteredCourses.slice(0, limit) : filteredCourses;
  
  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      {showFilters && (
        <CourseFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCourses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            progress={showProgress ? course.progress : undefined}
          />
        ))}
      </div>

      {displayCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
