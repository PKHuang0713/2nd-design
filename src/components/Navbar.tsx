
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 border-b border-border bg-white">
      <div className="flex items-center justify-between h-full px-6">
        <div className="lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <img src="/lovable-uploads/52ab9fb4-a88b-4dfa-b07c-e7107854cc01.png" alt="Clothify Logo" className="h-8" />
            <span className="font-semibold text-lg">Clothify</span>
          </Link>
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
