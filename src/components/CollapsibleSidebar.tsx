
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
  SidebarGroup
} from './ui/sidebar';
import { Shirt, Home, Brain, Info, User, Settings, ChevronLeft } from 'lucide-react';

const CollapsibleSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
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
    </Sidebar>
  );
};

export default CollapsibleSidebar;
