import s from './TextBlock.module.scss';

const TextBlock = ({children, classname=''}) => {
  return (
    <div className={`${s.textBlock} ${classname}`}>
      {children}
    </div>
  );
};

export default TextBlock;