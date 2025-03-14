
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarRail,
  useSidebar
} from './ui/sidebar';
import { Shirt, Home, Brain, Info, User, Settings, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const CollapsibleSidebar = () => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="h-16 flex items-center px-4 justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Shirt className="w-6 h-6 text-wardrobe-blue" />
              <span className="font-semibold text-lg">Clothify</span>
            </Link>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>NAVIGATION</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/home')} tooltip="Home">
                  <Link to="/home">
                    <Home size={20} />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/wardrobe')} tooltip="Wardrobe">
                  <Link to="/wardrobe">
                    <Shirt size={20} />
                    <span>Wardrobe</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/ai')} tooltip="AI Suggestions">
                  <Link to="/ai">
                    <Brain size={20} />
                    <span>AI Suggestions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/about')} tooltip="About">
                  <Link to="/about">
                    <Info size={20} />
                    <span>About</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel>USER</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/account')} tooltip="Account">
                  <Link to="/account">
                    <User size={20} />
                    <span>Account</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/settings')} tooltip="Settings">
                  <Link to="/settings">
                    <Settings size={20} />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter>
          <div className="p-2 text-xs text-muted-foreground">
            Clothify v1.0.0
          </div>
        </SidebarFooter>
        
        {/* Add the rail to make the sidebar resizable/expandable when collapsed */}
        <SidebarRail />
      </Sidebar>
      
      {/* Add a floating expand button that shows only when sidebar is collapsed */}
      {state === "collapsed" && (
        <div className="fixed left-0 top-5 z-20 ml-2 md:flex hidden">
          <Button 
            size="icon" 
            variant="outline" 
            onClick={toggleSidebar} 
            className="rounded-full h-8 w-8 bg-background shadow-md"
          >
            <ChevronRight size={16} />
            <span className="sr-only">Expand Sidebar</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default CollapsibleSidebar;
