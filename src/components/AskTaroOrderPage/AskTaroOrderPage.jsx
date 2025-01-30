import s from './AskTaroOrderPage.module.scss';
import {useParams} from "react-router-dom";

const AskTaroOrderPage = () => {
  
  const {order} = useParams()
  
  return (
    <div className="container">
      AskTaroOrderPage - {order}
    </div>
  );
};

export default AskTaroOrderPage;