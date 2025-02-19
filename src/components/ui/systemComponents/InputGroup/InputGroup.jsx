import s from './InputGroup.module.scss';

const InputGroup = ({label, value, setValue, placeholder, classname='', autofocus=false, ...props}) => {
  return (
    <div className={classname}>
      {
        label && <label className={s.inputLabel}>{label}</label>
      }
      <input
        type="text"
        className={s.textInput}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        autoFocus={autofocus}
        {...props}
      />
    </div>
  );
};

export default InputGroup;