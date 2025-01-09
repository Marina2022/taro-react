import s from './InputLabel.module.scss';
const InputLabel = ({children}) => {
  return (
    <label className={s.label}>
      {children}
    </label>
  );
};

export default InputLabel;