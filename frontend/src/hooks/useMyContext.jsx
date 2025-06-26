import { useContext } from "react";
import MyContext from "../utils/context/myContext";

const useMyContext = () => {
    return useContext(MyContext)
}

export default useMyContext