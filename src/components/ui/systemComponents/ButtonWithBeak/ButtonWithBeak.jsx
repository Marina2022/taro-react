import s from './ButtonWithBeak.module.scss';
import {Link} from "react-router-dom";

const ButtonWithBeak = ({title, description, number, classname='', href, img, onClick=()=>{}}) => {
  
  if (href) return (
    <Link to={href} className={`${s.listItemButton} ${classname}`}>
      <div className={s.listItemIcon}>
        <img src={img} alt="icon"/>
      </div>

      <div className={s.listItemText}>
        <p className={s.listItemTitle}>{title}</p>
        <p className={s.listItemDescription}>{description}</p>
      </div>
      {
        number > 0 && <div className={s.listItemIndicator}>{number}</div>
      }
      <div className={s.listItemChevron}></div>
    </Link>
  )

  return (
    <button onClick={onClick} className={`${s.listItemButton} ${classname}`}>
      <div className={s.listItemIcon}><img src={img} alt="icon"/></div>
      <div className={s.listItemText}>
        <p className={s.listItemTitle}>{title}</p>
        <p className={s.listItemDescription}>{description}</p>
      </div>
      {
        number > 0 && <div className={s.listItemIndicator}>{number}</div>
      }
      <div className={s.listItemChevron}></div>
    </button>
  );
};

export default ButtonWithBeak;