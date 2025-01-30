import {createContext, useContext, useEffect, useRef, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";

const AppContext = createContext()
const ContextProvider = ({children}) => {

  const [situations, setSituations] = useState(null)
  const [currentTimer, setCurrentTimer] = useState(null)
  const [isSituationsLoading, setIsSituationsLoading] = useState(true)

  const [tarotLayouts, setTarotLayouts] = useState(null)
  const [areTarotLayoutsLoading, setAreTarotLayoutsLoading] = useState(null)

  useEffect(() => {
    // если объект из запроса peek пришел, то обновляем значение таймера 
    if (situations) setCurrentTimer(situations.seconds_left)
  }, [situations])


  let intervalId = useRef()

  useEffect(() => {
    if (currentTimer > 0) {
      intervalId.current = setInterval(() => {
        setCurrentTimer((prev) => {
          if (prev === 0) {
            clearInterval(intervalId.current); // Остановка таймера, когда значение достигло 0
            return 0;
          }
          return prev - 1; // Уменьшение таймера
        });
      }, 1000);
      return () => clearInterval(intervalId.current);
    }
  }, [currentTimer]);

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
        currentTimer,
        isSituationsLoading,
        tarotLayouts,
        setTarotLayouts,
        areTarotLayoutsLoading,
        setAreTarotLayoutsLoading
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
