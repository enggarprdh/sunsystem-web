import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    // Check if user token exists in localStorage when app initializes
    localStorage.getItem('userToken') !== null
  );

  // Mock login function - replace with actual API call in production
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Mock successful login
      if (username && password) {
        // Store token in localStorage
        localStorage.setItem('userToken', 'mock-jwt-token');
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
