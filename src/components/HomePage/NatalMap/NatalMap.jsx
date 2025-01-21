import s from "./NatalMap.module.scss";
import natalMap from '@/assets/img/home/natalMap.jpg'
import {Link} from "react-router-dom";

const NatalMap = () => {
  return (
    <Link
      to="/natal"
      className={`${s.card} `}>
      <div className={s.imageWrapper}>
        <img className={s.cardImage} src={natalMap} alt='natal map'/>
      </div>
      <div className={s.cardText}>
        <h2 className={s.cardTitle}>Натальная карта</h2>
        <p className={s.cardDescription}>с пояснениями</p>
      </div>
    </Link>
  );
};

export default NatalMap;