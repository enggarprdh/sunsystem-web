import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';
import {
  LayoutDashboard,
  BarChart2,
  Bell,
  Heart,
  Wallet,
  LogOut,
  Moon,
  Sun,
  Menu,
  Search,
  ArrowLeft,
  ArrowRight,
  BookText,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Revenue',
    href: '/revenue',
    icon: BarChart2,
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
  },
  {
    title: 'Category',
    href: '/category',
    icon: BookText,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart2,
  },
  {
    title: 'Likes',
    href: '/likes',
    icon: Heart,
  },
  {
    title: 'Wallets',
    href: '/wallets',
    icon: Wallet,
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (href: string) => location.pathname === href;

  const toggleDarkMode = () => {
    setDarkMode((v) => !v);
    document.documentElement.classList.toggle('dark');
  };

  // Mobile sidebar content
  const MobileSidebarContent = () => (
    <div className={cn(
      'flex h-full bg-white dark:bg-zinc-900 transition-all fixed left-0',
      mobileCollapsed 
        ? 'w-16 items-center flex-col p-3' // Collapsed view
        : 'w-full flex-col p-4' // Expanded view
    )}>
      
      {/* Collapse button for mobile */}
      <Button 
        variant="info_pro"
        className={cn(
          'w-8 h-8 rounded-full items-center justify-center',
          mobileCollapsed ? 'mb-4' : 'absolute right-2 top-12'
        )}
        onClick={() => {
          setMobileCollapsed((v) => !v);
          // Jika sedang expanded dan akan di-collapse, tutup sheet
          if (!mobileCollapsed) {
            setOpen(false);
          }
        }}
        aria-label="Collapse sidebar"
        type="button"
      >
        {mobileCollapsed ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
      </Button>

      {/* Rest of mobile sidebar content */}
      {!mobileCollapsed && (
        <>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 mt-14">
            <img
              src="/user-avatar.png"
              alt="User"
              className="w-12 h-12 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700 bg-zinc-100"
              onError={e => (e.currentTarget.src = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png')}
            />
            <div>
              <div className="font-semibold text-base leading-tight text-zinc-900 dark:text-white">Stella Army</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Web developer</div>
            </div>
          </div>
          
          {/* Search */}
          <div className="mb-4">
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-3 py-2 w-full">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm flex-1 text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-400"
              />
            </div>
          </div>
          
          {/* Menu */}
          <nav className="flex-1 flex flex-col gap-1">
            {menuItems.map(({ title, href, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center rounded-lg py-3 font-medium transition-colors',
                  isActive(href)
                    ? 'bg-blue-500 text-white shadow hover:bg-blue-600'
                    : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800',
                  mobileCollapsed ? 'justify-center w-10 h-10 p-0' : 'gap-3 px-3',
                  'group'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} />
                {!mobileCollapsed && <span>{title}</span>}
              </Link>
            ))}
          </nav>
          
          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
            {/* Logout button */}
            <Button
              onClick={logout}
              variant="info_pro"
              className={cn(
                mobileCollapsed ? 'p-2 w-8 h-8' : 'flex items-center gap-2'
              )}
            >
              <LogOut className="w-5 h-5" />
              {!mobileCollapsed && <span>Logout</span>}
            </Button>
            
            {/* Dark mode toggle */}
            {mobileCollapsed ? (
              <div className="flex items-center">
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                  aria-label="Toggle dark mode"
                />
                <span className="ml-2">
                  {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-zinc-500" />}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-lg px-3 py-3 bg-zinc-100 dark:bg-zinc-800">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                  aria-label="Toggle dark mode"
                  className="ml-auto"
                >
                  <span className="sr-only">Toggle dark mode</span>
                </Switch>
                <span className="ml-2">
                  {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-zinc-500" />}
                </span>
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Collapsed view - only show icons */}
      {mobileCollapsed && (
        <nav className="flex flex-col items-center gap-4 mt-14">
          {menuItems.map(({ href, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
                isActive(href)
                  ? 'bg-blue-500 text-white'
                  : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
          <Button
            variant="ghost"
            className="w-10 h-10 p-0"
            onClick={() => setOpen(false)}
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </nav>
      )}
    </div>
  );

  // Desktop sidebar content
  const DesktopSidebarContent = () => (
    <div
      className={cn(
        'flex flex-col h-full rounded-2xl shadow-xl bg-white dark:bg-zinc-900 transition-all',
        'w-64',
        collapsed && 'w-20',
        'p-4',
        'relative',
        'my-4',
        'min-h-[90vh]'
      )}
      style={{ minWidth: collapsed ? 80 : 256, maxWidth: collapsed ? 80 : 256 }}
    >
      {/* Collapse button */}
      <Button 
        variant="info_pro"
        className="absolute -right-4 top-8 w-8 h-8 rounded-full items-center justify-center transition"
        onClick={() => setCollapsed((v) => !v)}
        aria-label="Collapse sidebar"
        type="button"
      >
        {collapsed ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
      </Button>
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src="/user-avatar.png"
          alt="User"
          className="w-12 h-12 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700 bg-zinc-100"
          onError={e => (e.currentTarget.src = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png')}
        />
        {!collapsed && (
          <div>
            <div className="font-semibold text-base leading-tight text-zinc-900 dark:text-white">Stella Army</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Web developer</div>
          </div>
        )}
      </div>
      
      {/* Search */}
      <div className={cn('mb-4', collapsed && 'justify-center flex')}> 
        <div className={cn(
          'flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-3 py-2 w-full',
          collapsed && 'w-10 h-10 p-0 justify-center'
        )}>
          <Search className="w-4 h-4 text-zinc-400" />
          {!collapsed && <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm flex-1 text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-400"
          />}
        </div>
      </div>
      
      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map(({ title, href, icon: Icon }) => (
          <Link
            key={href}
            to={href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-3 font-medium transition-colors',
              isActive(href)
                ? 'bg-blue-500 text-white shadow hover:bg-blue-600'
                : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800',
              collapsed && 'justify-center px-2',
              'group'
            )}
          >
            <Icon className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} />
            {!collapsed && <span>{title}</span>}
          </Link>
        ))}
      </nav>
      
      {/* Footer */}
      <div className={cn('mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2')}> 
        <Button
          onClick={logout}
          variant="info_pro"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </Button>
        <div
          className={cn(
            'flex items-center justify-between rounded-lg px-3 py-3',
            !collapsed && 'bg-zinc-100 dark:bg-zinc-800',
            collapsed && 'justify-center px-2'
          )}
        >
          {!collapsed && <span className="text-xs text-zinc-500 dark:text-zinc-400">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          <Switch
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
            aria-label="Toggle dark mode"
            className={cn('ml-auto', collapsed && 'mx-auto')}
          >
            <span className="sr-only">Toggle dark mode</span>
          </Switch>
          <span className="ml-2">
            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-zinc-500" />}
          </span>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar with Sheet component
  const MobileSidebar = (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-zinc-900 shadow border border-zinc-200 dark:border-zinc-700">
          <Menu className="h-6 w-6 text-zinc-700 dark:text-zinc-200" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-transparent border-none">
        <MobileSidebarContent />
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {/* Mobile Sidebar - Only show toggle button by default */}
      <div className="lg:hidden">
        {MobileSidebar}
      </div>
      
      {/* Desktop Sidebar - Fully hidden on mobile */}
      <div className="hidden lg:block">
        <DesktopSidebarContent />
      </div>
    </>
  );
}