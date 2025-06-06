import React, { Suspense, Component, useMemo } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RouteGuard } from './components/ProtectedRoute'
import Layout from './components/layout'
import LoginPage from './pages/login'
import { useAuth } from './contexts/AuthContext'
import { useSidebar } from './components/navbar/hooks/useSideBar'

// Tambahkan komponen fallback untuk loading
const LoadingFallback = () => <div className="p-4">Loading...</div>;

// Tambahkan komponen untuk error boundary
const ErrorFallback = () => <div className="p-4">Failed to load page. Please try again.</div>;

// Error Boundary Class Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}


const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const { menuItems } = useSidebar();

  // Public routes (available without authentication)
  const publicRoutes = [
    {
      path: '/login',
      element: <LoginPage />,
    }
  ]

  // Memoize protected routes generation to prevent unnecessary re-computation
  const protectedRoutes = useMemo(() => {
    let routes: { path: string, element: React.ReactElement }[] = [];
    
    // Dynamically generate protected routes based on menu items
    menuItems.forEach((item) => {
      if (item) {
        // Check if the item has a submenu
        if (item.submenu && item.submenu.length > 0) {
          item.submenu.forEach((subItem) => {
            try {
              // Perbaiki cara import dengan menyimpan path komponen
              const componentPath = `./pages${subItem.href}`;
              const LazyComponent = React.lazy(() => import(componentPath));
              const route = {
                path: subItem.href,
                element: (
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyComponent />
                    </Suspense>
                  </ErrorBoundary>
                )
              }
              routes.push(route);
            } catch (error) {
              console.error(`Failed to load route for: ${subItem.href}`, error);
            }
          });
        } else {
          try {
            // Perbaiki cara import dengan menyimpan path komponen
            const componentPath = `./pages${item.href}`;
            const LazyComponent = React.lazy(() => import(componentPath));
            const route = {
              path: item.href,
              element: (
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    <LazyComponent />
                  </Suspense>
                </ErrorBoundary>
              )
            }
            routes.push(route);
          } catch (error) {
            console.error(`Failed to load route for: ${item.href}`, error);
          }
        }
      }
    });
    
    return routes;
  }, [menuItems]);

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route) => (
        <Route 
          key={route.path}
          path={route.path} 
          element={route.element} 
        />
      ))}

      {/* Protected Routes with Layout */}
      <Route element={<RouteGuard isProtected={true} />}>
        <Route element={<Layout />}>
          {protectedRoutes.map((route) => (
            <Route 
              key={route.path}
              path={route.path} 
              element={route.element} 
            />
          ))}
        </Route>
      </Route>
      
      {/* Default route - redirects based on authentication status */}
      <Route 
        path="*" 
        element={
          <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
        } 
      />
    </Routes>
  )
}

export default AppRoutes
