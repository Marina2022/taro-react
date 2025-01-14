import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout.jsx";
import Onboarding from "@/pages/Onboarding.jsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.jsx";
import Home from "@/pages/Home.jsx";
import Ask from "@/pages/Ask.jsx";
import System from "@/pages/System.jsx";
import AuthContextProvider, {useUserAuth} from "@/context/authContext.jsx";
import {useEffect, useState} from "react";


function App() {

  const {setUser, setIsUserLoading, setNatalChartCreated} = useUserAuth()
    
  useEffect(() => {
    const fetchUserProfile = async () => {      
      try {
        setIsUserLoading(true)
        const response = await fetch('https://my.aspectum.app/api/profile/', {
          method: 'GET',
          credentials: 'include',
        })        
        if (response.redirected !== true) {
          console.log('Юзер авторизован!')
          const user  = await response.json();
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
      } catch(err) {
        console.log(err)
      } finally {
        setIsUserLoading(false)
      }
      
      
    }

    fetchUserProfile()
    
  }, [])
 
 

return (
    <Router>
      <Routes>
        <Route path='/onboarding' element={<Onboarding/>}/>
        <Route path='/system' element={<System/>}/>
        <Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/ask' element={<Ask/>}/>
          <Route path='*' element={<div>Not found</div>}/>
        </Route>
      </Routes>
    </Router>
);
}

export default App
