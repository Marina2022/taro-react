import s from './Header.module.scss';
import {useLocation, useNavigate} from "react-router-dom";
import {useAuthContext} from "@/contexts/authContext.jsx";

const Header = () => {
  const {user, natalChartCreated} = useAuthContext()
  const location = useLocation()
  const navigate = useNavigate()
     
  const backButtonHandler = () => {
    navigate(-1)
  }
    
  return (
    <header>
      <div className="container">
        <nav className={s.headerNav}>

          {
            location.pathname === '/' && <div className={s.userBlock}>
              <div className={`${s.horoSign} ${user.sign ? user.sign.toLowerCase() : 'sign'}`}></div>
              <div className={s.name}>{user.name}</div>
            </div>
          }

          {
            location.pathname !== '/' && <button onClick={backButtonHandler} className={s.backButton}></button>
          }

          <button className={s.settingsBtn}></button>
        </nav>
      </div>
    </header>
  )
    ;
};

export default Header;