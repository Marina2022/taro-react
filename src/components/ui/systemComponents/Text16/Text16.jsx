import s from './Text16.module.scss';
const Text16 = ({children, classname=''}) => {
  return (
    <div className={`${s.text} ${classname}`} >
      {children}
    </div>
  );
};

export default Text16;