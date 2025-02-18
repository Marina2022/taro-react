import s from './BiorhythmCharts.module.scss';
import BiorhythmItem from "@/components/TodayPage/DayDescription/BiorhythmCharts/BiorhythmItem/BiorhythmItem.jsx";

const BiorhythmCharts = ({biorhythms}) => {
 
  return (
    <div className={s.biorhythmCharts}>     
      <ul>
        {
          Object.keys(biorhythms).map((biorhythm, i)=><BiorhythmItem name={biorhythm} value={biorhythms[biorhythm]} key={i} />)          
        }
      </ul>      
    </div>
  );
};

export default BiorhythmCharts;