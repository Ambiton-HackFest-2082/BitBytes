import { createContext, useEffect, useState } from "react";
import useAuth from "../services/userService";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[loading, setLoading] = useState(true)
  const [requests, setRequests] = useState(null)

  const auth = useAuth({setLoading, setUser})

  useEffect(()=>{
    auth.checkAuthStatus()
  },[])

  const contextData = {
    loading,
    setLoading,
    user,
    setUser,
    requests,
    setRequests,
    auth
  };

  return (
    <MyContext.Provider value={contextData}>{children}</MyContext.Provider>
  );
};

export default MyContext;
