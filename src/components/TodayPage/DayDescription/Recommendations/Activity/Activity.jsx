import s from './Activity.module.scss';
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import {FaCheck} from "react-icons/fa";
import {MdClose, MdOutlineClose} from "react-icons/md";
import {AiOutlineClose} from "react-icons/ai";
import {RiCloseLargeFill} from "react-icons/ri";

const Activity = ({activity}) => {

  // сортировка активностей по убыванию score
  const sortedActivities = activity.activities.sort((a, b) => b.score - a.score)

  if (sortedActivities.length === 0) return null

  return (
    <li className={s.activity}>

      <div className={s.headerWrapper}>

        <div className={s.imgWrapper}>
          <img className={s.iconImg} src={`https://my.aspectum.app${activity.icon}`}  alt="icon"/>
        </div>
        <Header20 classname={s.title}>{activity.name}</Header20>
      </div>


      <div className={s.recommended}>
        <h4 className={s.recommendedSubtitle}>Рекомендуемые занятия:</h4>
        <div className={s.row}>
          <svg className={s.greenCheck} width="32" height="32" viewBox="0 0 32 32" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#39CB3F" fillOpacity="0.1"/>
            <path
              d="M16 23.9297C11.5859 23.9297 7.92969 20.2812 7.92969 15.8594C7.92969 11.4453 11.5781 7.78906 15.9922 7.78906C20.4141 7.78906 24.0703 11.4453 24.0703 15.8594C24.0703 20.2812 20.4141 23.9297 16 23.9297ZM15.1328 19.7188C15.4219 19.7188 15.6719 19.5703 15.8516 19.3047L19.5078 13.6016C19.6172 13.4297 19.7109 13.2344 19.7109 13.0547C19.7109 12.6484 19.3594 12.375 18.9688 12.375C18.7188 12.375 18.5 12.5078 18.3359 12.7812L15.1016 17.9531L13.5938 16.0391C13.3984 15.7891 13.2109 15.6953 12.9688 15.6953C12.5625 15.6953 12.25 16.0234 12.25 16.4219C12.25 16.6172 12.3203 16.8047 12.4609 16.9766L14.375 19.3047C14.5938 19.5859 14.8359 19.7188 15.1328 19.7188Z"
              fill="#39CB3F"/>
          </svg>
          {
            sortedActivities.length > 0 && <div>{sortedActivities[0].name}</div>
          }
        </div>
        <div className={s.row}>
          <svg className={s.greenCheck} width="32" height="32" viewBox="0 0 32 32" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#39CB3F" fillOpacity="0.1"/>
            <path
              d="M16 23.9297C11.5859 23.9297 7.92969 20.2812 7.92969 15.8594C7.92969 11.4453 11.5781 7.78906 15.9922 7.78906C20.4141 7.78906 24.0703 11.4453 24.0703 15.8594C24.0703 20.2812 20.4141 23.9297 16 23.9297ZM15.1328 19.7188C15.4219 19.7188 15.6719 19.5703 15.8516 19.3047L19.5078 13.6016C19.6172 13.4297 19.7109 13.2344 19.7109 13.0547C19.7109 12.6484 19.3594 12.375 18.9688 12.375C18.7188 12.375 18.5 12.5078 18.3359 12.7812L15.1016 17.9531L13.5938 16.0391C13.3984 15.7891 13.2109 15.6953 12.9688 15.6953C12.5625 15.6953 12.25 16.0234 12.25 16.4219C12.25 16.6172 12.3203 16.8047 12.4609 16.9766L14.375 19.3047C14.5938 19.5859 14.8359 19.7188 15.1328 19.7188Z"
              fill="#39CB3F"/>
          </svg>
          {
            sortedActivities.length > 0 && <div>{sortedActivities[1].name}</div>
          }
        </div>
      </div>
      <div className={s.unrecommended}>
        <h4 className={s.unrecommendedSubtitle}>Занятия, которых стоит избегать:</h4>
        <div className={s.row}>
          <div className={s.iconWrapper}>
            <RiCloseLargeFill className={s.close}/>
            <svg className={s.redIcon} width="32" height="32" viewBox="0 0 32 32" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="16" fillOpacity="0.1"/>
            </svg>
          </div>
          {
            sortedActivities.length > 0 && <div>{sortedActivities[sortedActivities.length - 1].name}</div>
          }
        </div>
      </div>
    </li>
  );
};

export default Activity;