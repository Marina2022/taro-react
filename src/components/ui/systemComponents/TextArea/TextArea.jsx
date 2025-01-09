import s from './TextArea.module.scss';
import {useState} from "react";

const TextArea = ({label, placeholder, maxLength = 200, classname=''}) => {
  
  const [currentLength, setCurrentLength] = useState(0)
  const changeHandler = (e)=>{    
    if (e.target.length >= maxLength) return
    setCurrentLength(e.target.value.length)    
  }
  
  return (
    <div className={`${s.inputGroup} ${classname}`}>
      <label className={s.label}>{label}</label>
      <textarea
        onChange={changeHandler}
        className={s.textarea}
        placeholder={placeholder}
        maxLength="200"
      ></textarea>
      <div className={s.charCounter}>{currentLength}/{maxLength}</div>
    </div>
  );
};

export default TextArea;