import s from './CompatibilityOrder.module.scss';
import React, {useEffect, useState} from "react";
import InputGroup from "@/components/ui/systemComponents/InputGroup/InputGroup.jsx";
import Tabs from "@/components/ui/systemComponents/Tabs/Tabs.jsx";
import DateInput from "@/components/ui/systemComponents/DateInput/DateInput.jsx";
import TimeInput from "@/components/ui/systemComponents/TimeInput/TimeInput.jsx";
import InputLabel from "@/components/ui/systemComponents/InputLabel/InputLabel.jsx";
import Select from "@/components/ui/systemComponents/Select/Select.jsx";
import BirthdayPlaceInput from "@/components/OnboardingPage/Step2/BirthdayPlaceInput/BirthdayPlaceInput.jsx";
import BirthdayPlacePopup from "@/components/OnboardingPage/BirthdayPlacePopup/BirthdayPlacePopup.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import {addLeadingZero, daysInMonth} from "@/utils.js";
import axiosInstance from "@/api/axiosInstance.js";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "@/contexts/appContext.jsx";
import WaitingPopup from "@/components/ui/WaitingPopup/WaitingPopup.jsx";
import AskTaroPopupContent from "@/components/AskTaroOrderPage/AskTaroPopupContent/AskTaroPopupContent.jsx";
import AskAstrologerPopupContent
  from "@/components/AskAstrologerPage/AskAstrologerPopupContent/AskAstrologerPopupContent.jsx";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";

const CompatibilityOrder = () => {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [innerTimer, setInnerTimer] = useState(null)

  const {fetchSituations} = useAppContext()

  const [countriesAreLoading, setCountriesAreLoading] = useState(true)
  const [sending, setSending] = useState(false)

  const [countries, setCountries] = useState([])

  const [selectedCountry, setSelectedCountry] = useState({value: 20, label: 'Российская Федерация'})
  const [prefix, setPrefix] = useState('')
  const [selectedCity, setSelectedCity] = useState(null)
  const [onboardingCities, setOnboardingCities] = useState([])  //todo
  const [coords, setCoords] = useState(null)
  const [showJustPopularCities, setShowJustPopularCities] = useState(true)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState('')
  const [time, setTime] = useState('')
  const [dontKnowTime, setDontKnowTime] = useState([])

  const [nickname, setNickname] = useState('')
  const [selectedSex, setSelectedSex] = useState('male')


  // если пользователь выбрал "Не знаю точное время", то посылаем 12:00 
  const timeValueToSend = dontKnowTime.length > 0 ? '12:00' : time

  const [popupOpened, setPopupOpened] = useState(false)

  useEffect(() => {
    // запрос на страны - только один раз в самом начале
    fetch("https://my.aspectum.app/api/countries")
      .then((res) =>
        res.json().then((val) => {
          setCountries(val);
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

  const handleSelect = (value) => {
    setSelectedCountry(value)
    setSelectedCity(null)
    setCoords(null)
  }


  const handleSubmit = async () => {

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
    } else if (timeArray[1] > 59 || timeArray[1].includes('_')) {
      alert("Пожалуйста, введите минуту рождения правильно.");
      return false;
    } else if (!(selectedCity || coords)) {
      alert("Пожалуйста, укажите место рождения.");
      return false;
    } else if (!nickname) {
      alert("Пожалуйста, введите имя.");
      return false
    }

    const birth_date = `${year}-${addLeadingZero(+month)}-${addLeadingZero(+day)}`;

    const requestData = {
      nickname,
      gender: selectedSex,
      birth_date,
      birth_time: dontKnowTime.length > 0 ? '12:00' : time,
      city_id: selectedCity ? selectedCity.id : null,
      latitude: coords?.lat ? +coords?.lat : "",
      longitude: coords?.lng ? +coords?.lng : ""
    }

    try {
      setSending(true)
      const result = await axiosInstance.post('api/compatibility/ask/', requestData)

      if (result.data.message === "Interpretation is being processed") {
        setIsOpen(true)
        setInnerTimer(result.data.seconds_left)
      } else {
        throw new Error("Interpretation is not being processed for some reason")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
  }

  const understoodHandler = async () => {
    await fetchSituations()
    setIsOpen(false)

    setTimeout(() => {
      navigate('/')
    }, 0)
  }

  //compatOrder

  return (
    <div className={s.compatOrder}>
      <div className="container">
        <Header24 classname={s.mainTitle}>СОВМЕСТИМОСТЬ</Header24>
        <div>
          <div className={s.fillData}>Заполните данные человека для расчёта совместимости</div>
          <form className={s.form}>
            <div className={s.row}>
              <InputGroup
                label="Имя или ник:"
                placeholder="Имя или никнейм"
                value={nickname}
                setValue={setNickname}
                autofocus={true}
                classname={s.nickInput}
              />
              <Tabs
                classname={s.sexTabs}
                label="Пол"
                selectedTab={selectedSex}
                setSelectedTab={setSelectedSex}
                tabs={
                  [
                    {value: 'male', label: 'Мужской'},
                    {value: 'female', label: 'Женский'},
                    {value: 'other', label: 'Небинарный'},
                  ]
                }/>
            </div>
            <div className={`${s.row} ${s.secondRow}`}>
              <div className={s.inRowPart}>
                <DateInput
                  label="Дата рождения"
                  day={day}
                  setDay={setDay}
                  month={month}
                  setMonth={setMonth}
                  year={year}
                  setYear={setYear}
                  autofocus={true}
                />
              </div>
              <div className={s.inRowPart}>
                <TimeInput
                  time={time}
                  setTime={setTime}
                  label="Время рождения"
                  dontKnowTime={dontKnowTime}
                  setDontKnowTime={setDontKnowTime}
                  classname={s.timeInput}
                />
              </div>
            </div>
            <div className={s.row}>
              <div className={s.inRowPart}>
                <InputLabel classname={s.countryLabel}>Страна рождения</InputLabel>
                <Select
                  selectedValue={selectedCountry}
                  onSelect={handleSelect}
                  options={
                    countries.map(country => ({value: country.id, label: country.name}))
                  }
                />
              </div>

              <div className={s.inRowPart}>
                <InputLabel classname={s.birthdayPlaceLabel}>Место рождения</InputLabel>
                <BirthdayPlaceInput setPopupOpened={setPopupOpened}
                                    selectedCity={selectedCity}
                                    coords={coords}
                                    classname={s.birthdayPlace}/>
              </div>
            </div>
            <Button onClick={handleSubmit} classname={s.btn}>Рассчитать</Button>
          </form>

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

        <WaitingPopup isOpen={isOpen} setIsOpen={setIsOpen} onUnderstood={understoodHandler}>
          <AskAstrologerPopupContent currentTimer={innerTimer}/>
        </WaitingPopup>
      </div>
    </div>
  )
}

export default CompatibilityOrder;