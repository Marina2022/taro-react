import s from './DayCard.module.scss';
import RingChart from "@/components/ui/systemComponents/RingChart/RingChart.jsx";
import {getProgressBarColor} from "@/utils.js";

const DayCard = ({day, index, currentDayIndex, setCurrentDayIndex}) => {
    
  const [dateDay, month, year] = day.date.split("-").map(Number);
  const date = new Date(year, month - 1, dateDay); 
  const shortDayOfWeek = date.toLocaleDateString('ru-RU', {weekday: 'short'});
  
  return (
    <div className={index === currentDayIndex ? s.cardActive : s.card} onClick={()=>setCurrentDayIndex(index)}>      
      <div className={s.weekDay}>{shortDayOfWeek}, {dateDay}</div>
      <RingChart value={day.quality/100} low={.4} high={.6} hideArtefact={true} />
      <div style={{color: getProgressBarColor(day.quality/100, .4, .6)}} className={s.percents}>{(day.quality ).toFixed(0)}%</div>      
    </div>
  );
};

export default DayCard;