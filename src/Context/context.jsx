import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  // Initialize state from localStorage immediately
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return {
      isAuthenticated: !!token,
      user: user ? JSON.parse(user) : null,
      loading: false, // Start with false since we check synchronously first
    };
  });

  // Memoized auth check function
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthState(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      setAuthState(prev => ({ ...prev, loading: false }));
      
   
      const response = await Promise.race([
        axios.get(
          "https://jainam-hospital-backend.onrender.com/api/v1/user/patient/me",
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000 // 5 second timeout
          }
        ),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 5000)
        )
      ]);

      if (response.data.success) {
        setAuthState({
          isAuthenticated: true,
          user: response.data.user || JSON.parse(localStorage.getItem("user")),
          loading: false
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false
      });
    }
  }, []);

  // Debounced version of checkAuth
  useEffect(() => {
    const timer = setTimeout(() => {
      checkAuth();
    }, 300); // Small delay to prevent immediate check on mount

    return () => clearTimeout(timer);
  }, [checkAuth]);

  // Optimized value object
  const contextValue = {
    ...authState,
    setIsAuthenticated: (value) => setAuthState(prev => ({ ...prev, isAuthenticated: value })),
    setUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      setAuthState(prev => ({ ...prev, user }));
    },
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false
      });
    }
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};