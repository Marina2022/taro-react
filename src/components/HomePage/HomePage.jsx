import s from './HomePage.module.scss';
import DayBlock from "@/components/HomePage/DayBlock/DayBlock.jsx";
import NatalMap from "@/components/HomePage/NatalMap/NatalMap.jsx";
import ButtonWithBeak from "@/components/ui/systemComponents/ButtonWithBeak/ButtonWithBeak.jsx";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useAppContext} from "@/context/appContext.jsx";
import Clock from "@/components/ui/Clock/Clock.jsx";
import WaitingBar from "@/components/HomePage/WaitingBar/WaitingBar.jsx";

import messagesIcon from "@/assets/img/home/messages.png"
import specialistIcon from "@/assets/img/home/specialistIcon.png"
import loveIcon from "@/assets/img/home/loveIcon.png"
import askIcon from "@/assets/img/home/askIcon.png"

const HomePage = () => {
  
  const {pathname} = useLocation()
  const {situations, fetchSituations} = useAppContext()
  const {currentTimer} = useAppContext()
  
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

        <div className={s.wrapper}>          
          <div className={s.buttonsWrapper}>
            
            <WaitingBar />
            
            <ButtonWithBeak
              title="Сообщения"
              description="Архив сообщений и заказов"
              // number={2}
              href="/"
              img={messagesIcon}
            />

            <ButtonWithBeak
              title="Спросить у таро"
              description="Ответ на любой вопрос"
              href="/"
              img={askIcon}
            />

            <ButtonWithBeak
              title="Спросить астролога"
              description="Разбор натальной карты, гороскопа и прогнозы от специалиста-астролога"
              href="/ask-astrologer"
              img={specialistIcon}
            />

            <ButtonWithBeak
              title="Совместимость"
              description="в делах и отношениях"
              href="/system"
              img={loveIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
