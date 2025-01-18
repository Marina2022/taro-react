import s from './Step2.module.scss';
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import SecondaryButton from "@/components/ui/systemComponents/SecondaryButton/SecondaryButton.jsx";
import {useEffect, useState} from "react";
import Select from "@/components/ui/systemComponents/Select/Select.jsx";
import InputLabel from "@/components/ui/systemComponents/InputLabel/InputLabel.jsx";
import BirthdayPlaceInput from "@/components/OnboardingPage/Step2/BirthdayPlaceInput/BirthdayPlaceInput.jsx";
import BirthdayPlacePopup from "@/components/OnboardingPage/BirthdayPlacePopup/BirthdayPlacePopup.jsx";

const Step2 = ({
                 setStep,
                 onboardingCountries,
                 onboardingCities,
                 selectedCountry,
                 setSelectedCountry,
                 setPopupOpened,
                 selectedCity,
                 setSelectedCity,
                 coords,
                 setCoords
               }) => {
  const handleSelect = (value) => {
    setSelectedCountry(value)
    setSelectedCity(null)
    setCoords(null)
  }
  const handleContinue = () => {
    if (!(selectedCity || coords)) {
      alert("Пожалуйста, укажите место рождения.");
      return false;
    }
    setStep(3)
  }

  return (
    <>
      <div className={s.controlsBlock}>
        <h2 className={s.header}>Шаг 2 из 3</h2>
        <p className={s.text}>
          Данные для расчёта натальной карты и персонального гороскопа
        </p>

        <InputLabel classname={s.countryLabel}>Страна рождения</InputLabel>
        <Select
          selectedValue={selectedCountry}
          onSelect={handleSelect} 
          options={
            onboardingCountries.map(country => ({value: country.id, label: country.name}))
          }
        />
        <InputLabel classname={s.placeLabel}>Место рождения</InputLabel>
        <BirthdayPlaceInput setPopupOpened={setPopupOpened} selectedCity={selectedCity} coords={coords}/>
      </div>
      <div className={s.stepsButtons}>
        <SecondaryButton onClick={() => setStep(1)}>Назад</SecondaryButton>
        <Button onClick={handleContinue}>Далее</Button>
      </div>
    </>
  )
}

export default Step2;