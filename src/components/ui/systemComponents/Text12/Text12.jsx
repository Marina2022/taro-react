import s from './Text12.module.scss';
const Text12 = ({children, classname=''}) => {
  return (
    <p className={`${s.text} ${classname}`} >
      {children}
    </p>
  );
};
export default Text12;