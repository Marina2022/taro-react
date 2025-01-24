import React from 'react';
import s from "./Step4.module.scss";
import SecondaryButton from "@/components/ui/systemComponents/SecondaryButton/SecondaryButton.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import InputGroup from "@/components/ui/systemComponents/InputGroup/InputGroup.jsx";
import Checkboxes from "@/components/ui/systemComponents/Checkboxes/Checkboxes.jsx";
const Step4 = ({setStep, checkboxCheckedValues, setCheckboxCheckedValues, email, setEmail, submitForm}) => {
  
  const handleSubmit = async () => {

    // const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
    
    if (!email) {
      alert("Пожалуйста, введите ваш email.");
      return false;
    } else if (!emailRegex.test(email)) {
      alert("Пожалуйста, введите правильный email.");
      return false;
    }

    if (!checkboxCheckedValues.includes('dataConsent')) {
      alert("Пожалуйста, дайте согласие на обработку персональных данных.");
      return false;
    }

    const result = await submitForm()
    if (!result) return false  // значит запрос закончился ошибкой 
  }
  
  return (
    <>
      <div className={s.controlsBlock}>
        <h2 className={s.header}>Личный кабинет</h2>
        <p className={s.text}>
          Последний шаг: создайте аккаунт для доступа в личный кабинет сервиса
        </p>

        <InputGroup
          classname={s.emailInput}
          label="Ваш E-MAIL (используется как логин)"
          value={email}
          setValue={setEmail}
          autofocus={true}
        />

        <Checkboxes
          classname={s.checkboxes}
          checkboxCheckedValues={checkboxCheckedValues}
          setCheckboxCheckedValues={setCheckboxCheckedValues}
          checkboxes={
            [
              {
                value: "dataConsent",
                label: `<div>Даю согласие на <span style="color:#ffb94c; opacity: 0.8">обработку персональных данных</span> и принимаю условия <span style="color:#ffb94c; opacity: 0.8">пользовательского соглашения и политики конфиденциальности</span></div>`
              },
              {
                value: 'newsConsent',
                label: 'Я согласен получать прогнозы, рассылки и уведомления от aspectum.app'
              }
            ]
          }
        />

      </div>
            
      <div className={s.stepsButtons}>
        <SecondaryButton onClick={() => setStep(3)}>Назад</SecondaryButton>        
        <Button onClick={handleSubmit}>Завершить</Button>        
      </div>
    </>
  );
};

export default Step4;