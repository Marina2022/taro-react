import s from './Header20.module.scss';
const Header20 = ({children, classname=''}) => {
  return (
    <p className={`${s.title} ${classname}`} >
      {children}
    </p>
  );
};
export default Header20;