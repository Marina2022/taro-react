import React from 'react';
import s from "./SmallPictureCards.module.scss";

const SmallPictureCards = ({pictures}) => {
  return (
    <div className={s.cardRow}>
      {
        pictures.map((picture, i)=> {
          return <div 
            key={i}
            className={s.card}>
            <img className={s.cardImage} src={picture.imageUrl} alt={picture.title}/>
            <div className={s.cardText}>
              <p className={s.cardTitle}>{picture.title}</p>
              <p className={s.cardDescription}>{picture.description}</p>
            </div>
          </div>
        })
      }
    </div>
  );
};

export default SmallPictureCards;