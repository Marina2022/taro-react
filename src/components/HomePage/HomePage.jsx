import s from './HomePage.module.scss';
import DayBlock from "@/components/HomePage/DayBlock/DayBlock.jsx";
import NatalMap from "@/components/HomePage/NatalMap/NatalMap.jsx";
import {useLocation} from "react-router-dom";
import ContextProvider, {useAppContext} from "@/contexts/appContext.jsx";
import BottomPart from "@/components/HomePage/BottomPart/BottomPart.jsx";
import {useEffect} from "react";

const HomePage = () => {

  const {pathname} = useLocation()

  return (
    <div className={s.homePage}>
      <div className='container'>
        <div className={s.wrapper}>
          <div className={s.topBlockWrapper}>
            <div className={s.topBlock}>
              <NatalMap/>
              <DayBlock classname={s.dayBlock}/>
            </div>
          </div>
        </div>
        <div className={s.slogan}>Не думайте о том, что вы не можете, думайте о том, что вы <span
          className={s.highlight}> можете!</span></div>
        <BottomPart/>
      </div>
    </div>
  );
};

export default HomePage;
