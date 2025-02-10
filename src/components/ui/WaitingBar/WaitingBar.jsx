import s from './WaitingBar.module.scss';
import {useAppContext} from "@/contexts/appContext.jsx";
import Clock from "@/components/ui/Clock/Clock.jsx";
import {BsExclamationCircle} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import WaitingPopup from "@/components/ui/WaitingPopup/WaitingPopup.jsx";
import AskAstrologerPopupContent
  from "@/components/AskAstrologerPage/AskAstrologerPopupContent/AskAstrologerPopupContent.jsx";
import {useEffect, useRef, useState} from "react";
import astrologerImg from '@/assets/img/home/astrologist.png'
import AskTaroPopupContent from "@/components/AskTaroOrderPage/AskTaroPopupContent/AskTaroPopupContent.jsx";

import tarotIcon from "@/assets/img/home/askIcon.png"
import compatibilityIcon from "@/assets/img/home/loveIcon.png"

const WaitingBar = ({
                      situation,
                      isSituationsLoading,
                      isMessagesPage = false,
                      endHandler = () => {
                      }
                    }) => {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const [innerTimerValue, setInnerTimerValue] = useState()
  const intervalId = useRef()


  useEffect(() => {
    if (situation) setInnerTimerValue(situation.seconds_left)
  }, [situation]);

  useEffect(() => {

    if (innerTimerValue >= 0) {

      intervalId.current = setInterval(() => {
        setInnerTimerValue((prev) => {

          if (prev === 1) {
            clearInterval(intervalId.current); // Остановка таймера, когда значение достигло 0            
            endHandler()
            return 0;
          }
          return prev - 1; // Уменьшение таймера
        });
      }, 1000);
      return () => clearInterval(intervalId.current); // Очистка интервала при размонтировании
    }
  }, [innerTimerValue]);

  const handleClick = () => {
    if (situation.status === 'completed') {

      if (situation.situation_type === 'astrology_question') {
        navigate(`/astrologer-answer/${situation.related_object_id}`)
      }

      if (situation.situation_type === 'tarot_order') {
        navigate(`/tarot-answer/${situation.related_object_id}`)
      }

      if (situation.situation_type === 'compatibility_order') {
        navigate(`/compatibility/result/${situation.related_object_id}`)
      }

      if (situation.situation_type === 'compatibility_question') {
        navigate(`/compatibility/answer/${situation.compatibility_id}/${situation.question_name}`)
      }

    } else if (situation.status === 'in_progress') {
      setIsOpen(true)
    }
  }
  const understoodHandler = () => {
    setIsOpen(false)
  }

  const situationMapping = {
    astrology_question: "Вопрос астрологу",
    tarot_order: "Вопрос таро"
  }

  if (!situation) {
    return null
  }

  const percent = (situation.expected_duration - innerTimerValue) / situation.expected_duration * 100
  
  const createdDate = new Date(situation.created_at).toLocaleDateString('ru')


  let truncateString = ''

  
  
  if (situation?.question) {
    truncateString = situation.question.length > 50 ? str.slice(0, 50) + "..." : situation.question;  
  }
  
  
  return (
    <div className={s.wrapper}>
      {
        !isSituationsLoading && !Number.isNaN(percent) &&
        (
          <div
            className={s.waitingUnderlay}
            style={{transform: `scaleX(${percent}%)`}}
          ></div>
        )
      }

      <div className={s.waitingBar} onClick={handleClick}>
        <div >
          <div className={s.flex}>
            {
              situation.situation_type === 'astrology_question' && <img className={s.img} src={astrologerImg}/>
            }

            {
              situation.situation_type === 'tarot_order' && <img className={s.img} src={tarotIcon}/>
            }

            {
              situation.situation_type === 'compatibility_order' && <img className={s.img} src={compatibilityIcon}/>
            }

            {
              situation.situation_type === 'compatibility_question' && <img className={s.img} src={compatibilityIcon}/>
            }

            <div className={s.flexColWrapper}>
              <div className={s.title}>       
                {situation.name} 
              </div>              
              
              {
                 isMessagesPage && (
                  <div className={s.additionalInfo}>{truncateString} ({createdDate})</div>
                )


              }


              {
                situation.status === 'in_progress' &&
                <Clock currentTimer={innerTimerValue} classname={s.clock} loading={isSituationsLoading}
                />
              }
              {
                situation.status === 'completed' && <div className={s.ready}>Готово!</div>
              }
            </div>
          </div>
        </div>
        {
          situation.status === 'in_progress' &&
          <svg className={s.icon} width="16" height="17" viewBox="0 0 16 17" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 16.8281C3.64844 16.8281 0.03125 13.2109 0.03125 8.85938C0.03125 6.91406 0.765625 5.10938 1.95312 3.71875C2.24219 3.375 2.67188 3.35156 2.92969 3.625C3.1875 3.89844 3.17188 4.26562 2.9375 4.57031C1.95312 5.71875 1.36719 7.21094 1.35938 8.85938C1.35156 12.5469 4.3125 15.5 8 15.5C11.6875 15.5 14.6328 12.5469 14.6328 8.85938C14.6328 5.35156 11.9766 2.51562 8.53906 2.24219V4.57031C8.53906 4.91406 8.30469 5.17969 7.96094 5.17969C7.625 5.17969 7.39062 4.91406 7.39062 4.57031V1.54688C7.39062 1.14062 7.59375 0.890625 8.00781 0.890625C12.3672 0.890625 15.9688 4.5 15.9688 8.85938C15.9688 13.2109 12.3594 16.8281 8 16.8281ZM9.25 9.98438C8.61719 10.5938 7.75 10.4609 7.22656 9.71875L4.34375 5.58594C4.07031 5.20312 4.47656 4.78906 4.86719 5.0625L9 7.95312C9.74219 8.46875 9.86719 9.33594 9.25 9.98438Z"
              fill="#FFB94C"/>
          </svg>
        }

        {
          situation.status === 'completed' && <BsExclamationCircle className={s.icon}/>
        }

      </div>

      <WaitingPopup isOpen={isOpen} setIsOpen={setIsOpen} onUnderstood={understoodHandler}>

        {/*Для всех случае, кром ответа Таро, открывается попап с AskAstrologerPopupContent*/}

        {
          situation.situation_type !== 'tarot_order' && <AskAstrologerPopupContent currentTimer={innerTimerValue}/>
        }

        {
          situation.situation_type === 'tarot_order' &&
          <AskTaroPopupContent currentTimer={innerTimerValue} layout={situation.name}/>
        }

      </WaitingPopup>
    </div>
  );
};

export default WaitingBar;