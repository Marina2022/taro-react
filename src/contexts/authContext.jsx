import {createContext, useContext, useState} from "react";

const AuthContext = createContext()
const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [natalChartCreated, setNatalChartCreated] = useState(false)


  const resetUser = async () => {
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
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isUserLoading,
        setIsUserLoading,
        natalChartCreated,
        setNatalChartCreated,
        resetUser
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
