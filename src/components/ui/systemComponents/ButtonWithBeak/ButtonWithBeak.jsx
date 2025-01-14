import s from './ButtonWithBeak.module.scss';
const ButtonWithBeak = ({title, description, number, classname=''}) => {
  return (    
    <button className={s.listItemButton}>
      <div className={s.listItemIcon}></div>
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