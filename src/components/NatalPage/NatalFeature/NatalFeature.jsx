import s from './NatalFeature.module.scss';
import {useParams} from "react-router-dom";

const NatalFeature = () => {
  
  const {feature} = useParams()
  
  return (
    <div className="container">
      {feature}
    </div>
  );
};

export default NatalFeature;