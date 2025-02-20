import s from './UserDeletedPage.module.scss';
import {Link} from "react-router-dom";
import {landingURL} from "../../../data/landingURL.js";

const UserDeletedPage = () => {

  return (
    <div className={s.loginContainer}>
      <div className={s.wrapper}>
        <h2 className={s.header}>Профиль успешно удален</h2>
        <p className={s.text}>Ваш аккаунт и связанные с ним данные были удалены</p>
        <p className={s.text}>Если захотите вернуться, вы всегда можете <Link to="inboarding" className={s.link}>зарегистрироваться
          заново</Link></p>
        <a href={landingURL} className={s.toMainBtn}>
          На главную
        </a>
      </div>
    </div>
  );
};

export default UserDeletedPage;