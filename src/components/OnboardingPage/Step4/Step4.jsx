import React from 'react';
import s from "@/components/OnboardingPage/Step2/Step2.module.scss";
import SecondaryButton from "@/components/ui/systemComponents/SecondaryButton/SecondaryButton.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";

const Step4 = ({setStep}) => {
  return (
    <>
      <div className={s.controlsBlock}>
        <h2 className={s.header}>Личный кабинет</h2>
        <p className={s.text}>
          Последний шаг: создайте аккаунт для доступа в личный кабинет сервиса
        </p>
      </div>
      <div className={s.stepsButtons}>
        <SecondaryButton onClick={() => setStep(3)}>Назад</SecondaryButton>
        <Button>Завершить</Button>
      </div>
    </>
  );
};

export default Step4;