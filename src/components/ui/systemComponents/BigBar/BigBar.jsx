import React from 'react';
import s from "@/components/ui/systemComponents/SmallBar/SmallBar.module.scss";

const BigBar = ({title, description, number, classname = ''}) => {
  return (

    <div className={`${s.card} ${classname}`}>
      <div className={s.cardText}>
        <p className={s.cardTitle}>{title}</p>
        <p className={s.cardDescription}>{description}</p>
      </div>
      <div className={s.cardIcon}></div>
    </div>
  )
    ;
};

export default BigBar;