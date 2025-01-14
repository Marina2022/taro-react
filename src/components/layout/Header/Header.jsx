import s from './Header.module.scss';
import {useUserAuth} from "@/context/authContext.jsx";

const Header = () => {
  const {user, natalChartCreated } = useUserAuth()
  console.log(user)
  
  user.sign = 'scorpio'
  return (
    <header>
      <div className="container">
        <nav className={s.headerNav}>
          <div className={s.userBlock}>
            <div className={`${s.horoSign} ${user.sign ? user.sign : 'sign'}`}></div>
            <div className={s.name}>{user.name}</div>
          </div>
          <button className={s.settingsBtn}></button>
        </nav>
      </div>
    </header>
  );
};

export default Header;