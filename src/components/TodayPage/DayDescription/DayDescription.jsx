import s from './DayDescription.module.scss';
import DayIsGood from "@/components/TodayPage/DayDescription/DayIsGood/DayIsGood.jsx";
import {biorhythms} from "../../../../data/biorhythms.js";
import BiorhythmCharts from "@/components/TodayPage/DayDescription/BiorhythmCharts/BiorhythmCharts.jsx";
import Recommendations from "@/components/TodayPage/DayDescription/Recommendations/Recommendations.jsx";
import Suitability from "@/components/TodayPage/DayDescription/Suitability/Suitability.jsx";

const DayDescription = ({day}) => {

  const [dateDay, month, year] = day.date.split("-").map(Number);
  const date = new Date(year, month - 1, dateDay);

  console.log(day)
  
  return (
    <div className={s.descWrapper}>
      <DayIsGood dayQuality={day.quality} date={date} />
      <BiorhythmCharts biorhythms={day.biorhythms} />
      <Recommendations activities={day.activity_types}/>

      <Suitability day={day} />
      
    </div>
  );
};

export default DayDescription;