import { apiLogin } from '@/api/apiAuth';
import { updateUserInfo } from '@/store/actions/user.action';
import store from '@/store/store';
import { secureStorage } from '@/utils/crypto';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Inisialisasi state isAuthenticated dengan memeriksa token di localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const userInfo = secureStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        return !!(parsedUserInfo && parsedUserInfo.token);
      } catch {
        return false;
      }
    }
    return false;
  });
  
  // Load user data from localStorage when component mounts
  useEffect(() => {
    const userInfo = secureStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        // Check if userInfo has a valid token
        if (parsedUserInfo && parsedUserInfo.token) {
          setIsAuthenticated(true);
          store.dispatch(updateUserInfo(parsedUserInfo));
        }
      } catch (error) {
        console.error('Error parsing stored user info:', error);
      }
    }
  }, []);

  // Mock login function - replace with actual API call in production
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Mock successful login
      if (username && password) {
        // Store token in localStorage
        let result = await apiLogin(username, password);
        if (!result || !result.token) {
          throw new Error('Login failed: No token received');
        }        
        // Store user info in Redux
        store.dispatch(updateUserInfo(result));
        
        // Save user info securely
        secureStorage.setItem('userInfo', JSON.stringify(result));
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
    secureStorage.removeItem('userInfo'); // Clear saved user info from localStorage
    // Reset Redux store user info
    store.dispatch(updateUserInfo({}));
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
