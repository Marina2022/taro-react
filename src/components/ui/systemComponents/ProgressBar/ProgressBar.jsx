import s from './ProgressBar.module.scss';
import InputLabel from "@/components/ui/systemComponents/InputLabel/InputLabel.jsx";
const ProgressBar = ({value, low, high, label, classname = ''}) => {

  function getProgressBarColor(value, low, high) {
    // Определяем цвет на основе значений
    if (value < low) {
      return "#E63D52"; // Красный
    } else if (value >= low && value < high) {
      return "#FFB94C"; // Желтый
    } else {
      return "#39CB3F"; // Зеленый
    }
  }

  return (
    <div className={classname}>
      <InputLabel>{label}</InputLabel>
      <div className={s.progressContainer}>
        <div className={s.progressBar}>
          <div className={s.progress} style={{
            backgroundColor: getProgressBarColor(value, low, high),
            width: value * 100 + '%'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;