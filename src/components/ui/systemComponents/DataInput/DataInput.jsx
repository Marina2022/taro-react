import s from './DataInput.module.scss';
import {useEffect, useRef} from "react";
const DataInput = ({label, day, setDay, month, setMonth, year, setYear, autofocus=false, classname=''}) => {
  
  const birthInputRef = useRef()
  
  useEffect(()=>{
    if (autofocus) birthInputRef.current.focus()
  }, [])
  
  return (
    <div className={classname}>
      <label className={s.onboardingLabels} htmlFor="birth-month">
        {label}
      </label>
      <div className={s.dataInputWrapper}>
        <input
          ref={birthInputRef}
          id="birth-day"
          type="number"
          className={s.birthdayInput}
          placeholder="День"
          min="1"
          max="31"          
          value={day}          
          onChange={(e)=>setDay(e.target.value)}
        />
        <div className={s.inputIconContainer}>
          <select
            required
            id="birth-month"
            className={s.selectMonth}
            value={month}
            onChange={(e)=>setMonth(e.target.value)}            
          >
            <option value="1">Январь</option>
            <option value="2">Февраль</option>
            <option value="3">Март</option>
            <option value="4">Апрель</option>
            <option value="5">Май</option>
            <option value="6">Июнь</option>
            <option value="7">Июль</option>
            <option value="8">Август</option>
            <option value="9">Сентябрь</option>
            <option value="10">Октябрь</option>
            <option value="11">Ноябрь</option>
            <option value="12">Декабрь</option>
          </select>
          <div className={s.icon}></div>
        </div>
        <input
          id="birth-year"
          type="number"
          className={s.yearInput}
          placeholder="Год"
          maxLength="4"
          value={year}
          onChange={(e)=>setYear(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DataInput;