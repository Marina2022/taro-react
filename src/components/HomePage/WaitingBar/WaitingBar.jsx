import s from './WaitingBar.module.scss';
import {useAppContext} from "@/contexts/appContext.jsx";
import Clock from "@/components/ui/Clock/Clock.jsx";
import {BsExclamationCircle} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import WaitingPopup from "@/components/ui/WaitingPopup/WaitingPopup.jsx";
import AskAstrologerPopupContent
  from "@/components/AskAstrologerPage/AskAstrologerPopupContent/AskAstrologerPopupContent.jsx";
import {useState} from "react";

const WaitingBar = () => {

  const {currentTimer, fetchSituations, situations} = useAppContext()

  // console.log(situations)

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {

    if (situations.status === 'completed') {
      navigate(`/astrologists/answer/${situations.related_object_id}`)
    } else if (situations.status === 'in_progress') {
      setIsOpen(true)
    }
  }

  const understoodHandler = () => {
    setIsOpen(false)
  }

  const situationsMapping = {
    astrology_question: "Вопрос астрологу"
  }

  if (!situations.situation_type) {
    return null
  }
  
  return (
    <>
      <div className={s.waitingBar} onClick={handleClick}>
        <div>
          <div className={s.flex}>
            {
              situations.situation_type === 'astrology_question' && <img className={s.img} src="/img/astrologist.png"/>
            }
            <div>
              <div className={s.title}>
                {
                  situationsMapping[situations.situation_type]
                }
              </div>
              {
                situations.status === 'in_progress' &&
                <Clock currentTimer={currentTimer} onEnd={fetchSituations} classname={s.clock}/>
              }
              {
                situations.status === 'completed' && <div className={s.ready}>Готово!</div>
              }
            </div>
          </div>

        </div>
        {
          situations.status === 'in_progress' &&
          <svg className={s.icon} width="16" height="17" viewBox="0 0 16 17" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 16.8281C3.64844 16.8281 0.03125 13.2109 0.03125 8.85938C0.03125 6.91406 0.765625 5.10938 1.95312 3.71875C2.24219 3.375 2.67188 3.35156 2.92969 3.625C3.1875 3.89844 3.17188 4.26562 2.9375 4.57031C1.95312 5.71875 1.36719 7.21094 1.35938 8.85938C1.35156 12.5469 4.3125 15.5 8 15.5C11.6875 15.5 14.6328 12.5469 14.6328 8.85938C14.6328 5.35156 11.9766 2.51562 8.53906 2.24219V4.57031C8.53906 4.91406 8.30469 5.17969 7.96094 5.17969C7.625 5.17969 7.39062 4.91406 7.39062 4.57031V1.54688C7.39062 1.14062 7.59375 0.890625 8.00781 0.890625C12.3672 0.890625 15.9688 4.5 15.9688 8.85938C15.9688 13.2109 12.3594 16.8281 8 16.8281ZM9.25 9.98438C8.61719 10.5938 7.75 10.4609 7.22656 9.71875L4.34375 5.58594C4.07031 5.20312 4.47656 4.78906 4.86719 5.0625L9 7.95312C9.74219 8.46875 9.86719 9.33594 9.25 9.98438Z"
              fill="#FFB94C"/>
          </svg>
        }

        {
          situations.status === 'completed' && <BsExclamationCircle className={s.icon}/>
        }

      </div>

      <WaitingPopup isOpen={isOpen} setIsOpen={setIsOpen} onUnderstood={understoodHandler}>
        <AskAstrologerPopupContent/>
      </WaitingPopup>

    </>
  );
};

export default WaitingBar;