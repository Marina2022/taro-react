import s from './BigPictureCards.module.scss';
import BigPicture from "@/components/ui/systemComponents/BigPictureCards/BigPicture.jsx";

const BigPictureCards = ({pictures}) => {
  return (
    <div className={s.cardRow}>
      {
        pictures.map((picture, i) => {
          return <BigPicture key={i} picture={picture} />      
        })
      }
    </div>
  );
};

export default BigPictureCards;