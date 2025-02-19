import s from './Popup.module.scss';
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import React, {useEffect, useRef, useState} from "react";
import {useAuthContext} from "@/contexts/authContext.jsx";
import axiosInstance from "@/api/axiosInstance.js";

const Popup = ({open, setOpen, children, classname=''}) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        // Закрытие попапа по Esc
        setOpen(false)
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const popupRef = useRef()
  const handleUnderlayClick = (e) => {
    if (!popupRef.current.contains(e.target)) {
      setOpen(false)
    }
  }
  return (
    <div className={s.underlay} onMouseDown={handleUnderlayClick}>
      <div className={`${s.popup} ${classname}`} ref={popupRef}>
        {children}
      </div>
    </div>
  );
};

export default Popup;