import s from './TodayPage.module.scss';
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import DayCard from "@/components/TodayPage/DayCard/DayCard.jsx";

const TodayPage = () => {

  // POST /api/energy/week/
  //{now_dt: "2025-01-24T11:51:38.836Z", timezone: "Europe/Moscow"}

  const [daysData, setDaysData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [currentDayIndex, setCurrentDayIndex] = useState(0)

  useEffect(() => {
    const getDay = async () => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const currentTime = new Date().toISOString();
      const payload = {
        now_dt: currentTime, timezone: timeZone
      }

      try {
        setIsLoading(true)
        const result = await axiosInstance.post('api/energy/week/', payload)
        setDaysData(result.data)

        console.log(result.data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getDay()
  }, [])

  const startDate = daysData?.[0]?.date.replaceAll('-', '.')
  const endDate = daysData?.[6]?.date.replaceAll('-', '.')
  const weekHeading = `Неделя c ${startDate} по ${endDate}`

  // Определяем текстовое описание качества дня
  let qualityText = '';
  const quality = daysData?.quality;

  if (quality >= 0 && quality <= 20) {
    qualityText = 'неблагоприятный день';
  } else if (quality > 20 && quality <= 40) {
    qualityText = 'не самый благоприятный день';
  } else if (quality > 40 && quality <= 60) {
    qualityText = 'благоприятный день';
  } else if (quality > 60 && quality <= 80) {
    qualityText = 'очень благоприятный день';
  } else if (quality > 80 && quality <= 100) {
    qualityText = 'восхитительный день';
  }


  if (isLoading) return <Spinner/>

  return (
    <div className='container'>
      <div className={s.todayPage}>
        <Header24 classname={s.mainTitle}>БЛАГОПРИЯТНЫЕ ДНИ</Header24>
        <div className={s.weekHeading}>{weekHeading}</div>

        <div className={s.daysWrapper}>
          <div className={s.secondWrapper}>
            <div className={s.daysList}>
              {
                daysData.map((day, i) => <DayCard
                  key={i}
                  day={day}
                  index={i}
                  currentDayIndex={currentDayIndex}
                  setCurrentDayIndex={setCurrentDayIndex}
                />)
              }
              <div className={s.placeholder}></div>
            </div>
          </div>
        </div>


      </div>

    </div>
  );
};

export default TodayPage;