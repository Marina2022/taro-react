import s from './TimeInput.module.scss';
import {useEffect, useRef, useState} from "react";
import Checkboxes from "@/components/ui/systemComponents/Checkboxes/Checkboxes.jsx";

const TimeInput = ({label, classname, dontKnowTime, setDontKnowTime = ''}) => {

  const ref = useRef()
  
  const [disabled, setDisabled] = useState(false)
  
  const handleCheck = (values)=>{
    setDontKnowTime(values)
    // Если checked, убираем дизейбл с инпута
    if (dontKnowTime.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  
  }

  useEffect(() => {
    // Маска для инпута времени рождения:
    const timeInput = ref.current;
    const im = new Inputmask({
      mask: "99:99",
    });
    im.mask(timeInput);
  }, [])

  return (
    <div className={classname}>
      <label
        className={s.label}
        htmlFor="birth_time"
      >
        {label}
      </label>
      <div className={s.inputIconContainer}>
        <input
          id="birth_time"
          ref={ref}
          type="text"
          placeholder="00:00"
          className={s.input}
          disabled={disabled}
        />
        <svg
          style={{opacity: disabled ? .4 : 1}}          
          className={s.icon}
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 16.9297C4.08594 16.9297 0.429688 13.2812 0.429688 8.85938C0.429688 4.44531 4.07812 0.789062 8.49219 0.789062C12.9141 0.789062 16.5703 4.44531 16.5703 8.85938C16.5703 13.2812 12.9141 16.9297 8.5 16.9297ZM8.5 15.3438C12.0938 15.3438 14.9844 12.4531 14.9844 8.85938C14.9844 5.26562 12.0859 2.38281 8.49219 2.38281C4.89844 2.38281 2.02344 5.26562 2.02344 8.85938C2.02344 12.4531 4.90625 15.3438 8.5 15.3438ZM4.54688 9.82812C4.19531 9.82812 3.92969 9.55469 3.92969 9.21094C3.92969 8.85938 4.19531 8.59375 4.54688 8.59375H7.875V4.08594C7.875 3.74219 8.14844 3.46875 8.49219 3.46875C8.84375 3.46875 9.11719 3.74219 9.11719 4.08594V9.21094C9.11719 9.55469 8.84375 9.82812 8.49219 9.82812H4.54688Z"

          />
        </svg>
      </div>
      <label className={s.comment}>
        {/** введите 12:00 если не знаете точное время  */}
        <Checkboxes
          classname={s.checkbox}
          checkboxes={
            [
              {value: 'dontKnow', label: 'Не знаю точное время'}
            ]}
          checkboxCheckedValues={dontKnowTime }
          setCheckboxCheckedValues={handleCheck}
          />          
      </label>
    </div>
  );
};

export default TimeInput;