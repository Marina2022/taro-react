import s from "./Select.module.scss";

const Select = ({selectedValue, onSelect, options, classname = ''}) => {

  const handleChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];

    // Получаем выбранный <option>    
    const label = selectedOption.text; // Текст внутри <option>
    const value = selectedOption.value; // Значение атрибута value
    onSelect({ label, value }); // Сохраняем объект в стейт
  };
  
  return (
    <div className={`${s.inputIconContainer} ${classname}`}>
      <select
        required
        id="birth-month"
        className={s.select}
        value={selectedValue.value}
        onChange={handleChange}
      >        
        {
          options.map((option, i) => <option value={option.value} key={i}>{option.label}</option>)
        }
      </select>
      <div className={s.inputIcon}></div>
    </div>
  );
};

export default Select;