import s from './Header.module.scss';
import {useUserAuth} from "@/context/authContext.jsx";

const Header = () => {

  const {user, natalChartCreated } = useUserAuth()
  console.log({natalChartCreated })

  return (
    <header className={s.header}>
      <div className="container">
        Hello, {user.name}
      </div>
    </header>
  );
};

export default Header;