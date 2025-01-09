import React from 'react';
import s from "./SmallPictureCards.module.scss";

const SmallPictureCards = () => {
  return (
    <div className={s.cardRow}>
      <div className={s.card}>
        <img className={s.cardImage} src="/img/placeholder.png" alt="Placeholder"/>
        <div className={s.cardText}>
          <p className={s.cardTitle}>Заголовок</p>
          <p className={s.cardDescription}>Описание</p>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.cardImage} src="/img/placeholder.png" alt="Placeholder"/>
        <div className={s.cardText}>
          <p className={s.cardTitle}>Заголовок</p>
          <p className={s.cardDescription}>Описание</p>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.cardImage} src="/img/placeholder.png" alt="Placeholder"/>
        <div className={s.cardText}>
          <p className={s.cardTitle}>Заголовок</p>
          <p className={s.cardDescription}>Описание</p>
        </div>
      </div>
    </div>
  );
};

export default SmallPictureCards;