import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [credit, setCredit] = useState(0);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/users/`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = { user, setUser, backendUrl, credit, setCredit };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
