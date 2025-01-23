import s from './AskAstrologerPage.module.scss';
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import TextArea from "@/components/ui/systemComponents/TextArea/TextArea.jsx";
import {useState} from "react";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import axios from "@/api/axiosInstance.js";
import axiosInstance from "@/api/axiosInstance.js";
import WaitingPopup from "@/components/ui/WaitingPopup/WaitingPopup.jsx";
import Clock from "@/components/ui/Clock/Clock.jsx";
import AskAstrologerPopupContent
  from "@/components/AskAstrologerPage/AskAstrologerPopupContent/AskAstrologerPopupContent.jsx";
import {useNavigate} from "react-router-dom";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import {useAppContext} from "@/contexts/appContext.jsx";
import astrologerImg from '@/assets/img/home/astrologist.png'
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
const AskAstrologerPage = () => {

  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [innerTimer, setInnerTimer] = useState(null)

  const {fetchSituations} = useAppContext()
  
  const askHandler = async () => {    
    try {
      setSending(true)
      const result = await axiosInstance.post('astrologists/ask/', {
        user_question: message
      })

      if (result.data.message === "Interpretation is being processed") {        
        setIsOpen(true)
        setInnerTimer(result.data.seconds_left)

      } else {
        throw new Error ("Interpretation is not being processed for some reason")
      }

    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }        
  }

  const navigate = useNavigate()
  const understoodHandler = async() => {
    await fetchSituations()
    setIsOpen(false)
    
    setTimeout(()=>{      
      navigate('/')  
    }, 0)    
  }

  return (
    <>
      <div className={s.askAstrologer}>
        <div className='container'>
          <Header24 classname={s.mainTitle}>Вопрос астрологу</Header24>                    
          <AstrologerCard
            name="Александра Таровна"
            imageUrl={astrologerImg}>
            Таро, Астрология
          </AstrologerCard>
          <Header20 classname={s.title}>О чём вы хотите спросить?</Header20>
          <TextArea
            textAreaValue={message}
            setTextAreaValue={setMessage}
            label="Сформулируйте ваш вопрос"
            placeholder="Введите текст"
            maxLength={400}/>
          <Button disabled={sending} onClick={askHandler}>
            {
              sending ? <MiniSpinner/> : 'Спросить'
            }
          </Button>
        </div>
      </div>
      <WaitingPopup isOpen={isOpen} setIsOpen={setIsOpen} onUnderstood={understoodHandler}>
        <AskAstrologerPopupContent currentTimer={innerTimer} />
      </WaitingPopup>
    </>
  );
};

export default AskAstrologerPage;