import s from './ShortInfo.module.scss';
import {GiDiamonds, GiPolarStar} from "react-icons/gi";

const ShortInfo = ({data}) => {
  return (
    <div className={s.shortInfo}>            
      <span>Знак: {data.sign}</span>
      <GiDiamonds />
      <span>Стихия: {data.element}</span>
      <GiDiamonds />
      <span>Управитель: {data.ruler}</span>
    </div>
  );
};

export default ShortInfo;