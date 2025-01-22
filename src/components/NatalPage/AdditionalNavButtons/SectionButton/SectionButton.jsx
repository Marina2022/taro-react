import s from './SectionButton.module.scss';
import {useNavigate} from "react-router-dom";

const SectionButton = ({section}) => {
  
  const navigate = useNavigate()
  const clickHandler = ()=>{
    const page = section.href.split('/').pop();    
    navigate(`/natal/description/${page}`)    
  }
  
  return (
    <li className={s.sectionButton} onClick={clickHandler}>
      <span>{section.name}</span>      
      <div className={s.listItemChevron}></div>
    </li>
  );
};

export default SectionButton;