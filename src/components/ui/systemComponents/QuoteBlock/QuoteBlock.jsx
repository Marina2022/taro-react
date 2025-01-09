import s from './QuoteBlock.module.scss';
const QuoteBlock = ({children, classname=''}) => {
  return (
    <div className={`${s.quoteBlock} ${classname}`}>

      <div className={s.quoteDecor}>
        <div className={s.quoteIcon}></div>        
        <div className={s.quoteLine}></div>
        <div className={s.quoteIcon}></div>
      </div>
      <div className={s.quoteText}>
        {children}
      </div>          
    </div>
  );
};

export default QuoteBlock;