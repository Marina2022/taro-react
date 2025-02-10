import React, {useEffect, useState} from 'react';
import s from "./MessagesPage.module.scss";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import WaitingBar from "@/components/HomePage/WaitingBar/WaitingBar.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const MessagesPage = () => {
  
  const [messages, setMessages] = useState()
  const [messagesAreLoading, setMessagesAreLoading] = useState()

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
  
  useEffect(() => {    
      getMessages()
    }, []
  )
  
  if (!messages) return <Spinner />
  
  return (
    <div className={s.messagesPage}>
      <div className="container">
        <Header24 classname={s.mainTitle}>СИТУАЦИИ И СООБЩЕНИЯ</Header24>

        <div className={s.slogan}>Не думайте о том, что вы не можете, думайте о том, что вы <span
          className={s.highlight}> можете!</span></div>

        <ul>
          {
           messages && messages.map((item, i) => <WaitingBar  
              key={i} 
              isSituationsLoading={messagesAreLoading} situation={item} isSelectPage={true} endHandler={getMessages}/>)
                      
          }
        </ul>
      </div>
    </div>
  );
};

export default MessagesPage;