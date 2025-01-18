import s from './TextArea.module.scss';
import {useState} from "react";

const TextArea = ({label, placeholder, maxLength = 200, classname='', textAreaValue, setTextAreaValue}) => {
    
  const [currentLength, setCurrentLength] = useState(0)
  
  const changeHandler = (e)=>{    
    
    if (e.target.value.length > maxLength) {
      return
    } else {
      setCurrentLength(e.target.value.length)  
      setTextAreaValue(e.target.value)
    }        
  }
  
  return (
    <div className={`${s.inputGroup} ${classname}`}>
      <label className={s.label}>{label}</label>
      <textarea
        onChange={changeHandler}
        className={s.textarea}
        placeholder={placeholder}
        value={textAreaValue}
        maxLength={maxLength}
      ></textarea>
      <div className={s.charCounter}>{currentLength}/{maxLength}</div>
    </div>
  );
};

export default TextArea;