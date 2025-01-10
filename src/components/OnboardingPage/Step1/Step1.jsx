import s from './Step1.module.scss';
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import DataInput from "@/components/ui/systemComponents/DataInput/DataInput.jsx";
import {useState} from "react";
import TimeInput from "@/components/ui/systemComponents/TimeInput/TimeInput.jsx";
import {daysInMonth} from "@/utils.js";


const Step1 = ({setStep, day, setDay, month, setMonth, year, setYear, time, setTime, dontKnowTime, setDontKnowTime}) => {     
  const handleClick = ()=>{
    
    if (!month) {
      alert("Пожалуйста, введите месяц рождения.");
      return false;
    }

    if (!day) {
      alert("Пожалуйста, введите день рождения.");
      return false;
    } else if (day > daysInMonth[month - 1]) {
      // проверяем на кол-во дней в месяце
      alert("Пожалуйста, введите правильный день рождения.");
      return false;
    }
        
    if (!year) {
      alert("Пожалуйста, введите год рождения.");
      return false;
    } else if (+year < 1900 || +year > new Date().getFullYear()) {
      // проверяем год
      alert("Пожалуйста, введите правильный год рождения.");
      return false;
    }

    const timeArray = time.split(":");
    
    if (!time) {
      alert("Пожалуйста, введите время рождения.");
      return false;
    } else if (timeArray[0] > 24 || timeArray[0].includes('_')) {
      alert("Пожалуйста, введите час рождения правильно.");
      return false;
    } else if (timeArray[1] > 59 || timeArray[1].includes('_'))  {
      alert("Пожалуйста, введите минуту рождения правильно.");
      return false;
    }
    
    setStep(2)
  }
  
  return (
    <>
      <div className={s.controlsBlock}>
        <h2 className={s.header}>Шаг 1 из 3</h2>
        <p className={s.text}>
          Данные для расчёта натальной карты и персонального гороскопа
        </p>

        <DataInput
          label="Дата рождения"
          day={day}
          setDay={setDay}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />

        <TimeInput time={time} setTime={setTime} label="Время рождения" dontKnowTime={dontKnowTime} setDontKnowTime={setDontKnowTime}/>
        
      </div>
      <div className={s.stepsButtons}>
        <Button onClick={handleClick} classname={s.btn}>Далее</Button>
      </div>
    </>
  );
};

export default Step1;