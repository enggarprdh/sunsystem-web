import { Routes, Route, Navigate } from 'react-router-dom'
import { RouteGuard } from './components/ProtectedRoute'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import { useAuth } from './contexts/AuthContext'

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

    const routes = [
        {
            path: '/home',
            element: <HomePage />,
        },
        {
            path: '/login',
            element: <LoginPage />,
        }
    ]

  return (
    <Routes>

        {routes.map((route) => 
                <Route element={<RouteGuard isProtected={route.path.toLowerCase() == '/login' ? false : true } />}>
                    <Route path={route.path} element={route.element} />
        
                </Route>
        )}
            

      
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
