import s from './SmallBar.module.scss';

const SmallBar = ({title, description, number, classname=''}) => {
  return (
    <div className={`${s.card} ${classname}`}>
      <div className={s.cardIcon}></div>
      <div className={s.cardText}>
        <p className={s.cardTitle}>{title}</p>
        <p className={s.cardDescription}>{description}</p>
      </div>
      <div className={s.cardIndicator}>{number}</div>
    </div>
  );
};

export default SmallBar;