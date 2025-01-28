import s from './Activity.module.scss';
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import {FaCheck} from "react-icons/fa";
import {MdClose, MdOutlineClose} from "react-icons/md";
import {AiOutlineClose} from "react-icons/ai";
import {RiCloseLargeFill} from "react-icons/ri";

const Activity = ({activity}) => {

  // сортировка активностей по убыванию score
  const sortedActivities = activity.activities.sort((a, b) => b.score - a.score)

  return (
    <div className={s.activity}>
      <Header20 classname={s.title}>{activity.name}</Header20>

      <div className={s.recommended}>
        <h4 className={s.recommendedSubtitle}>Рекомендуемые занятия:</h4>

        <div className={s.row}><FaCheck className={s.check} />
          <div>{sortedActivities[0].name}</div>
        </div>
        <div className={s.row}><FaCheck className={s.check} />
          <div>{sortedActivities[1].name}</div>
        </div>
      </div>

      <div className={s.unrecommended}>
        <h4 className={s.unrecommendedSubtitle}>Занятия, которых стоит избегать:</h4>


        <div className={s.row}><RiCloseLargeFill className={s.close} />
          <div>{sortedActivities[sortedActivities.length - 1].name}</div>
        </div>
      </div>


    </div>
  );
};

export default Activity;