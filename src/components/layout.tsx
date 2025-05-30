import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './navbar/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export function Layout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    // Function to be called by sidebar when its state changes
  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };
  
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
          2xl:p-[15px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default Layout;