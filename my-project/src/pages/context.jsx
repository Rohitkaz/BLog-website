import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
// Create a context with 'false' as the default value
const AuthContext = createContext();
export const useAuthcontext = () => {
  return useContext(AuthContext);
};
export const Contextprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        console.log("hiya hai");
        const res = await axios.get(`http://localhost:8000/isAuthenticated`, {
          withCredentials: true,
        });
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    isAuthenticated();
  }, [location.pathname]);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
