import s from "./BottomPart.module.scss";
import WaitingBar from "@/components/HomePage/WaitingBar/WaitingBar.jsx";
import ButtonWithBeak from "@/components/ui/systemComponents/ButtonWithBeak/ButtonWithBeak.jsx";
import messagesIcon from "@/assets/img/home/messages.png";
import askIcon from "@/assets/img/home/askIcon.png";
import specialistIcon from "@/assets/img/home/specialistIcon.png";
import loveIcon from "@/assets/img/home/loveIcon.png";
import {useAppContext} from "@/contexts/appContext.jsx";
import React from "react";

const BottomPart = () => {
      
  return (
    <div className={s.wrapper}>
      <div className={s.buttonsWrapper}>

        <WaitingBar  />
                
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
          href="ask-tarot"
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
  );
};

export default React.memo(BottomPart)