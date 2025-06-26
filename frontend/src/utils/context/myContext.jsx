import { createContext, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [user, setUserr] = useState(null);
  const [requests, setRequests] = useState(null)

  const contextData = {
    user,
    setUserr,
    requests,
    setRequests
  };

  return (
    <MyContext.Provider value={contextData}>{children}</MyContext.Provider>
  );
};

export default MyContext;
