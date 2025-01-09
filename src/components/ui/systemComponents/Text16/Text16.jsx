import s from './Text16.module.scss';
const Text16 = ({children, classname=''}) => {
  return (
    <p className={`${s.text} ${classname}`} >
      {children}
    </p>
  );
};

export default Text16;