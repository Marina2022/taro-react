import s from './Checkboxes.module.scss';

const Checkboxes = ({checkboxes, checkboxCheckedValues, setCheckboxCheckedValues, classname = ''}) => {
  
  // Обновляем чекбоксы (checkboxCheckedValues) в родительском стейте
  const handleCheckClick = (checkbox)=>{
    const checked = checkboxCheckedValues.includes(checkbox.value)
   
    if(checked) {
      setCheckboxCheckedValues(checkboxCheckedValues.filter(itemValue => itemValue !== checkbox.value))
    } else {
      setCheckboxCheckedValues([...checkboxCheckedValues, checkbox.value])
    }    
  }  
  
  return (
    <ul>
      {
        checkboxes.map((checkbox, i) => {
          return (
            <li 
              key={i}
              onClick={()=>handleCheckClick(checkbox)}
              className={`${s.checkboxContainer} ${classname}`}>
              {
                checkboxCheckedValues.includes(checkbox.value) ? <span className={s.checked}></span> :
                  <span className={s.unchecked}></span>
              }
              <div dangerouslySetInnerHTML={{ __html: checkbox.label }}></div>              
            </li>
          )
        })
      }
    </ul>
  );
};

export default Checkboxes;