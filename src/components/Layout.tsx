
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Don't show sidebar/navbar on auth pages
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-wardrobe-background flex">
      {!isAuthPage && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <main className="flex-grow p-6">
          <div className="page-transition">
            {children}
          </div>
        </main>
        {!isAuthPage && <Navbar />}
      </div>
    </div>
  );
};

export default Layout;
