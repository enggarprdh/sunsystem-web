import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './navbar/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useCallback, memo } from 'react';
import React from 'react';

// Komponen yang dibungkus dengan React.memo untuk mencegah re-render yang tidak perlu
const PageContent = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
});

export function Layout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    // Function to be called by sidebar when its state changes
  const handleSidebarCollapse = useCallback((collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  }, []);
  
  if (!isAuthenticated) {
    return <Outlet />;
  }
    
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar onCollapsedChange={handleSidebarCollapse} />      <div className={`flex-1 bg-muted flex flex-col overflow-auto no-scrollbar
        p-0 pt-0 
        sm:p-0 sm:pl-20 
        md:p-3 md:pl-22
        lg:p-4 ${isSidebarCollapsed ? 'lg:pl-28' : 'lg:pl-72'} 
        xl:p-6 ${isSidebarCollapsed ? 'xl:pl-28' : 'xl:pl-72'}
        2xl:p-[15px] ${isSidebarCollapsed ? '2xl:pl-28' : '2xl:pl-72'}`}>          <main className="w-full h-full flex-1 
          rounded-none 
          p-0 m-0
          sm:rounded-xl
          sm:p-4 
          md:p-4 
          lg:p-6 
          xl:p-8 
          2xl:p-[15px]">          <PageContent key={location.key}>
            <Outlet />
          </PageContent>
        </main>
      </div>
    </div>
  );
}

export default Layout;