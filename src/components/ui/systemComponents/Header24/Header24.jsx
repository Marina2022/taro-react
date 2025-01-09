import s from './Header24.module.scss';
const Header24 = ({children, classname=''}) => {
  return (
    <p className={`${s.title} ${classname}`} >
      {children}
    </p>
  );
};
export default Header24;