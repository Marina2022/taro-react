import s from "./NatalMap.module.scss";
import natalMap from '@/assets/img/home/natalMap.jpg'
import {Link} from "react-router-dom";
import {useState} from "react";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const NatalMap = () => {

  // const [isMapLoading, setIsMapLoading] = useState(true);
  //
  // const handleImageLoad = () => {
  //   setIsLoading(false); // Убираем спиннер после загрузки изображения
  // };
  //
  // if (isMapLoading) return <Spinner />
  
  return (
    <>
      {/*<img className={s.cardImage} src="https://my.aspectum.app/api/natal/chart-svg/" alt='natal map'/>*/}
  
  <Link
    to="/natal"
    className={`${s.card} `}>
    <div className={s.imageWrapper}>
        {/*<img className={s.cardImage} src={natalMap} alt='natal map'/>*/}
        <img className={s.cardImage} src="https://my.aspectum.app/api/natal/chart-svg/" alt='natal map'/>
        {/*<img className={s.mapImg} src="https://my.aspectum.app/api/natal/chart-svg/" alt="nalal map"/>*/}
        <img className={s.hidden} src="https://my.aspectum.app/api/natal/aspect-chart-svg/" alt=""/>
      </div>
      <div className={s.cardText}>
        <h2 className={s.cardTitle}>Натальная <br className={s.br} /> карта</h2>
        <p className={s.cardDescription}>с пояснениями</p>
      </div>
    </Link>
    </>
  );
};

export default NatalMap;