import s from './AskAstrologerPage.module.scss';
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import TextArea from "@/components/ui/systemComponents/TextArea/TextArea.jsx";
import {useEffect, useRef, useState} from "react";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import WaitingPopup from "@/components/ui/WaitingPopup/WaitingPopup.jsx";
import AskAstrologerPopupContent
  from "@/components/AskAstrologerPage/AskAstrologerPopupContent/AskAstrologerPopupContent.jsx";
import {useNavigate} from "react-router-dom";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import {useAppContext} from "@/contexts/appContext.jsx";
import astrologerImg from '@/assets/img/home/astrologist.png'
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import {useAuthContext} from "@/contexts/authContext.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const AskAstrologerPage = () => {

  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [innerTimer, setInnerTimer] = useState(null)
  const [initialTimer, setInitialTimer] = useState(null)
  const navigate = useNavigate()
  const intervalId = useRef()
  
  const {fetchSituations, setConfirmedEmailPopupOpen} = useAppContext()
  const {user, setUser} = useAuthContext()
  

  useEffect(() => {
      const fetchUserProfile = async () => {

        if (user.email_confirmed) return

        try {
          const response = await fetch('https://my.aspectum.app/api/profile/', {
            method: 'GET',
            credentials: 'include',
          })
          if (response.redirected !== true) {
            const newUser = await response.json();

            if (!newUser.email_confirmed) {              
              navigate(-1)
              setConfirmedEmailPopupOpen(true)
            } else {
              setUser(newUser)
            }

          } else {
            throw new Error('Ошибка при получении данных профиля');
          }
        } catch (err) {
          console.log(err)
        }
      }

      fetchUserProfile()

    }, []
  )


  useEffect(() => {

    // если установили начальный таймер, т.е. пришел ответ с АПИ
    if (initialTimer > 0) {
      setInnerTimer(initialTimer)
      intervalId.current = setInterval(() => {
        setInnerTimer((prev) => {
          if (prev === 0) {
            clearInterval(intervalId.current); // Остановка таймера, когда значение достигло 0            
            endHandler()
            return 0;
          }
          return prev - 1; // Уменьшение таймера
        });
      }, 1000);
      return () => clearInterval(intervalId.current); // Очистка интервала при размонтировании
    }
  }, [initialTimer]);

  const askHandler = async () => {

    if (!message) {
      alert('Введите, пожалуйста, ваш вопрос')
      return
    }

    try {
      setSending(true)
      const result = await axiosInstance.post('astrologists/ask/', {
        user_question: message
      })

      if (result.data.message === "Interpretation is being processed") {
        setIsOpen(true)
        setInitialTimer(result.data.seconds_left)

      } else {
        throw new Error("Interpretation is not being processed for some reason")
      }

    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
  }
  const understoodHandler = async () => {
    await fetchSituations()
    setIsOpen(false)

    setTimeout(() => {
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
        <AskAstrologerPopupContent currentTimer={innerTimer}/>
      </WaitingPopup>
    </>
  );
};

export default AskAstrologerPage;