import s from './Compatibility.module.scss';
import ProgressBar from "@/components/ui/systemComponents/ProgressBar/ProgressBar.jsx";

const CompatibilityItem = ({name, value}) => {

  return (
    <li className={s.itemWrapper}>
      <div className={s.name}>{name}</div>
      <ProgressBar value={value / 100} low={.4} high={.6} label="Показатель красный" classname={s.progressBar}/>           
    </li>
  );
};

export default CompatibilityItem;