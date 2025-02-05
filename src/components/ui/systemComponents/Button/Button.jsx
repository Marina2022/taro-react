import s from './Button.module.scss';
const Button = ({children, onClick, classname='', disabled}) => {    
  return (
    <button className={`${s.button} ${classname}`} onClick={onClick} disabled={disabled} type="button" >
      {children}
    </button>
  );
};

export default Button;