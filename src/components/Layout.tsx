
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Don't show navbar on auth pages
  const hideNavbar = ['/signin', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-wardrobe-background flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">
        <div className="page-transition">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
