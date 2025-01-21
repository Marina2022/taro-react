import s from "./DayBlock.module.scss";
import {useEffect, useState} from "react";
import RingChart from "@/components/ui/systemComponents/RingChart/RingChart.jsx";
import InputLabel from "@/components/ui/systemComponents/InputLabel/InputLabel.jsx";
import {getProgressBarColor} from "@/utils.js";
import {Link} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance.js";

const DayBlock = ({classname}) => {

    const [dayQuality, setDayQuality] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const getDay = async () => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentTime = new Date().toISOString();
        const payload = {
          now_dt: currentTime, timezone: timeZone
        }

        try {
          setIsLoading(true)
          const result = await axiosInstance.post('biorhythms/day/', payload)
          setDayQuality(result.data.day_quality)
        } catch (err) {
          console.log(err)
        } finally {
          setIsLoading(false)
        }
      }
      getDay()
    }, [])

    const date = new Date()

    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      // month: '2-digit',
      month: 'long',
      // year: 'numeric',
    });

    const dayOfWeek = date.toLocaleDateString('ru-RU', {weekday: 'long'});
    const dayOfWeekCapitalized = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
    const shortDayOfWeek = date.toLocaleDateString('ru-RU', {weekday: 'short'}).toUpperCase();

    return (
      <Link to="/today"
            className={`${s.card} ${classname}`}>
        <div className={s.bordered}>
          
          {/*<div className={s.flexWrapper}>*/}
          <div className={s.shortDayOfWeek}>{shortDayOfWeek}</div>
          <div className={s.shortDate}>{date.getDate()}</div>
          {/*</div>*/}

          {
            !isLoading && <div className={s.chartWrapper}>
              <RingChart value={dayQuality} low={0} high={1}/>
              <div className={s.percent}
                   style={{color: getProgressBarColor(dayQuality, 0, 1)}}>{(dayQuality * 100).toFixed(0)}%
              </div>
            </div>
          }

        </div>

        <div className={s.cardText}>
          <h2 className={s.cardTitle}>{formattedDate}</h2>
          <p className={s.cardSubtitle}>{dayOfWeekCapitalized}</p>
          {/*<p className={s.cardDescription}>Чего ожидать от дня?</p>*/}
          <p className={s.cardDescription}>Что принесет этот день?</p>
        </div>
      </Link>
    );
  }
;

export default DayBlock;