import { createContext, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [user, setUserr] = useState(null);

  const contextData = {
    user,
    setUserr,
  };

  return (
    <MyContext.Provider value={contextData}>{children}</MyContext.Provider>
  );
};

export default MyContext;
