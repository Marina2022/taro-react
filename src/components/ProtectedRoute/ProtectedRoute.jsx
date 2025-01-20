import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useAppContext} from "@/context/appContext.jsx";

const ProtectedRoute = ({children}) => {

  const {user, natalChartCreated, isUserLoading} = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user && !isUserLoading) {
      navigate('/onboarding')
      return
    }    
    else if (user && !natalChartCreated) navigate('/onboarding')    
  }, [navigate, user, isUserLoading])

  // if (isUserLoading) return null
  if (isUserLoading) return <Spinner/>
  if (user) return children
};

export default ProtectedRoute;
