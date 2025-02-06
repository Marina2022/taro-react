import s from './Recommendations.module.scss';
import Activity from "@/components/TodayPage/DayDescription/Recommendations/Activity/Activity.jsx";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";

const Recommendations = ({activities}) => {
    
  return (
    <div className={s.recommendations}>
      <Header24 classname={s.title}>Рекомендации по активностям</Header24>
      
      <ul className={s.recommendList}>
      {
        activities.map((activity, i)=><Activity key={i} activity={activity} />)
      }
      </ul>
    </div>
  );
};

export default Recommendations;