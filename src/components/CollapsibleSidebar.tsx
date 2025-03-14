
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shirt, Home, Brain, Info, User, ChevronRight, ChevronLeft, ShoppingBag, Droplets } from 'lucide-react';
import { Button } from './ui/button';
import { useSidebar } from './ui/sidebar';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active, isCollapsed }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
          active
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        } ${isCollapsed ? 'justify-center' : ''}`}
      >
        {icon}
        {!isCollapsed && <span>{label}</span>}
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
  
  const isCollapsed = state === "collapsed";
  
  const iconSize = isCollapsed ? 24 : 20;
  
  return (
    <>
      <aside 
        className={`${isCollapsed ? 'w-16' : 'w-64'} min-h-screen bg-white border-r border-border transition-all duration-300 ease-in-out`}
      >
        <div className="h-16 border-b border-border flex items-center px-6">
          <Link to="/" className={`flex items-center gap-2 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <Shirt className="w-6 h-6 text-wardrobe-blue" />
            {!isCollapsed && <span className="font-semibold text-lg">Clothify</span>}
          </Link>
          
          {!isCollapsed && (
            <button 
              onClick={toggleSidebar} 
              className="ml-auto p-1.5 rounded-md hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
        
        <nav className={`p-4 ${isCollapsed ? 'px-2' : ''}`}>
          <ul className="space-y-2">
            <SidebarItem 
              to="/home" 
              icon={<Home size={iconSize} />} 
              label="Home" 
              active={isActive('/home')} 
              isCollapsed={isCollapsed}
            />
            <SidebarItem 
              to="/wardrobe" 
              icon={<ShoppingBag size={iconSize} />} 
              label="Wardrobe" 
              active={isActive('/wardrobe')} 
              isCollapsed={isCollapsed}
            />
            <SidebarItem 
              to="/laundry" 
              icon={<Droplets size={iconSize} />} 
              label="Laundry System" 
              active={isActive('/laundry')} 
              isCollapsed={isCollapsed}
            />
            <SidebarItem 
              to="/ai" 
              icon={<Brain size={iconSize} />} 
              label="AI Suggestions" 
              active={isActive('/ai')} 
              isCollapsed={isCollapsed}
            />
            <SidebarItem 
              to="/about" 
              icon={<Info size={iconSize} />} 
              label="About" 
              active={isActive('/about')} 
              isCollapsed={isCollapsed}
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
                icon={<User size={iconSize} />} 
                label="Account" 
                active={isActive('/account')} 
                isCollapsed={isCollapsed}
              />
            </ul>
          </div>
        </nav>
      </aside>
      
      {isCollapsed && (
        <div className="fixed left-16 top-1/2 -translate-y-1/2 z-20">
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
