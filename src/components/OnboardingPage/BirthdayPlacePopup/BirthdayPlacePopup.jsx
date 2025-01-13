import s from './BirthdayPlacePopup.module.scss';
import InputLabel from "@/components/ui/systemComponents/InputLabel/InputLabel.jsx";
import {useEffect, useRef, useState} from "react";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";

const BirthdayPlacePopup = ({
                              onboardingCities,
                              setOnboardingCities,
                              showJustPopularCities,
                              setShowJustPopularCities,
                              setSelectedCity,
                              setCoords,
                              selectedCity,
                              setPrefix,
                              setPopupOpened
                            }) => {


  const [cityListTitle, setCityListTitle] = useState('Популярные города')
  const [preselectedCity, setPreselectedCity] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [latInputValue, setLatInputValue] = useState('')
  const [lngInputValue, setLngInputValue] = useState('')

  const cityPopupRef = useRef()
  
  useEffect(() => {
    if (inputValue === '') return
    setPrefix(inputValue)

  }, [inputValue]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        // Закрытие попапа по Esc
        closePopup();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCityInputFocus = (e) => {
    setCityListTitle("Начните вводить название города...")
    setOnboardingCities([])
    setPreselectedCity('')
    setCoords(null)
    setInputValue('')
    setShowJustPopularCities(false)
  }

  const handleCityItemClick = (city) => {
    setPreselectedCity(city)
  }
  const handleInputChange = (e) => {

    if (!preselectedCity) {
      setInputValue(e.target.value)
    }

    // Меняем надпись над списком городов:
    if (e.target.value) {
      setCityListTitle("Выберите город из списка")
    } else {
      setCityListTitle("Начните вводить название города...")
      setOnboardingCities([])
    }
  }
  const closePopup = () => {    
    setPopupOpened(false)
    setPrefix('')
    setShowJustPopularCities(true)
  }
  const handleReadyBtnClick = () => {
    if (preselectedCity) setSelectedCity(preselectedCity)
            
    if (lngInputValue && latInputValue) {
      setCoords(
        {
          lat: latInputValue,
          lng: lngInputValue
        }
      )
      
      if (!preselectedCity) setSelectedCity(null)
    }
    
    closePopup()
  }

  const handleUnderlayClick = (e) => {
    if (!cityPopupRef.current.contains(e.target)) {
      closePopup();
    }
  }
  
  const handleLatInput = (e) => {
    setLatInputValue(e.target.value.replace(/[^0-9.-]/g, ""))
  }
  const handleLngInput = (e) => {
    setLngInputValue(e.target.value.replace(/[^0-9.-]/g, ""))
  }

  const handleLatBlur = (e) => {
    const latitude = parseFloat(e.target.value);
    if (!latitude) return;

    const isInvalid = isNaN(latitude) || latitude < -90 || latitude > 90;
    if (isInvalid) {
      alert("Широта должна быть числом от -90 до 90. ");
      setLatInputValue('')
    }
  }

  const handleLngBlur = (e) => {
    const longitude = parseFloat(e.target.value);
    if (!longitude) return;

    const isInvalid = isNaN(longitude) || longitude < -180 || longitude > 180;
    
    if (isInvalid) {
      alert("Долгота должна быть числом от -180 до 180. ");
      setLngInputValue('')
    }
  }

  return (
    <div className={s.underlay} onClick={handleUnderlayClick}>
      <div className={s.popup} ref={cityPopupRef}>
        <input
          type="text"
          className={s.cityInput}
          placeholder="Начните вводить название..."
          autoComplete="off"
          onFocus={handleCityInputFocus}
          value={preselectedCity ? preselectedCity.name + ', ' + preselectedCity.region : inputValue}
          onChange={handleInputChange}
        />

        <div>
          {
            !preselectedCity && <InputLabel>{cityListTitle}</InputLabel>
          }

          {
            !preselectedCity && (
              <div className={s.popularCitiesForScroll}>
                <ul className={s.popularCities}>
                  {
                    onboardingCities.map(city => {
                      return (
                        <li
                          key={city.id}
                          className={s.cityItem}
                          onClick={() => handleCityItemClick(city)}
                        >
                          {city.name}, {city.region}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }
        </div>

        {
          !preselectedCity && <InputLabel> Или введите координаты вручную </InputLabel>
        }

        <div className={s.coordWrapper}>
          <div>
            <label htmlFor="onboarding__lat-input" className={s.coordLabel}>Широта</label>
            <input
              className={s.coordInput}
              type="text"
              id="onboarding__lat-input"
              placeholder="00.0000"
              autoComplete="off"
              value={preselectedCity ? preselectedCity.latitude : latInputValue}
              onChange={handleLatInput}
              onBlur={handleLatBlur}
            />
          </div>
          <div>
            <label htmlFor="onboarding__lng-input" className={s.coordLabel}>Долгота</label>
            <input
              className={s.coordInput}
              type="text"
              id="onboarding__lng-input"
              placeholder="00.0000"
              autoComplete="off"
              value={preselectedCity ? preselectedCity.longitude : lngInputValue}
              onChange={handleLngInput}
              onBlur={handleLngBlur}
            />
          </div>
        </div>
        <Button onClick={handleReadyBtnClick}>Готово</Button>
      </div>
    </div>
  );
};

export default BirthdayPlacePopup;