import s from './PersonBar.module.scss';
import loveIcon from "@/assets/img/home/loveIcon.png";
import {getYearsString} from "@/utils.js";
import SignIcon from "@/components/ui/SignIcon/SignIcon.jsx";

const PersonBar = ({data}) => {

  const [day, month, year] = data.birth_date.split("/").map(Number);
  const date = new Date(year, month - 1, day); // Месяцы в JS от 0 до 11

  const formattedDate =  date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) 
  
  
  return (
    <div className={s.personBar}>
      <img className={s.img} src={loveIcon}/>
      <div>
        <div className={s.title}>{data.name}</div>
        <div className={s.personDescWrapper}>
          <div className={s.desc}>{data.gender}, {getYearsString(data.age)}</div>
          <div className={s.desc}><span className={s.mobileHidden}>Дата рождения: </span> {formattedDate}</div>
        </div>
      </div>
      <div className={s.signIcon}>
        <SignIcon name={data.sign_label} size={26} />      
      </div>
    </div>
  );
};

export default PersonBar;