import { createContext, useState, useEffect } from 'react';
import { login, getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user from token if exists
    try {
      const token = localStorage.getItem('token');
      return token ? getCurrentUser() : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const currentUser = getCurrentUser();
        console.log('User from token:', currentUser);
        setUser(currentUser);
      } catch (error) {
        console.log('Error verifying token, using null user');
        setUser(null);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
    
    // Kiểm tra token khi focus lại tab
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        verifyToken();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const { token, email: userEmail } = await login(email, password);
      localStorage.setItem('token', token);
      const currentUser = getCurrentUser();
      setUser(currentUser);
      return { email: userEmail, roles: currentUser?.roles || [] };
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login: handleLogin, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
