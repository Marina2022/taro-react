import s from './DayIsGood.module.scss';

const DayIsGood = ({dayQuality, date}) => {
  
  let qualityText = '';
  const quality = dayQuality;

  if (quality >= 0 && quality <= 20) {
    qualityText = 'неблагоприятный день';
  } else if (quality > 20 && quality <= 40) {
    qualityText = 'не самый благоприятный день';
  } else if (quality > 40 && quality <= 60) {
    qualityText = 'благоприятный день';
  } else if (quality > 60 && quality <= 80) {
    qualityText = 'очень благоприятный день';
  } else if (quality > 80 && quality <= 100) {
    qualityText = 'восхитительный день';
  }

  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const dayOfWeek = date.toLocaleDateString('ru-RU', {weekday: 'long'});
  
  return (
    <div className={s.wrapper}>
      <p className={s.dateText}>{formattedDate}, {dayOfWeek}        </p>
      <p>{qualityText}</p>
    </div>
  );
};

export default DayIsGood;