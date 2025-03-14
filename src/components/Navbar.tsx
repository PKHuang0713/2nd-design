
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 border-b border-border bg-white">
      <div className="flex items-center justify-end h-full px-6">
        <div className="flex items-center">
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
