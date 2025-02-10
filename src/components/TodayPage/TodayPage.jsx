import s from './TodayPage.module.scss';
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import React, {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import DayCard from "@/components/TodayPage/DayCard/DayCard.jsx";
import DayDescription from "@/components/TodayPage/DayDescription/DayDescription.jsx";

const TodayPage = () => {

  const [daysData, setDaysData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [currentDayIndex, setCurrentDayIndex] = useState(1)

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
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getDay()
  }, [])


  if (isLoading) return <Spinner/>

  const [day1, month1, year1] = daysData?.[0]?.date.split('-')
  const date1 = new Date(`${year1}-${month1}-${day1}`)
  const startDate = date1.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'});
  
  const [day2, month2, year2] = daysData?.[6]?.date.split('-')
  const date2 = new Date(`${year2}-${month2}-${day2}`)
  const endDate = date2.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'});

  const weekHeading = `Неделя c ${startDate} по ${endDate}`

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

        <DayDescription day={daysData[currentDayIndex]}/>

      </div>

    </div>
  );
};

export default TodayPage;