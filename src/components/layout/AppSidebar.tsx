import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { BookOpen, Home, BarChart, Users, Calendar, Settings, LogOut, Bell, Files } from 'lucide-react'; // 🆕 Added Files icon
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  exact?: boolean;
};

const NavItem = ({ to, icon: Icon, label, exact }: NavItemProps) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to 
    : (to !== '/' ? location.pathname.startsWith(to) : location.pathname === '/');
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link 
          to={to} 
          className={cn(
            "flex items-center gap-3 py-2 px-3 rounded-md transition-colors",
            isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
          )}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AppSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
            LMS
          </div>
          <div className="font-bold text-sidebar-foreground text-xl">EduLearn</div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/60">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem to="/" icon={Home} label="Dashboard" exact />
              <NavItem to="/courses" icon={BookOpen} label="Courses" />
              <NavItem to="/study-material" icon={Files} label="Study Material" /> {/* 🆕 New Item */}
              <NavItem to="/calendar" icon={Calendar} label="Calendar" />
              <NavItem to="/analytics" icon={BarChart} label="Analytics" />
              <NavItem to="/students" icon={Users} label="Students" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/60">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem to="/settings" icon={Settings} label="Settings" />
              <NavItem to="/notifications" icon={Bell} label="Notifications" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
