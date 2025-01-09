import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const ProtectedRoute = ({children}) => {
  
  // const {isAuthenticated, getUserStatus} = useSelector(state => state.user)
  const navigate = useNavigate()

  const isAuthenticated= true

  const getUserStatus = 'success'
  
  useEffect(() => {
    if (!isAuthenticated && getUserStatus !=='loading') navigate('/onboarding')
  }, [navigate, isAuthenticated, getUserStatus])

  if (getUserStatus =='loading') return <Spinner/>

  if (isAuthenticated) return children

};

export default ProtectedRoute;
