import {createContext, useContext, useState} from "react";

const AuthContext = createContext()
const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [natalChartCreated, setNatalChartCreated] = useState(false)


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isUserLoading,
        setIsUserLoading,
        natalChartCreated,
        setNatalChartCreated        
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error('Auth context was used outside provider')
  return context
}

export default AuthContextProvider
