
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, Download, Plus, Search, Users } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type Student = {
  id: string;
  name: string;
  email: string;
  grade: string;
  enrolledCourses: number;
  status: 'active' | 'inactive';
  lastActive: string;
  avatar?: string;
};

const generateRandomStudents = (count: number): Student[] => {
  const statuses: ('active' | 'inactive')[] = ['active', 'inactive'];
  const grades = ['A', 'B', 'C', 'D', 'F'];
  const names = [
    'Emma Johnson', 'Liam Williams', 'Olivia Brown', 'Noah Jones', 'Ava Davis',
    'Sophia Miller', 'Jackson Wilson', 'Isabella Moore', 'Lucas Taylor', 'Mia Anderson',
    'Aiden Thomas', 'Harper Jackson', 'Elijah White', 'Amelia Harris', 'Oliver Martin',
    'Abigail Thompson', 'Benjamin Garcia', 'Emily Martinez', 'James Robinson', 'Charlotte Clark'
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length];
    const email = name.toLowerCase().replace(' ', '.') + '@example.com';
    const initials = name.split(' ').map(n => n[0]).join('');
    
    return {
      id: `STU-${1000 + i}`,
      name,
      email,
      grade: grades[Math.floor(Math.random() * grades.length)],
      enrolledCourses: Math.floor(Math.random() * 6) + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      avatar: i % 5 === 0 ? undefined : `https://i.pravatar.cc/150?u=${email}`,
    };
  });
};

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>(generateRandomStudents(20));
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Student>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    grade: 'B',
  });
  
  const { toast } = useToast();
  
  const handleSort = (field: keyof Student) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const student: Student = {
      id: `STU-${1000 + students.length}`,
      name: newStudent.name,
      email: newStudent.email,
      grade: newStudent.grade,
      enrolledCourses: 0,
      status: 'active',
      lastActive: new Date().toLocaleDateString(),
    };
    
    setStudents([student, ...students]);
    setNewStudent({ name: '', email: '', grade: 'B' });
    
    toast({
      title: "Student added",
      description: `${student.name} has been added to the system`,
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new student.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input 
                      id="student-name" 
                      value={newStudent.name} 
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      placeholder="Enter student name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input 
                      id="student-email" 
                      type="email"
                      value={newStudent.email} 
                      onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                      placeholder="Enter student email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-grade">Initial Grade</Label>
                    <select 
                      id="student-grade"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newStudent.grade}
                      onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddStudent}>Add Student</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>View and manage all students in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search students..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setSearchTerm('')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchTerm('active')}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchTerm('inactive')}>Inactive</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Filter by Grade</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setSearchTerm('A')}>Grade A</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchTerm('B')}>Grade B</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchTerm('C')}>Grade C</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchTerm('D')}>Grade D</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchTerm('F')}>Grade F</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      <Button 
                        variant="ghost" 
                        className="p-0 font-medium"
                        onClick={() => handleSort('name')}
                      >
                        Student Name
                        {sortField === 'name' && (
                          sortDirection === 'asc' ? 
                          <ChevronUp className="ml-2 h-4 w-4 inline" /> : 
                          <ChevronDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        className="p-0 font-medium"
                        onClick={() => handleSort('grade')}
                      >
                        Grade
                        {sortField === 'grade' && (
                          sortDirection === 'asc' ? 
                          <ChevronUp className="ml-2 h-4 w-4 inline" /> : 
                          <ChevronDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        className="p-0 font-medium"
                        onClick={() => handleSort('enrolledCourses')}
                      >
                        Courses
                        {sortField === 'enrolledCourses' && (
                          sortDirection === 'asc' ? 
                          <ChevronUp className="ml-2 h-4 w-4 inline" /> : 
                          <ChevronDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        className="p-0 font-medium"
                        onClick={() => handleSort('status')}
                      >
                        Status
                        {sortField === 'status' && (
                          sortDirection === 'asc' ? 
                          <ChevronUp className="ml-2 h-4 w-4 inline" /> : 
                          <ChevronDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        className="p-0 font-medium"
                        onClick={() => handleSort('lastActive')}
                      >
                        Last Active
                        {sortField === 'lastActive' && (
                          sortDirection === 'asc' ? 
                          <ChevronUp className="ml-2 h-4 w-4 inline" /> : 
                          <ChevronDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No students found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">{student.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            student.grade === 'A' ? 'bg-green-100 text-green-800' :
                            student.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                            student.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            student.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {student.grade}
                          </span>
                        </TableCell>
                        <TableCell>{student.enrolledCourses}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{student.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <span className="sr-only">Open menu</span>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Student</DropdownMenuItem>
                              <DropdownMenuItem>Send Message</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Remove Student</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default StudentsPage;
