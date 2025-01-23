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
      <span className={section.locked ? s.buttonNameLocked : s.buttonName}>{section.name}</span>

      {
        section.locked &&
        <svg className={s.lockIcon} width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.42188 15.8203C1.27344 15.8203 0.664062 15.1953 0.664062 13.9609V8.57812C0.664062 7.49219 1.14062 6.88281 2.03125 6.75V4.85938C2.03125 1.92188 3.95312 0.5 5.99219 0.5C8.03906 0.5 9.96094 1.92188 9.96094 4.85938V6.75C10.8594 6.88281 11.3281 7.5 11.3281 8.57812V13.9609C11.3281 15.1953 10.7188 15.8203 9.57031 15.8203H2.42188ZM3.27344 4.69531V6.72656H8.72656V4.69531C8.72656 2.71875 7.45312 1.67969 5.99219 1.67969C4.53125 1.67969 3.27344 2.71875 3.27344 4.69531ZM2.46094 14.6406H9.53125C9.875 14.6406 10.0625 14.4297 10.0625 14.0469V8.49219C10.0625 8.10938 9.875 7.90625 9.53125 7.90625H2.46094C2.125 7.90625 1.92969 8.10938 1.92969 8.49219V14.0469C1.92969 14.4297 2.125 14.6406 2.46094 14.6406Z"
            fill="currentcolor"/>
        </svg>

      }

      {
        !section.locked && <div className={s.listItemChevron}></div>
      }


    </li>
  );
};

export default SectionButton;