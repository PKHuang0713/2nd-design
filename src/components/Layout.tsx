
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { SidebarProvider } from './ui/sidebar';
import CollapsibleSidebar from './CollapsibleSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Don't show sidebar/navbar on auth pages
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-wardrobe-background flex w-full">
        {!isAuthPage && <CollapsibleSidebar />}
        <div className="flex-1 flex flex-col">
          {!isAuthPage && <Navbar />}
          <main className="flex-grow p-6">
            <div className="page-transition">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
