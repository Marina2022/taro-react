import s from './ProgressBar.module.scss';
import InputLabel from "@/components/ui/systemComponents/InputLabel/InputLabel.jsx";
import {getProgressBarColor} from "@/utils.js";
const ProgressBar = ({value, low, high, label, classname = ''}) => {

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