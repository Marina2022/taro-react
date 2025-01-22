import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout.jsx";
import Onboarding from "@/pages/Onboarding.jsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.jsx";
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

function App() {

  const {setUser, setIsUserLoading, setNatalChartCreated, situations} = useAuthContext()

  const {fetchSituations} = useAppContext()
  
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

    fetchUserProfile()    
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
            <Route path='/today' element={<Today/>}/>
            <Route path='/natal' element={<Natal/>}>
              <Route path='/natal' index element={<Chart/>}/>
              <Route path='/natal/description/:feature' element={<NatalFeaturePage/>}/>
            </Route>
            <Route path='*' element={<div className='container'>Not found</div>}/>
          </Route>
        </Routes>
      </Router>
    </>

  )
}

export default App
