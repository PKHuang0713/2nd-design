
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Home, Shirt, Brain, Info, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="wardrobe-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shirt className="w-6 h-6 text-wardrobe-blue" />
            <span className="font-semibold text-lg">ClothWise</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" icon={<Home className="w-4 h-4" />} active={isActive('/')}>
              Home
            </NavLink>
            <NavLink to="/wardrobe" icon={<Shirt className="w-4 h-4" />} active={isActive('/wardrobe')}>
              Wardrobe
            </NavLink>
            <NavLink to="/ai" icon={<Brain className="w-4 h-4" />} active={isActive('/ai')}>
              AI Suggestions
            </NavLink>
            <NavLink to="/about" icon={<Info className="w-4 h-4" />} active={isActive('/about')}>
              About
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/account" className="p-2 rounded-full hover:bg-muted transition-colors">
              <User className="w-5 h-5 text-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, active, children }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
        active
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default Navbar;
