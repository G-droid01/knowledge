
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, ChevronDown, ExternalLink, MessageSquare, User, UserPlus, BookOpen, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Notification = {
  id: string;
  type: 'message' | 'enrollment' | 'announcement' | 'reminder';
  title: string;
  description: string;
  sender?: {
    name: string;
    avatar?: string;
  };
  course?: {
    name: string;
  };
  timestamp: Date;
  read: boolean;
};

const generateNotifications = (): Notification[] => {
  return [
    {
      id: '1',
      type: 'message',
      title: 'New message received',
      description: 'Sarah Johnson sent you a message about the Physics assignment.',
      sender: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?u=sarah@example.com',
      },
      timestamp: new Date(2025, 3, 16, 10, 15),
      read: false,
    },
    {
      id: '2',
      type: 'enrollment',
      title: 'New student enrolled',
      description: 'Michael Smith enrolled in your Mathematics 101 course.',
      sender: {
        name: 'Michael Smith',
        avatar: 'https://i.pravatar.cc/150?u=michael@example.com',
      },
      course: {
        name: 'Mathematics 101',
      },
      timestamp: new Date(2025, 3, 15, 14, 30),
      read: false,
    },
    {
      id: '3',
      type: 'announcement',
      title: 'Course update',
      description: 'The Chemistry 202 course has been updated with new content.',
      course: {
        name: 'Chemistry 202',
      },
      timestamp: new Date(2025, 3, 14, 9, 0),
      read: true,
    },
    {
      id: '4',
      type: 'message',
      title: 'New message received',
      description: 'Emma Davis has questions about the upcoming Literature exam.',
      sender: {
        name: 'Emma Davis',
        avatar: 'https://i.pravatar.cc/150?u=emma@example.com',
      },
      timestamp: new Date(2025, 3, 13, 16, 45),
      read: true,
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Assignment deadline approaching',
      description: 'The Physics 101 assignment is due in 2 days.',
      course: {
        name: 'Physics 101',
      },
      timestamp: new Date(2025, 3, 12, 8, 0),
      read: true,
    },
    {
      id: '6',
      type: 'enrollment',
      title: 'New student enrolled',
      description: 'James Wilson enrolled in your Literature course.',
      sender: {
        name: 'James Wilson',
        avatar: 'https://i.pravatar.cc/150?u=james@example.com',
      },
      course: {
        name: 'Literature',
      },
      timestamp: new Date(2025, 3, 11, 11, 20),
      read: true,
    },
    {
      id: '7',
      type: 'announcement',
      title: 'System maintenance',
      description: 'The platform will be down for maintenance on Sunday from 2-3 AM.',
      timestamp: new Date(2025, 3, 10, 15, 0),
      read: true,
    },
  ];
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(generateNotifications());
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));

    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read",
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed from your inbox",
    });
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'enrollment': return <UserPlus className="h-5 w-5 text-green-500" />;
      case 'announcement': return <BookOpen className="h-5 w-5 text-purple-500" />;
      case 'reminder': return <Bell className="h-5 w-5 text-yellow-500" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const oneDay = 86400000;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
    if (diff < oneDay) return `${Math.floor(diff / 3600000)} hours ago`;
    if (diff < oneDay * 2) return 'Yesterday';

    return date.toLocaleDateString();
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6" />
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <div className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {unreadCount}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Actions
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={markAllAsRead}>Mark All as Read</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings">Notification Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>View all your recent notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {notifications.length === 0 ? (
                    <div className="text-center p-8">
                      <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-2 text-lg font-medium">No notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        You don't have any notifications at this time.
                      </p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex gap-4 p-4 rounded-lg border transition-colors",
                          notification.read ? "bg-background" : "bg-accent/10 border-accent-foreground/20"
                        )}
                      >
                        <div className="flex-shrink-0">
                          {notification.sender ? (
                            <Avatar>
                              <AvatarImage src={notification.sender.avatar} />
                              <AvatarFallback>
                                {notification.sender.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                              {getIcon(notification.type)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className={cn(
                              "text-sm font-medium",
                              !notification.read && "font-semibold"
                            )}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                          {notification.course && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <BookOpen className="h-3 w-3" />
                              <span>{notification.course.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0 flex items-start space-x-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.read && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                Delete
                              </DropdownMenuItem>
                              {notification.type === 'message' && (
                                <DropdownMenuItem>Reply</DropdownMenuItem>
                              )}
                              {notification.type === 'enrollment' && (
                                <DropdownMenuItem>View Student</DropdownMenuItem>
                              )}
                              {notification.course && (
                                <DropdownMenuItem>Go to Course</DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread">
            <Card>
              <CardHeader>
                <CardTitle>Unread Notifications</CardTitle>
                <CardDescription>View notifications you haven't read yet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {notifications.filter(n => !n.read).length === 0 ? (
                    <div className="text-center p-8">
                      <Check className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-2 text-lg font-medium">All caught up!</h3>
                      <p className="text-sm text-muted-foreground">
                        You've read all of your notifications.
                      </p>
                    </div>
                  ) : (
                    notifications.filter(n => !n.read).map((notification) => (
                      <div
                        key={notification.id}
                        className="flex gap-4 p-4 rounded-lg border transition-colors bg-accent/10 border-accent-foreground/20"
                      >
                        <div className="flex-shrink-0">
                          {notification.sender ? (
                            <Avatar>
                              <AvatarImage src={notification.sender.avatar} />
                              <AvatarFallback>
                                {notification.sender.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                              {getIcon(notification.type)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-semibold">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                          {notification.course && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <BookOpen className="h-3 w-3" />
                              <span>{notification.course.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0 flex items-start space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                Mark as read
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                Delete
                              </DropdownMenuItem>
                              {notification.type === 'message' && (
                                <DropdownMenuItem>Reply</DropdownMenuItem>
                              )}
                              {notification.type === 'enrollment' && (
                                <DropdownMenuItem>View Student</DropdownMenuItem>
                              )}
                              {notification.course && (
                                <DropdownMenuItem>Go to Course</DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>View messages from students and colleagues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {notifications.filter(n => n.type === 'message').length === 0 ? (
                    <div className="text-center p-8">
                      <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-2 text-lg font-medium">No messages</h3>
                      <p className="text-sm text-muted-foreground">
                        You don't have any message notifications.
                      </p>
                    </div>
                  ) : (
                    notifications.filter(n => n.type === 'message').map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex gap-4 p-4 rounded-lg border transition-colors",
                          notification.read ? "bg-background" : "bg-accent/10 border-accent-foreground/20"
                        )}
                      >
                        <div className="flex-shrink-0">
                          <Avatar>
                            <AvatarImage src={notification.sender?.avatar} />
                            <AvatarFallback>
                              {notification.sender?.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className={cn(
                              "text-sm font-medium",
                              !notification.read && "font-semibold"
                            )}>
                              Message from {notification.sender?.name}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex items-start space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                          >
                            <MessageSquare className="mr-2 h-3 w-3" />
                            Reply
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.read && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuItem>View Conversation</DropdownMenuItem>
                              <DropdownMenuItem>View Sender Profile</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Notifications</CardTitle>
                <CardDescription>Updates and announcements from the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {notifications.filter(n => n.type === 'announcement' || n.type === 'reminder').length === 0 ? (
                    <div className="text-center p-8">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-2 text-lg font-medium">No system notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        You don't have any system notifications at this time.
                      </p>
                    </div>
                  ) : (
                    notifications.filter(n => n.type === 'announcement' || n.type === 'reminder').map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex gap-4 p-4 rounded-lg border transition-colors",
                          notification.read ? "bg-background" : "bg-accent/10 border-accent-foreground/20"
                        )}
                      >
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            {getIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className={cn(
                              "text-sm font-medium",
                              !notification.read && "font-semibold"
                            )}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                          {notification.course && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <BookOpen className="h-3 w-3" />
                              <span>{notification.course.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0 flex items-start space-x-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.read && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                Delete
                              </DropdownMenuItem>
                              {notification.course && (
                                <DropdownMenuItem>Go to Course</DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

// Add a React Router Link component for internal navigation
const Link = ({ to, children }: { to: string, children: React.ReactNode }) => {
  return (
    <a href={to} className="inline-flex items-center gap-1">
      {children}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
};

export default NotificationsPage;
