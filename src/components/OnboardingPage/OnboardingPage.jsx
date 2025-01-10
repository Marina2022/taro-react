import s from './OnboardingPage.module.scss';
import {useEffect, useState} from "react";
import {addLeadingZero} from "@/utils.js";

import Step1 from "@/components/OnboardingPage/Step1/Step1.jsx";
import Step2 from "@/components/OnboardingPage/Step2/Step2.jsx";
import Step3 from "@/components/OnboardingPage/Step3/Step3.jsx";
import Step4 from "@/components/OnboardingPage/Step4/Step4.jsx";
import BirthdayPlacePopup from "@/components/OnboardingPage/BirthdayPlacePopup/BirthdayPlacePopup.jsx";

const OnboardingPage = () => {

  const [onboardingCountries, setOnboardingCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({value: 8, label: 'Российская Федерация'})
  const [prefix, setPrefix] = useState('')
  const [selectedCity, setSelectedCity] = useState(null)
  const [onboardingCities, setOnboardingCities] = useState([])
  const [coords, setCoords] = useState(null)
  const [showJustPopularCities, setShowJustPopularCities] = useState(true)

  const [step, setStep] = useState(2)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState('')
  const [time, setTime] = useState('')
  const [dontKnowTime, setDontKnowTime] = useState([])

  // если пользователь выбрал "Не знаю точное время", то посылаем 12:00 
  const timeValueToSend = dontKnowTime.length > 0 ? '12:00' : time
  const birth_date = `${year}-${addLeadingZero(+month)}-${addLeadingZero(+day)}`;

  //todo не забыть послать координаты, если они есть, но нет айди города

  const [popupOpened, setPopupOpened] = useState(false)

  useEffect(() => {
    // запрос на страны - только один раз в самом начале
    fetch("https://my.aspectum.app/api/countries")
      .then((res) =>
        res.json().then((val) => {          
          setOnboardingCountries(val);
        })
      )
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }, []);
  
  useEffect(() => {
    // запрос на города
    fetch(`https://my.aspectum.app/api/cities/?country_id=${selectedCountry.value}&prefix=${prefix}`)
      .then((res) =>
        res.json().then((val) => {          
          setOnboardingCities(showJustPopularCities ? val.slice(0, 5) : val);
        })
      )
      .catch((error) => {
        console.error("Ошибка:", error);
      });

  }, [selectedCountry, prefix])

 
    
  return (
    <div className={s.onboarding}>
      
      <div className={s.stepsContainer}>
        {
          step === 1 && <Step1
            setStep={setStep}
            day={day}
            setDay={setDay}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            time={time}
            setTime={setTime}
            dontKnowTime={dontKnowTime}
            setDontKnowTime={setDontKnowTime}
          />
        }

        {
          step === 2 && <Step2
            setStep={setStep}
            onboardingCountries={onboardingCountries}
            onboardingCities={onboardingCities}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            setPopupOpened={setPopupOpened }
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            coords={coords}
            setCoords={setCoords}
          />
        }

        {
          step === 3 && <Step3 setStep={setStep}/>
        }

        {
          step === 4 && <Step4 setStep={setStep}/>
        }

      </div>

      {
        popupOpened && <BirthdayPlacePopup 
          onboardingCities={onboardingCities}
          setOnboardingCities={setOnboardingCities}
          showJustPopularCities={showJustPopularCities}
          setShowJustPopularCities={setShowJustPopularCities}
          setSelectedCity={setSelectedCity}
          setCoords={setCoords}
          selectedCity={selectedCity}
          setPrefix={setPrefix}
          setPopupOpened={setPopupOpened}
        />
      }
    </div>
  );
};

export default OnboardingPage;