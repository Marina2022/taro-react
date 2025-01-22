import s from './NatalFeaturePage.module.scss';
import {useParams} from "react-router-dom";

const NatalFeaturePage = () => {
  
  const {feature} = useParams()
  
  return (
    <div className="container">
      {feature}
    </div>
  );
};

export default NatalFeaturePage;