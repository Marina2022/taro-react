import s from "./MagicCard.module.scss";

const MagicCard = ({color}) => {
  console.log({color})
  
  let colorClass = ''
  if (color === "#E63D52") colorClass = s.red
  if (color === "#FFB94C") colorClass = s.yellow
  if (color === "#39CB3F") colorClass = s.green
  
  return (
    <div className={s.magicCardWrapper}>
      <div className={`${s.card} ${colorClass}`}>        
      </div>
    </div>
  );
};

export default MagicCard;