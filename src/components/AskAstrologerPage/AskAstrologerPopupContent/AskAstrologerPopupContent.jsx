import s from './AskAstrologerPopupContent.module.scss';
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";

import Clock from "@/components/ui/Clock/Clock.jsx";
import {useAppContext} from "@/context/appContext.jsx";

const AskAstrologerPopupContent = () => {
  const {currentTimer} = useAppContext()
  return (
    <>
      <Header20 classname={s.popupTitle}>Заказ</Header20>
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
        <Clock classname={s.clock} currentTimer={currentTimer}/>
      </div>      
    </>
  );
};

export default AskAstrologerPopupContent;