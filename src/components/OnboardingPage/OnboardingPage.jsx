import s from './OnboardingPage.module.scss';
import {useEffect, useState} from "react";
import {addLeadingZero} from "@/utils.js";

import Step1 from "@/components/OnboardingPage/Step1/Step1.jsx";
import Step2 from "@/components/OnboardingPage/Step2/Step2.jsx";
import Step3 from "@/components/OnboardingPage/Step3/Step3.jsx";
import Step4 from "@/components/OnboardingPage/Step4/Step4.jsx";
import BirthdayPlacePopup from "@/components/OnboardingPage/BirthdayPlacePopup/BirthdayPlacePopup.jsx";
import Step5 from "@/components/OnboardingPage/Step5/Step5.jsx";
import {useUserAuth} from "@/context/authContext.jsx";

const OnboardingPage = () => {

  const {user, setNatalChartCreated} = useUserAuth()


  const [step, setStep] = useState(1)

  const [onboardingCountries, setOnboardingCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({value: 8, label: 'Российская Федерация'})
  const [prefix, setPrefix] = useState('')
  const [selectedCity, setSelectedCity] = useState(null)
  const [onboardingCities, setOnboardingCities] = useState([])
  const [coords, setCoords] = useState(null)
  const [showJustPopularCities, setShowJustPopularCities] = useState(true)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState('')
  const [time, setTime] = useState('')
  const [dontKnowTime, setDontKnowTime] = useState([])

  const [nickname, setNickname] = useState('')
  const [selectedSex, setSelectedSex] = useState('male')
  const [consentCheckboxes, setConsentCheckboxes] = useState([])  // возможные значения: ["dataConsent", "newsConsent"]


  const [email, setEmail] = useState('')

  // если пользователь выбрал "Не знаю точное время", то посылаем 12:00 
  const timeValueToSend = dontKnowTime.length > 0 ? '12:00' : time

  const [popupOpened, setPopupOpened] = useState(false)

  
  const {setUser, setIsUserLoading} = useUserAuth()

  // Если пользователь уже есть (зарегистрирован), но он не посмотрел слайдер, перекидываем его на 5й шаг
  useEffect(() => {


    if (user) {
      console.log('юзер есть', user)
      setStep(5)
    }
  }, [user]);


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

  const submitForm = () => {

    const birth_date = `${year}-${addLeadingZero(+month)}-${addLeadingZero(+day)}`;

    const data = {
      birth_date,
      birth_time: dontKnowTime.length > 0 ? '12:00' : time,
      city_id: selectedCity ? selectedCity.id : null,
      latitude: coords?.lat ? +coords?.lat : "",
      longitude: coords?.lng ? +coords?.lng : "",
      nickname: nickname,
      gender: selectedSex,
      email: email,
      data_consent: consentCheckboxes.includes('dataConsent'),
      newsletter_consent: consentCheckboxes.includes('newsConsent'),
    };

    // console.log(data)

    fetch("https://my.aspectum.app/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "User created and logged in successfully") {

          // шаг ставим в useEffect при появлении user в приложении // todo потестить
          // setStep(5) 

          
          fetchUserProfile()

        } else {
          // Обработка ошибок

          throw new Error(result.error);
          // alert(result.error);
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert(error);
      });
  }


  const fetchUserProfile = async () => {
    try {
      setIsUserLoading(true)
      const response = await fetch('https://my.aspectum.app/api/profile/', {
        method: 'GET',
        credentials: 'include',
      })
      if (response.redirected !== true) {
        console.log('Юзер авторизован!')
        const user  = await response.json();
        setUser(user)
      
      } else {
        throw new Error('Ошибка при получении данных профиля');
      }
    } catch(err) {
      console.log(err)
    } finally {
      setIsUserLoading(false)
    }
  }

  return (
    <div className={step !== 5 ? s.onboarding : s.onboardingFinal}>

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
            setPopupOpened={setPopupOpened}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            coords={coords}
            setCoords={setCoords}
          />
        }

        {
          step === 3 && <Step3
            setStep={setStep}
            nickname={nickname}
            setNickname={setNickname}
            selectedTab={selectedSex}
            setSelectedTab={setSelectedSex}
          />
        }

        {
          step === 4 && <Step4
            setStep={setStep}
            setEmail={setEmail}
            email={email}
            checkboxCheckedValues={consentCheckboxes}
            setCheckboxCheckedValues={setConsentCheckboxes}
            submitForm={submitForm}
          />
        }

        {
          step === 5 && <Step5
            setStep={setStep}

          />
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