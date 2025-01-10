import s from './InputLabel.module.scss';
const InputLabel = ({children, classname=''}) => {
  return (
    <label className={`${s.label} ${classname}`}>
      {children}
    </label>
  );
};

export default InputLabel;