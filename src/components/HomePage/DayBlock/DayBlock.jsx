import s from "./DayBlock.module.scss";
import React from "react";
import RingChart from "@/components/ui/systemComponents/RingChart/RingChart.jsx";
import {getProgressBarColor} from "@/utils.js";
import {Link} from "react-router-dom";
import {useAppContext} from "@/contexts/appContext.jsx";

const DayBlock = ({classname}) => {

    const {isDayLoading, setIsDayLoading, setDayQuality, dayQuality} = useAppContext()

    const date = new Date()
    const formattedDate = date.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'});
    const dayOfWeek = date.toLocaleDateString('ru-RU', {weekday: 'long'});
    const dayOfWeekCapitalized = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
    const shortDayOfWeek = date.toLocaleDateString('ru-RU', {weekday: 'short'}).toUpperCase();

    return (

      <Link to="/day-energy"
            className={`${s.card} ${classname}`}>
        <div className={s.bordered}>
          <div className={s.shortDayOfWeek}>{formattedDate}<br/>{dayOfWeekCapitalized}</div>
          {
            !isDayLoading && <div className={s.chartWrapper}>
              <RingChart value={dayQuality} low={0.4} high={.6}/>
              <div className={s.percent}
                   style={{color: getProgressBarColor(dayQuality, 0.4, .6)}}>{(dayQuality * 100).toFixed(0)}%
              </div>
            </div>
          }
        </div>
        <div className={s.cardText}>
          <h2 className={s.cardTitle}>Энергия <br className={s.br}/>дня</h2>
          <p className={s.cardDescription}>Что принесет этот день?</p>
        </div>
      </Link>
    );
  }
;

export default React.memo(DayBlock);