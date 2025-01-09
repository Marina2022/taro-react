import s from "./Select.module.scss";

const Select = ({selectedValue, setSelectedValue, options, classname = ''}) => {
  return (
    <div className={`${s.inputIconContainer} ${classname}`}>
      <select
        required
        id="birth-month"
        className={s.select}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
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