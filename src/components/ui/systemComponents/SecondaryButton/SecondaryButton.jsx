import s from './SecondaryButton.module.scss';
import Button from "@/components/ui/systemComponents/Button/Button.jsx";

const SecondaryButton = ({children, classname='', onClick}) => {  
  return (
    <Button onClick={onClick} classname={s.secondaryBtn}>      
      {children}
    </Button>
  );
};
export default SecondaryButton;