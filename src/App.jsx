import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout.jsx";
import Onboarding from "@/pages/Onboarding.jsx";
import ProtectedRoute from "@/components/ui/ProtectedRoute/ProtectedRoute.jsx";
import Home from "@/pages/Home.jsx";
import AskAstrologer from "@/pages/AskAstrologer.jsx";
import System from "@/pages/System.jsx";
import {useEffect} from "react";
import Natal from "@/components/NatalPage/NatalPage.jsx";
import Chart from "@/components/NatalPage/Chart/Chart.jsx";
import Today from "@/pages/Today.jsx";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop.jsx";
import {useAuthContext} from "@/contexts/authContext.jsx";
import {useAppContext} from "@/contexts/appContext.jsx";
import NatalFeaturePage from "@/components/NatalFeaturePage/NatalFeaturePage.jsx";
import AstrologerAnswer from "@/pages/AstrologerAnswer.jsx";
import AskTaro from "@/pages/AskTaro.jsx";
import AskTaroOrderPage from "@/components/AskTaroOrderPage/AskTaroOrderPage.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import TaroAnswerPage from "@/components/TaroAnswerPage/TaroAnswerPage.jsx";
import CompatibilitySelect from "@/components/CompatibilityPage/CompatibilitySelect/CompatibilitySelect.jsx";
import CompatibilityResult from "@/components/CompatibilityPage/CompatibilityResult/CompatibilityResult.jsx";
import CompatibilityOrder from "@/components/CompatibilityPage/CompatibilityOrder/CompatibilityOrder.jsx";
import CompatibilityQuestion from "@/components/CompatibilityPage/CompatibilityQuestion/CompatibilityQuestion.jsx";
import CompatibilityAnswer from "@/components/CompatibilityPage/CompatibilityAnswer/CompatibilityAnswer.jsx";
import Messages from "@/pages/Messages.jsx";

function App() {

  const {
    setUser,
    setIsUserLoading,
    setNatalChartCreated,
    situations
  } = useAuthContext()

  const {
    fetchSituations,
    setTarotLayouts,
    setAreTarotLayoutsLoading,
    setIsDayLoading,
    setDayQuality
  } = useAppContext()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsUserLoading(true)
        const response = await fetch('https://my.aspectum.app/api/profile/', {
          method: 'GET',
          credentials: 'include',
        })
        if (response.redirected !== true) {
          const user = await response.json();
          setUser(user)
          const natalChartCreated = localStorage.getItem('natalChartCreated')
          if (natalChartCreated) {
            setNatalChartCreated(true)
          } else {
            setNatalChartCreated(false)
          }
        } else {
          throw new Error('Ошибка при получении данных профиля');
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsUserLoading(false)
        fetchSituations()
      }
    }
    const getTarotLayouts = async () => {
      try {
        setAreTarotLayoutsLoading(true)
        const result = await axiosInstance(`api/tarot/layouts/`)
        setTarotLayouts(result.data)
      } catch (err) {
        console.log(err)
      } finally {
        setAreTarotLayoutsLoading(false)
      }
    }

    const getDay = async () => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const currentTime = new Date().toISOString();
      const payload = {
        now_dt: currentTime, timezone: timeZone
      }
      try {
        setIsDayLoading(true)
        const result = await axiosInstance.post('api/energy/day/', payload)
        setDayQuality(result.data.day_quality)
      } catch (err) {
        console.log(err)
      } finally {
        setIsDayLoading(false)
      }
    }
    
    fetchUserProfile()
    getTarotLayouts()
    getDay()
  }, [])


  return (
    <>
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path='/onboarding' element={<Onboarding/>}/>
          <Route path='/system' element={<System/>}/>
          <Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
            <Route path='/' index element={<Home/>}/>
            <Route path='/ask-astrologer' element={<AskAstrologer/>}/>
            <Route path='/astrologer-answer/:id' element={<AstrologerAnswer/>}/>
            <Route path='/day-energy' element={<Today/>}/>

            <Route path='/ask-tarot' element={<AskTaro/>}/>
            <Route path='/ask-tarot/:order' element={<AskTaroOrderPage/>}/>
            <Route path='/tarot-answer/:id' element={<TaroAnswerPage/>}/>
            
            <Route path='/messages' element={<Messages/>}/>
            
            <Route path='/natal' element={<Natal/>}>
              <Route path='/natal' index element={<Chart/>}/>
              <Route path='/natal/description/:feature' element={<NatalFeaturePage/>}/>
            </Route>

            {/*<Route path='/compatibility' element={<Compatibility/>}>*/}
              <Route path='/compatibility/select' index element={<CompatibilitySelect/>}/>
              <Route path='/compatibility/order' element={<CompatibilityOrder/>}/>
              <Route path='/compatibility/question/:id/:theme' index element={<CompatibilityQuestion/>}/>
              <Route path='/compatibility/answer/:id/:theme' index element={<CompatibilityAnswer/>}/>
              <Route path='/compatibility/result/:id' index element={<CompatibilityResult/>}/>
            {/*</Route>*/}
            
            <Route path='*' element={<div className='container'>Not found</div>}/>
          </Route>
        </Routes>
      </Router>
    </>

  )
}

export default App
