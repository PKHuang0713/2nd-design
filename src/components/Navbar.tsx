
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 border-b border-border bg-white">
      <div className="flex items-center justify-between h-full px-6">
        <div className="w-[320px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
          <Link to="/account" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
            <div className="w-8 h-8 rounded-full bg-wardrobe-blue flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">John Doe</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
