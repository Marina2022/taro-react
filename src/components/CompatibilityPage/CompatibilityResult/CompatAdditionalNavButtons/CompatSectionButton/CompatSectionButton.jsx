import s from './CompatSectionButton.module.scss';
import {useNavigate} from "react-router-dom";
import {BsExclamationCircle} from "react-icons/bs";
import axiosInstance from "@/api/axiosInstance.js";

const CompatSectionButton = ({section, userId}) => {

  const navigate = useNavigate()
  const clickHandler = () => {
    if (section.in_progress) return
    
    if (section.completed) {     
      if (!section.is_read) {        
        axiosInstance.post('api/orders/set-read/', {order_id: section.order_id})        
      }
      
      navigate(`/compatibility/answer/${userId}/${section.followup_name}`)
      return
    }

    if (!section.completed && !section.in_progress ) {
      
      navigate(`/compatibility/question/${userId}/${section.followup_name}`, {state: {questions: section.questions, name: section.name}})
      return
    }
  }

  return (
    <li
      style={{backgroundColor: section.completed ? 'rgba(255, 185, 76, 0.16)' : ''}}
      className={`${s.sectionButton}  ${section.in_progress ? s.disabled : null}`} onClick={clickHandler}>
      <span
        style={{opacity: section.in_progress ? .5 : 1}}
        className={s.buttonName}>{section.name}
      </span>
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
        section.completed && <BsExclamationCircle className={s.readyIcon}/>
      }
      {
        !section.in_progress && !section.completed && <div className={s.listItemChevron}></div>
      }
    </li>
  );
};

export default CompatSectionButton;