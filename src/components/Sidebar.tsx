
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shirt, Home, Brain, Info, User, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-border">
      <div className="h-16 border-b border-border flex items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <Shirt className="w-6 h-6 text-wardrobe-blue" />
          <span className="font-semibold text-lg">ClothWise</span>
        </Link>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <SidebarItem 
            to="/home" 
            icon={<Home size={20} />} 
            label="Home" 
            active={isActive('/home')} 
          />
          <SidebarItem 
            to="/wardrobe" 
            icon={<Shirt size={20} />} 
            label="Wardrobe" 
            active={isActive('/wardrobe')} 
          />
          <SidebarItem 
            to="/ai" 
            icon={<Brain size={20} />} 
            label="AI Suggestions" 
            active={isActive('/ai')} 
          />
          <SidebarItem 
            to="/about" 
            icon={<Info size={20} />} 
            label="About" 
            active={isActive('/about')} 
          />
        </ul>
        
        <div className="pt-8">
          <div className="text-xs font-semibold text-muted-foreground mb-2 px-3">
            USER
          </div>
          <ul className="space-y-2">
            <SidebarItem 
              to="/account" 
              icon={<User size={20} />} 
              label="Account" 
              active={isActive('/account')} 
            />
            <SidebarItem 
              to="/settings" 
              icon={<Settings size={20} />} 
              label="Settings" 
              active={isActive('/settings')} 
            />
          </ul>
        </div>
      </nav>
    </aside>
  );
};

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

export default Sidebar;
