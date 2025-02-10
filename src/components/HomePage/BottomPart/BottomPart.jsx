import s from "./BottomPart.module.scss";
import WaitingBar from "@/components/HomePage/WaitingBar/WaitingBar.jsx";
import ButtonWithBeak from "@/components/ui/systemComponents/ButtonWithBeak/ButtonWithBeak.jsx";
import messagesIcon from "@/assets/img/home/messages.png";
import askIcon from "@/assets/img/home/askIcon.png";
import specialistIcon from "@/assets/img/home/specialistIcon.png";
import loveIcon from "@/assets/img/home/loveIcon.png";
import {useAppContext} from "@/contexts/appContext.jsx";
import React, {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {useNavigate} from "react-router-dom";

const BottomPart = () => {
  
  const [messagesAreLoading, setMessagesAreLoading] = useState(true)
  const [messages, setMessages] = useState()
  const {situations} = useAppContext()
  
  useEffect(() => {
    const getMessages = async () => {
      try {
        setMessagesAreLoading(true)
        const result = await axiosInstance(`/api/orders/list/`)
        setMessages(result.data)

      } catch (err) {
        console.log(err)
      } finally {
        setMessagesAreLoading(false)
      }
    }

    getMessages()

  }, []);
  
  const navigate = useNavigate()
  const messagesClickHandler = ()=>{    
    navigate('/messages')
  }

  const {fetchSituations, isSituationsLoading} = useAppContext()
  const endHandler = () => {

    setTimeout(() => {
      fetchSituations()
    }, 1000)
  }
        
  return (
    <div className={s.wrapper}>
      <div className={s.buttonsWrapper}>

        <WaitingBar situation={situations} endHandler={endHandler} isSituationsLoading={isSituationsLoading} />
                
        <ButtonWithBeak
          title="Сообщения"
          description="Архив сообщений и заказов"
          
          onClick={messagesClickHandler}
          // number={2}
          
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
          href="/compatibility/select"
          img={loveIcon}
        />
      </div>
    </div>
  );
};

export default React.memo(BottomPart)