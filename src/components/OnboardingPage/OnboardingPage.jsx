import s from './OnboardingPage.module.scss';
import {useEffect, useState} from "react";
import {addLeadingZero} from "@/utils.js";
import axiosInstance from "@/api/axiosInstance.js";

import Step1 from "@/components/OnboardingPage/Step1/Step1.jsx";
import Step2 from "@/components/OnboardingPage/Step2/Step2.jsx";
import Step3 from "@/components/OnboardingPage/Step3/Step3.jsx";
import Step4 from "@/components/OnboardingPage/Step4/Step4.jsx";
import BirthdayPlacePopup from "@/components/OnboardingPage/BirthdayPlacePopup/BirthdayPlacePopup.jsx";
import Step5 from "@/components/OnboardingPage/Step5/Step5.jsx";
import {useAuthContext} from "@/contexts/authContext.jsx";
import {useAppContext} from "@/contexts/appContext.jsx";

const OnboardingPage = () => {

  const {user, setUser, setIsUserLoading, setNatalChartCreated, isUserLoading} = useAuthContext()
  
  const [step, setStep] = useState(user ? 5 : 1)
  const [onboardingCountries, setOnboardingCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({value: 20, label: 'Российская Федерация'})
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

  const {    
    setIsDayLoading,
    setDayQuality
  } = useAppContext()
  
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

    if (selectedCountry) {
      fetch(`https://my.aspectum.app/api/cities/?country_id=${selectedCountry.value}&prefix=${prefix}`)
        .then((res) =>
          res.json().then((val) => {
            setOnboardingCities(showJustPopularCities ? val.slice(0, 5) : val);
          })
        )
        .catch((error) => {
          console.error("Ошибка:", error);
        });

    }
  }, [selectedCountry, prefix])
  
  if (onboardingCountries.length === 0) return null


  const getDay = async () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentTime = new Date().toISOString();
    const payload = {
      now_dt: currentTime, timezone: timeZone
    }
    try {
      setIsDayLoading(true)
      const result = await axiosInstance.post('api/energy/day/', payload)
      setDayQuality(result.data.day_quality)
    } catch (err) {
      console.log(err)
    } finally {
      setIsDayLoading(false)
    }
  }
  
  const buildNatalMap = async () => {
    try {
      const result = await axiosInstance('/api/build/')

      if (result.data.status === 'Построение натальной карты запущено') {
        setStep(5)

        setTimeout(() => {
          fetchUserProfile()
          getDay()
        }, 30000)

      } else {
        throw new Error('Не получилось запустить построение натальной карты')
      }
    } catch (err) {
      console.log(err)
    }
  }

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

          //fetchUserProfile()
          buildNatalMap()

        } else {
          throw new Error(result.error);
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert(error);
        return false
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
        const user = await response.json();
        if (!user.sign) throw new Error('Натальная карта не построилась');
        setUser(user)


      } else {
        throw new Error('Запрос на Profile не проходит');
      }
    } catch (err) {
      console.log(err)
      alert(err)
    } finally {
      setIsUserLoading(false)
    }
  }

  // if (isUserLoading) return null

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
          step === 5 && <Step5 setStep={setStep}/>
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