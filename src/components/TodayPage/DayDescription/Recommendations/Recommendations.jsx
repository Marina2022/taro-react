import s from './Recommendations.module.scss';
import Activity from "@/components/TodayPage/DayDescription/Recommendations/Activity/Activity.jsx";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";

const Recommendations = ({activities}) => {
  return (
    <div className={s.recommendations}>
      <Header24 classname={s.title}>Рекомендации по активностям</Header24>
      {
        activities.map((activity, i)=><Activity key={i} activity={activity} />)
      }
      
      
    </div>
  );
};

export default Recommendations;