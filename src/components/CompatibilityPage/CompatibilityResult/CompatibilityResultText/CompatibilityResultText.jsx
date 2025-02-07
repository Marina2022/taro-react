import s from './CompatibilityResultText.module.scss';
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";

const CompatibilityResultText = ({pars, title}) => {
  return (
    <div className={s.textBlock}>
      <ul>
        {
          pars.map((par, i)=>{
            return (
              
              <div key={i}>
                <Header20 classname={s.title}>{title}</Header20>
              <p className={s.par}>{par}</p>

              </div>
            )
          })
        }
      </ul>
      
      
    </div>
  );
};

export default CompatibilityResultText;