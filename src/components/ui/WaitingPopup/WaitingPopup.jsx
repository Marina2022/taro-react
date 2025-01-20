import s from './WaitingPopup.module.scss';
import {useAppContext} from "@/context/appContext.jsx";

const WaitingPopup = ({isOpen, setIsOpen}) => {
  
  const {situations} = useAppContext()
  
  if (!isOpen) return null
  
  return (
    <div>
      WaitingPopup
    </div>
  );
};

export default WaitingPopup;