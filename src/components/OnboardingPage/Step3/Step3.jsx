import React from 'react';
import s from "./Step3.module.scss";
import SecondaryButton from "@/components/ui/systemComponents/SecondaryButton/SecondaryButton.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import InputGroup from "@/components/ui/systemComponents/InputGroup/InputGroup.jsx";
import Tabs from "@/components/ui/systemComponents/Tabs/Tabs.jsx";

const Step3 = ({setStep, nickname, setNickname, selectedTab, setSelectedTab}) => {
  const handleContinue = () => {

    if (!nickname) {
      alert("Пожалуйста, введите имя.");
      return false
    }
    setStep(4)
  }

  return (
    <>
      <div className={s.controlsBlock}>
        <h2 className={s.header}>Шаг 3 из 3</h2>
        <p className={s.text}>
          Пока мы готовим ваш персональный гороскоп и рекомендации
        </p>

        <InputGroup
          classname={s.nicknameInput}
          value={nickname}
          setValue={setNickname}
          label="Как к вам обращаться?"
          autofocus={true}
        />


        <Tabs
          classname={s.sexTabs}
          label="Пол"
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabs={
            [
              {value: 'male', label: 'Мужской'},
              {value: 'female', label: 'Женский'},
              {value: 'other', label: 'Небинарный'},
            ]
          }/>
      </div>

      <div className={s.stepsButtons}>
        <SecondaryButton onClick={() => setStep(2)}>Назад</SecondaryButton>
        <Button onClick={handleContinue}>Далее</Button>
      </div>
    </>
  );
};

export default Step3;