import s from './ConfirmEmailPopup.module.scss';
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import React, {useEffect, useRef, useState} from "react";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import {useAuthContext} from "@/contexts/authContext.jsx";
import axiosInstance from "@/api/axiosInstance.js";

const ConfirmEmailPopup = ({setConfirmedEmailPopupOpen}) => {

  const {user} = useAuthContext()  
  const [send, setSend] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        // Закрытие попапа по Esc
        setConfirmedEmailPopupOpen(false)
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const popupRef = useRef()
  const handleUnderlayClick = (e) => {
    if (!popupRef.current.contains(e.target)) {
      setConfirmedEmailPopupOpen(false)
    }
  }
  
  const submitHandler = async ()=>{
    
    if (send) {
      setConfirmedEmailPopupOpen(false)
    } else  {
      try {
        const resp = await axiosInstance.post('api/resend/', {})
        console.log(resp.data.status)
        if (resp.data.status === 'Verification email sent successfully') setSend(true)
      } catch (err) {
        console.log(err)
      }  
    }
  }
  
  return (
    <div className={s.underlay} onClick={handleUnderlayClick}>
      <div className={s.popup} ref={popupRef}>
        {
          !send && <p className={s.pleaseConfirm}>
            Подтвердите, пожалуйста, email, чтобы воспользоваться данной услугой
          </p>
        }              
        {
          send && <div className={s.isSend}>Ссылка для подтверждения отправлена на ваш имейл</div>
        }        
        <div className={s.bottom}>
        {
          !send && <p className={s.repeat}>
            Если вы не получили письмо с подтверждением, вы можете запросить его повторно
          </p>
        }
        {
          <Button classname={s.btn} onClick={submitHandler}>
            {
              send ? 'Закрыть' : 'Запросить повторно'
              
            }
          </Button> 
        }
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPopup;