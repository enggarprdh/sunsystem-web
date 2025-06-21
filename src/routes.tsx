import React, { Suspense, Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RouteGuard } from './components/ProtectedRoute'
import Layout from './components/layout'
import LoginPage from './pages/login'
import { useAuth } from './contexts/AuthContext'

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

  // Public routes (available without authentication)
  const publicRoutes = [
    {
      path: '/login',
      element: <LoginPage />,
    }
  ]
  // Define static route components
  const LazyHomePage = React.lazy(() => import('./pages/home'));
  const LazyUserPage = React.lazy(() => import('./pages/users'));
  const LazyRolePage = React.lazy(() => import('./pages/roles'));
  const LazyRoleFormPage = React.lazy(() => import('./pages/roles/rolesForm'));
  const LazyRolePrivilegePage = React.lazy(() => import('./pages/roleprivileges'));
  const LazyCategoryPage = React.lazy(() => import('./pages/category'));
  

  // Define protected routes using static object array
  const protectedRoutes = [
    {
      path: '/home',
      element: (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <LazyHomePage />
          </Suspense>
        </ErrorBoundary>
      )
    },
    {
      path: '/users',
      element: (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <LazyUserPage />
          </Suspense>
        </ErrorBoundary>
      )
    },
    {
      path: '/roles',
      element: (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <LazyRolePage />
          </Suspense>
        </ErrorBoundary>
      )
    },
    {
      path: '/roles/add',
      element: (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <LazyRoleFormPage />
          </Suspense>
        </ErrorBoundary>
      )
    },
    {
      path: '/roles/edit/:id',
      element: (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <LazyRoleFormPage />
          </Suspense>
        </ErrorBoundary>
      )
    },
    {
      path: '/roleprivileges',
      element: (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <LazyRolePrivilegePage />
          </Suspense>
        </ErrorBoundary>
      )
    },
    {
      path: '/category',
      element: (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <LazyCategoryPage />
          </Suspense>
        </ErrorBoundary>
      )
    }
  ];

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
