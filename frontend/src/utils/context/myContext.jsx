import { createContext, useEffect, useState } from "react";
import useAuth from "../services/userService";
import useOffer from "../services/offerService";
import usePost from "../services/postService";
import useChat from "../services/chatService";
import useAppoinment from "../services/appointmentService";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[loading, setLoading] = useState(true)
  const [requests, setRequests] = useState(null)

  const auth = useAuth({setLoading, setUser})
  const offerDb =  useOffer()
  const postDb = usePost()
  const chatDb = useChat()
  const appointmentDb = useAppoinment()

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
    postDb,
    chatDb,
    appointmentDb
  };

  return (
    <MyContext.Provider value={contextData}>{children}</MyContext.Provider>
  );
};

export default MyContext;
