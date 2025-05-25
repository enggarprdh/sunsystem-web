import { Routes, Route, Navigate } from 'react-router-dom'
import { RouteGuard } from './components/ProtectedRoute'
import Layout from './components/layout'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import CategoryPage from './pages/category'
import { useAuth } from './contexts/AuthContext'

// Placeholder pages for new routes
const DashboardPage = () => <div>Dashboard Page</div>
const MasterItemPage = () => <div>Master Item Page</div>
const MasterCategoryPage = () => <div>Master Category Page</div>
const SettingsPage = () => <div>Settings Page</div>

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  // Public routes (available without authentication)
  const publicRoutes = [
    {
      path: '/login',
      element: <LoginPage />,
    }
  ]

  // Protected routes (require authentication)
  const protectedRoutes = [
    {
      path: '/home',
      element: <HomePage />,
    },
    {
      path: '/dashboard',
      element: <DashboardPage />,
    },
    {
      path: '/master/item',
      element: <MasterItemPage />,
    },
    {
      path: '/master/category',
      element: <MasterCategoryPage />,
    },
    {
      path: '/settings',
      element: <SettingsPage />,
    },
    {
      path: '/category',
      element: <CategoryPage />,
    }
  ]

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
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        } 
      />
    </Routes>
  )
}

export default AppRoutes
