import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './navbar/sidebar';
import { useAuth } from '@/contexts/AuthContext';

export function Layout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 bg-muted p-[6px] pl-20 sm:pl-24 lg:pl-6 sm:p-3 md:p-4 lg:p-6 xl:p-8 2xl:p-[15px] flex items-start overflow-auto no-scrollbar">
        <main className="w-full bg-card rounded-xl p-[6px] sm:p-3 md:p-4 lg:p-6 xl:p-8 2xl:p-[15px]">
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