import React from 'react';
import s from "@/components/OnboardingPage/Step2/Step2.module.scss";
import SecondaryButton from "@/components/ui/systemComponents/SecondaryButton/SecondaryButton.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";

const Step3 = ({setStep}) => {
  return (
    <>
      <div className={s.controlsBlock}>
        <h2 className={s.header}>Шаг 3 из 3</h2>
        <p className={s.text}>
          Пока мы готовим ваш персональный гороскоп и рекомендации
        </p>
      </div>
      <div className={s.stepsButtons}>
        <SecondaryButton onClick={() => setStep(2)}>Назад</SecondaryButton>
        <Button onClick={() => setStep(4)}>Далее</Button>
      </div>
    </>
  );
};

export default Step3;