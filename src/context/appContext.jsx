import {createContext, useContext, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";

const AppContext = createContext()
const ContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [natalChartCreated, setNatalChartCreated] = useState(false)
  
  const [situations, setSituations] = useState(null)
  
  const fetchSituations = async() => {
    const response = await axiosInstance('situations/peek/')    
    setSituations(response.data)
  }

  return (
    <AppContext.Provider
      value={{user, setUser, isUserLoading, setIsUserLoading, natalChartCreated, setNatalChartCreated, situations, fetchSituations}}>
        {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) throw new Error('Context was used outside provider')
  return context
}

export default ContextProvider
