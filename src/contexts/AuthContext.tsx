import { apiLogin } from '@/api/apiAuth';
import { setUserInfo, setToken, setMenu } from '@/app/dataSlicePersisted';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type AuthContextType = {
  // isAuthenticated: boolean;
  userInfo:{};
  token:{};
  menu:[],
  isAuthenticated?: boolean; // Optional for backward compatibility
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const {userInfo, token, menu } = useSelector((state:any)=> state.dataSlicePersisted);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(token?.token));
  
  useEffect(() => {
    setIsAuthenticated(Boolean(token?.token));
  }, [token]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      if (username && password) {
        let result = await apiLogin(username, password);
        if (!result || !result.token) {
          throw new Error('Login failed: No token received');
        }        
        const userInfo = {
          userName: result.userName,
          role: result.role,
        }
        dispatch(setUserInfo(userInfo));

        const token = {
          token:result.token,
          refreshToken: result.refreshToken,
        }
        dispatch(setToken(token));

        const menu = result.menu || [];
        dispatch(setMenu(menu));

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
    dispatch(setUserInfo({}));
    dispatch(setToken({}));
    dispatch(setMenu([]));
    
  };

  return (
    <AuthContext.Provider value={{ userInfo, token,menu, isAuthenticated, login, logout }}>
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
