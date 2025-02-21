import s from './CompatibilityResultText.module.scss';
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";

const CompatibilityResultText = ({pars, title, icon}) => {
  return (
    <div className={s.textBlock}>
      <ul>
        {
          pars.map((par, i) => {
            return (
              <div key={i}>

                <div className={s.headerWrapper}>

                  <div className={s.imgWrapper}>
                    <img className={s.iconImg} src={icon} alt="icon"/>
                  </div>
                  <Header20 classname={s.title}>{title}</Header20>
                </div>
                

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