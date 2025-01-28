import s from './BiorhythmItem.module.scss';
import {biorhythms} from "../../../../../../data/biorhythms.js";
import ProgressBar from "@/components/ui/systemComponents/ProgressBar/ProgressBar.jsx";

const BiorhythmItem = ({name, value}) => {

  return (
    <li className={s.itemWrapper}>
      <div className={s.name}>{biorhythms[name]}</div>
      <ProgressBar value={value / 100} low={.4} high={.6} label="Показатель красный" classname={s.progressBar}/>           
    </li>
  );
};

export default BiorhythmItem;