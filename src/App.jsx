import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout.jsx";
import Onboarding from "@/pages/Onboarding.jsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.jsx";
import Home from "@/pages/Home.jsx";
import Ask from "@/pages/Ask.jsx";
import System from "@/pages/System.jsx";


function App() {
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
