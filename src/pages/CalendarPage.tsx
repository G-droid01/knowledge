
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type Event = {
  id: string;
  title: string;
  date: Date;
  type: 'class' | 'assignment' | 'exam' | 'meeting';
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Mathematics Class', date: new Date(2025, 3, 15), type: 'class' },
    { id: '2', title: 'Physics Assignment Due', date: new Date(2025, 3, 18), type: 'assignment' },
    { id: '3', title: 'Literature Exam', date: new Date(2025, 3, 21), type: 'exam' },
    { id: '4', title: 'Faculty Meeting', date: new Date(2025, 3, 22), type: 'meeting' },
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'class' as const,
  });
  
  const { toast } = useToast();
  
  const handleAddEvent = () => {
    if (!date || !newEvent.title) {
      toast({
        title: "Missing information",
        description: "Please select a date and enter an event title",
        variant: "destructive",
      });
      return;
    }
    
    const event: Event = {
      id: Math.random().toString(36).substring(2, 9),
      title: newEvent.title,
      date: date,
      type: newEvent.type,
    };
    
    setEvents([...events, event]);
    setNewEvent({ title: '', type: 'class' });
    
    toast({
      title: "Event added",
      description: `${event.title} has been added to your calendar`,
    });
  };
  
  const todaysEvents = events.filter(
    event => date && event.date.toDateString() === date.toDateString()
  );
  
  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Create a new event for your calendar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input 
                    id="event-title" 
                    value={newEvent.title} 
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <select 
                    id="event-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value as any})}
                  >
                    <option value="class">Class</option>
                    <option value="assignment">Assignment</option>
                    <option value="exam">Exam</option>
                    <option value="meeting">Meeting</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddEvent}>Save Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Browse and select dates</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>Manage your schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="today">
                <TabsList className="mb-4">
                  <TabsTrigger value="today">Today's Events</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>
                <TabsContent value="today">
                  {todaysEvents.length === 0 ? (
                    <p className="text-muted-foreground py-8 text-center">No events scheduled for today.</p>
                  ) : (
                    <div className="space-y-4">
                      {todaysEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {event.date.toLocaleDateString()} - {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </p>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${event.type === 'class' ? 'bg-blue-500' : event.type === 'assignment' ? 'bg-yellow-500' : event.type === 'exam' ? 'bg-red-500' : 'bg-green-500'}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="upcoming">
                  {upcomingEvents.length === 0 ? (
                    <p className="text-muted-foreground py-8 text-center">No upcoming events.</p>
                  ) : (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {event.date.toLocaleDateString()} - {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </p>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${event.type === 'class' ? 'bg-blue-500' : event.type === 'assignment' ? 'bg-yellow-500' : event.type === 'exam' ? 'bg-red-500' : 'bg-green-500'}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
