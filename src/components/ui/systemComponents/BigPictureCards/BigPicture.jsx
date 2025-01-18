import s from './BigPictureCards.module.scss';

const BigPicture = ({picture, classname=''}) => {
  return (
    <div
      className={`${s.card} ${classname}`}>
      <img className={s.cardImage} src={picture.imageUrl} alt={picture.title}/>
      <div className={s.cardText}>
        <h2 className={s.cardTitle}>{picture.title}</h2>
        <p className={s.cardDescription}>{picture.description}</p>
      </div>
    </div>
  );
};

export default BigPicture;