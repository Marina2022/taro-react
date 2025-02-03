import s from './AskTaroPopupContent.module.scss';
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";

import Clock from "@/components/ui/Clock/Clock.jsx";
import {useAppContext} from "@/contexts/appContext.jsx";
import {useState} from "react";

const AskTaroPopupContent = ({currentTimer, layout}) => {  
  
  const {fetchSituations} = useAppContext()
  const endHandler = () => {
    setTimeout(()=>{
      fetchSituations()
    }, 1000)
  }
      
  return (
    <>
      <Header20 classname={s.popupTitle}>{layout}</Header20>
      <img className={s.astrologerAva} src="/img/astrologist.png" alt=""/>      
      <div className={s.text}>
        <p className={s.popupParagraph}>
          Сейчас я работаю над раскладом. Чтобы колода не запутала нас, мне нужно сосредоточиться на вашем вопросе и
          не отвлекаться на другие дела.
        </p>
        <p className={s.popupParagraph}>
          Благосклонная колода даёт подсказки и намёки даже в самых запутанных случаях, нужно только их увидеть.
          Подготовлю ответ уже скоро.
        </p>
      </div>
      <div className={s.center}>
        <Clock classname={s.clock} currentTimer={currentTimer} onEnd={endHandler}  />
      </div>      
    </>
  );
};

export default AskTaroPopupContent;