import React from 'react';
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import s from "@/components/AskAstrologerPage/AskAstrologerPopupContent/AskAstrologerPopupContent.module.scss";
import Clock from "@/components/ui/Clock/Clock.jsx";
import {useAuthContext} from "@/contexts/authContext.jsx";

const CompatibilityPopupContent = () => {

  const {user} = useAuthContext()
  
  return (
    <>
      <Header20 classname={s.popupTitle}>Заказ</Header20>
      <img className={s.astrologerAva} src="/img/astrologist.png" alt=""/>
      <div className={s.text}>
        <p className={s.popupParagraph}>
          Привет, {user.name}
        </p>
        <p className={s.popupParagraph}>
          Сейчас я работаю над раскладом. Чтобы колода не запутала нас, мне нужно сосредоточиться на вашем вопросе и
          не отвлекаться на другие дела.
        </p>
        <p className={s.popupParagraph}>
          Благосклонная колода даёт подсказки и намёки даже в самых запутанных случаях, нужно только их увидеть.
          Подготовлю ответ уже скоро.
        </p>
      </div>      
    </>
  );
};

export default CompatibilityPopupContent;