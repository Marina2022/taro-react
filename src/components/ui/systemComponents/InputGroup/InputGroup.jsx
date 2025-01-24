import s from './InputGroup.module.scss';

const InputGroup = ({label, value, setValue, placeholder, classname='', autofocus=false}) => {
  return (
    <div className={classname}>
      <label className={s.inputLabel}>{label}</label>
      <input
        type="text"
        className={s.textInput}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        autoFocus={autofocus}
      />
    </div>
  );
};

export default InputGroup;