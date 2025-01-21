import s from './WaitingPopup.module.scss';
import {useAppContext} from "@/contexts/appContext.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";

const WaitingPopup = ({isOpen, setIsOpen, onUnderstood, children}) => {
  
  if (!isOpen) return null

  return (
    <div className={s.underlay}>
      <div className={s.waitingPopup}>
        {children}
        <Button classname={s.btn} onClick={onUnderstood}>Понятно</Button>
      </div>
    </div>
  );
};

export default WaitingPopup;