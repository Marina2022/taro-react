import s from './CompatSectionButton.module.scss';
import {useNavigate} from "react-router-dom";

const CompatSectionButton = ({section}) => {
  
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
        section.in_progress && (
          <svg className={s.clockIcon} width="16" height="17" viewBox="0 0 16 17" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 16.8281C3.64844 16.8281 0.03125 13.2109 0.03125 8.85938C0.03125 6.91406 0.765625 5.10938 1.95312 3.71875C2.24219 3.375 2.67188 3.35156 2.92969 3.625C3.1875 3.89844 3.17188 4.26562 2.9375 4.57031C1.95312 5.71875 1.36719 7.21094 1.35938 8.85938C1.35156 12.5469 4.3125 15.5 8 15.5C11.6875 15.5 14.6328 12.5469 14.6328 8.85938C14.6328 5.35156 11.9766 2.51562 8.53906 2.24219V4.57031C8.53906 4.91406 8.30469 5.17969 7.96094 5.17969C7.625 5.17969 7.39062 4.91406 7.39062 4.57031V1.54688C7.39062 1.14062 7.59375 0.890625 8.00781 0.890625C12.3672 0.890625 15.9688 4.5 15.9688 8.85938C15.9688 13.2109 12.3594 16.8281 8 16.8281ZM9.25 9.98438C8.61719 10.5938 7.75 10.4609 7.22656 9.71875L4.34375 5.58594C4.07031 5.20312 4.47656 4.78906 4.86719 5.0625L9 7.95312C9.74219 8.46875 9.86719 9.33594 9.25 9.98438Z"
              fill="#FFB94C"/>
          </svg>
        )
      }

      {
        !section.in_progress && !section.completed && <div className={s.listItemChevron}></div>
      }


    </li>
  );
};

export default CompatSectionButton;