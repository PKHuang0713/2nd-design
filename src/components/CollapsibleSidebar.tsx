
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shirt, Home, Brain, Info, User, Settings, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useSidebar } from './ui/sidebar';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
          active
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
};

const CollapsibleSidebar = () => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // When sidebar is collapsed, we show a minimal version
  const isCollapsed = state === "collapsed";
  
  return (
    <>
      <aside 
        className={`${isCollapsed ? 'w-16' : 'w-64'} min-h-screen bg-white border-r border-border transition-all duration-300 ease-in-out`}
      >
        <div className="h-16 border-b border-border flex items-center px-6">
          <Link to="/" className="flex items-center gap-2">
            <Shirt className="w-6 h-6 text-wardrobe-blue" />
            {!isCollapsed && <span className="font-semibold text-lg">Clothify</span>}
          </Link>
          
          {!isCollapsed && (
            <button 
              onClick={toggleSidebar} 
              className="ml-auto p-1.5 rounded-md hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
        
        <nav className={`p-4 ${isCollapsed ? 'px-2' : ''}`}>
          <ul className="space-y-2">
            <SidebarItem 
              to="/home" 
              icon={<Home size={20} />} 
              label={isCollapsed ? "" : "Home"} 
              active={isActive('/home')} 
            />
            <SidebarItem 
              to="/wardrobe" 
              icon={<Shirt size={20} />} 
              label={isCollapsed ? "" : "Wardrobe"} 
              active={isActive('/wardrobe')} 
            />
            <SidebarItem 
              to="/ai" 
              icon={<Brain size={20} />} 
              label={isCollapsed ? "" : "AI Suggestions"} 
              active={isActive('/ai')} 
            />
            <SidebarItem 
              to="/about" 
              icon={<Info size={20} />} 
              label={isCollapsed ? "" : "About"} 
              active={isActive('/about')} 
            />
          </ul>
          
          <div className="pt-8">
            {!isCollapsed && (
              <div className="text-xs font-semibold text-muted-foreground mb-2 px-3">
                USER
              </div>
            )}
            <ul className="space-y-2">
              <SidebarItem 
                to="/account" 
                icon={<User size={20} />} 
                label={isCollapsed ? "" : "Account"} 
                active={isActive('/account')} 
              />
              <SidebarItem 
                to="/settings" 
                icon={<Settings size={20} />} 
                label={isCollapsed ? "" : "Settings"} 
                active={isActive('/settings')} 
              />
            </ul>
          </div>
        </nav>
      </aside>
      
      {/* Add a floating expand button that shows only when sidebar is collapsed */}
      {isCollapsed && (
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
