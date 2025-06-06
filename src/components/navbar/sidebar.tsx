import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent
} from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  LogOut,
  Moon,
  Sun,
  Menu,
  Search,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useSelector } from 'react-redux';
import IconFromDB from './icon';
import { useSidebar } from '@/components/navbar/hooks/useSideBar';

interface MenuItem {
  title: string;
  href: string;
  icon: string;
  submenu?: { 
    title: string; 
    href: string;
  }[];
}

interface SidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

export default function Sidebar({ onCollapsedChange }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileCollapsed] = useState(false);  // This state value is now read-only
  const [darkMode, setDarkMode] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const { logout } = useAuth();  
  const userProfileState = useSelector((state: any) => state.user.userInfo);
  const { menuItems } = useSidebar();
  
  // Notify parent component when collapsed state changes
  const handleCollapsedChange = (newCollapsedState: boolean) => {
    setCollapsed(newCollapsedState);
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsedState);
    }
  };

  // Fixed isActive function to prevent multiple active menu items
  const isActive = (href: string) => {
    // For exact route matches
    if (location.pathname === href) return true;
    
    // For parent routes like /users when we're on /users/add
    if (location.pathname.startsWith(href + '/')) {
      // Get all menu items with their submenus flattened into one array
      const allMenuPaths = menuItems.flatMap((item: MenuItem) => {
        const itemPaths = [item.href];
        if (item.submenu) {
          itemPaths.push(...item.submenu.map((sub: {href: string}) => sub.href));
        }
        return itemPaths;
      });
      
      // Check if current path matches a submenu item directly
      const isSubmenuItem = allMenuPaths.some((path: string) => 
        path !== href && // Not the current item
        location.pathname.startsWith(path) && // Current location starts with this path
        path.startsWith(href) // This path is a child of current item
      );
      
      return !isSubmenuItem;
    }
    
    return false;
  };

  const toggleDarkMode = () => {
    setDarkMode((v) => !v);
    document.documentElement.classList.toggle('dark');
  };
  
  const toggleSubmenu = (title: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  
  // Mobile sidebar content
  const MobileSidebarContent = () => (
    <div className={cn(
      'flex h-full bg-white dark:bg-zinc-900 transition-all',
      mobileCollapsed 
        ? 'w-16 items-center flex-col p-3' // Collapsed view
        : 'w-full flex-col p-4', // Expanded view
      'rounded-r-xl' // Add rounded corners on right side
    )}>
        {/* Close button for mobile */}
      <Button 
        variant="info_pro"
        className={cn(
          'w-8 h-8 rounded-full items-center justify-center',
          mobileCollapsed ? 'mb-4' : 'absolute right-2 top-12'
        )}
        onClick={() => setOpen(false)}
        aria-label="Close sidebar"
        type="button"
      >
        <ArrowLeft className="w-4 h-4" />
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
            {menuItems.map(({ title, href, icon: Icon, submenu }) => (
              <div key={href} className="flex flex-col">
                {submenu ? (
                  <>
                    <div
                      className={cn(
                        'flex items-center rounded-lg py-3 font-medium transition-colors cursor-pointer',
                        isActive(href)
                          ? 'bg-blue-500 text-white shadow hover:bg-blue-600'
                          : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800',
                        mobileCollapsed ? 'justify-center w-10 h-10 p-0' : 'gap-3 px-3',
                        'group'
                      )}
                      onClick={() => !mobileCollapsed && toggleSubmenu(title)}
                    >
                      {/* <Icon className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} /> */}
                      <IconFromDB iconName={Icon} className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} />
                      {/* Title and chevron icons */}
                      {!mobileCollapsed && (
                        <>
                          <span className="flex-1">{title}</span>
                          {expandedMenus[title] ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                        </>
                      )}
                    </div>
                    {!mobileCollapsed && expandedMenus[title] && (
                      <div className="ml-9 flex flex-col gap-1 mt-1 mb-1">
                        {submenu.map(subItem => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              'flex items-center rounded-lg px-3 py-2 text-sm transition-colors',
                              isActive(subItem.href)
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                                : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            )}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
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
                    {/* <Icon className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} /> */}
                    <IconFromDB iconName={Icon} className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} />
                    {!mobileCollapsed && <span>{title}</span>}
                  </Link>
                )}
              </div>
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
          {menuItems.map(({ href, icon: Icon, submenu, title }) => (
            <div key={href} className="flex flex-col items-center">
              {submenu ? (
                <div
                  className={cn(
                    'w-10 h-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer',
                    isActive(href)
                      ? 'bg-blue-500 text-white'
                      : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  )}
                  onClick={() => toggleSubmenu(title)}
                >
                  {/* <Icon className="w-5 h-5" /> */}
                  <IconFromDB iconName={Icon} className="w-5 h-5" />
                </div>
              ) : (
                <Link
                  to={href}
                  className={cn(
                    'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
                    isActive(href)
                      ? 'bg-blue-500 text-white'
                      : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  )}
                >
                  {/* <Icon className="w-5 h-5" /> */}
                  <IconFromDB iconName={Icon} className="w-5 h-5" />
                </Link>
              )}
            </div>
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
  );  // Desktop sidebar content
  const DesktopSidebarContent = () => {
    const [collapsedActiveSubmenu, setCollapsedActiveSubmenu] = useState<string | null>(null);
    
    return (
    <div
      className={cn(
        'flex flex-col h-full bg-white dark:bg-zinc-900 transition-all',
        'w-full',
        'p-4',
        'relative',
        'min-h-[90vh]'
      )}
    >{/* Collapse button - for width toggle only */}      <Button 
        variant="info_pro"
        className="absolute -right-4 top-8 w-8 h-8 rounded-full items-center justify-center transition"
        onClick={() => handleCollapsedChange(!collapsed)}
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
            <div className="font-semibold text-base leading-tight text-zinc-900 dark:text-white">{userProfileState?.userName || 'User'}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{userProfileState?.role || 'User'}</div>
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
      
      {/* Menu */}      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map(({ title, href, icon: Icon, submenu }) => (
          <div key={href} className="flex flex-col">            {submenu ? (
              <>
                {collapsed ? (
                  // Tampilkan Popover untuk submenu saat sidebar collapsed
                  <Popover
                    open={collapsedActiveSubmenu === title}
                    onOpenChange={(open) => {
                      if (open) {
                        setCollapsedActiveSubmenu(title);
                      } else if (collapsedActiveSubmenu === title) {
                        setCollapsedActiveSubmenu(null);
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <div
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-2 py-3 font-medium transition-colors cursor-pointer justify-center',
                          isActive(href)
                            ? 'bg-blue-500 text-white shadow hover:bg-blue-600'
                            : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800',
                          'group'
                        )}
                      >
                        {/* <Icon className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} /> */}
                        <IconFromDB iconName={Icon} className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="p-1 w-auto min-w-[180px]" 
                      align="start" 
                      side="right" 
                      sideOffset={5}
                    >
                      <div className="flex flex-col gap-1">
                        {submenu.map(subItem => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className={cn(
                              'flex items-center rounded-lg px-3 py-2 text-sm transition-colors',
                              isActive(subItem.href)
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                                : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            )}
                            onClick={() => setCollapsedActiveSubmenu(null)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  // Tampilan normal untuk submenu saat sidebar expanded
                  <>
                    <div
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-3 font-medium transition-colors cursor-pointer',
                        isActive(href)
                          ? 'bg-blue-500 text-white shadow hover:bg-blue-600'
                          : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800',
                        'group'
                      )}
                      onClick={() => toggleSubmenu(title)}
                    >
                      {/* <Icon className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} /> */}
                      <IconFromDB iconName={Icon} className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} />
                      <span className="flex-1">{title}</span>
                      {expandedMenus[title] ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                      }
                    </div>
                    {expandedMenus[title] && (
                      <div className="ml-9 flex flex-col gap-1 mt-1 mb-1">
                        {submenu.map(subItem => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className={cn(
                              'flex items-center rounded-lg px-3 py-2 text-sm transition-colors',
                              isActive(subItem.href)
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                                : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            )}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <Link
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
                {/* <Icon className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} /> */}
                <IconFromDB iconName={Icon} className={cn('w-5 h-5', isActive(href) ? 'text-white' : 'text-zinc-400 group-hover:text-blue-500')} />
                {!collapsed && <span>{title}</span>}
              </Link>
            )}
          </div>
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
          </Switch>          <span className="ml-2">
            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-zinc-500" />}
          </span>
        </div>      </div>
    </div>
  );
};
  
  // Mobile sidebar with Sheet component and hamburger menu always visible
  const MobileSidebar = (
    <>
      {/* Hamburger menu button - always visible */}
      <Button 
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-zinc-900 shadow border border-zinc-200 dark:border-zinc-700"
      >
        <Menu className="h-6 w-6 text-zinc-700 dark:text-zinc-200" />
      </Button>
      
      {/* Sheet for sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent 
          side="left" 
          className={cn(
            "p-0 bg-transparent border-none transition-transform",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <MobileSidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );  // Desktop sidebar with Sheet component (always visible, just transitions width)
  const DesktopSidebar = (
    <div className="hidden lg:block">
      <Sheet open={true}>
        <SheetContent 
          side="left" 
          className={cn(
            "p-0 bg-transparent border-none transition-all duration-300",
            collapsed ? "!w-20 !max-w-20" : "!w-64 !max-w-64",
            "!shadow-xl !rounded-2xl !my-4 !overflow-visible"
          )}
        >
          <DesktopSidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  );
  return (
    <>
      {/* Mobile Sidebar with toggle button */}
      <div className="lg:hidden">
        {MobileSidebar}
      </div>
      
      {/* Desktop Sidebar with Sheet component */}
      {DesktopSidebar}
    </>
  );
}
