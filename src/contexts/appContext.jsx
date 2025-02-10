import {createContext, useContext, useEffect, useRef, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";

const AppContext = createContext()
const ContextProvider = ({children}) => {

  const [situations, setSituations] = useState(null)
  const [isSituationsLoading, setIsSituationsLoading] = useState(true)

  const [tarotLayouts, setTarotLayouts] = useState(null)
  const [areTarotLayoutsLoading, setAreTarotLayoutsLoading] = useState(null)

  const [dayQuality, setDayQuality] = useState()
  const [isDayLoading, setIsDayLoading] = useState(true)
    
  const fetchSituations = async () => {

    try {
      setIsSituationsLoading(true)
      const response = await axiosInstance('api/orders/peek/')
      setSituations(response?.data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsSituationsLoading(false)
    }
  }

  return (
    <AppContext.Provider
      value={{
        situations,
        fetchSituations,
        isSituationsLoading,
        tarotLayouts,
        setTarotLayouts,
        areTarotLayoutsLoading,
        setAreTarotLayoutsLoading,
        dayQuality, 
        setDayQuality,
        isDayLoading, 
        setIsDayLoading
      }}>
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
