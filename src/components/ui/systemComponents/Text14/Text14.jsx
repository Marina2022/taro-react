import s from './Text14.module.scss';
const Text14 = ({children, classname=''}) => {
  return (
    <p className={`${s.text} ${classname}`} >
      {children}
    </p>
  );
};

export default Text14;