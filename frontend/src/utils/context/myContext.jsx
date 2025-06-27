import { createContext, useEffect, useState } from "react";
import useAuth from "../services/userService";
import useOffer from "../services/offerService";
import usePost from "../services/postService";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[loading, setLoading] = useState(true)
  const [requests, setRequests] = useState(null)

  const auth = useAuth({setLoading, setUser})
  const offerDb =  useOffer()
  const postDb = usePost()

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
    auth,
    offerDb,
    postDb
  };

  return (
    <MyContext.Provider value={contextData}>{children}</MyContext.Provider>
  );
};

export default MyContext;
