import s from './Animation.module.scss';
import Counter from "@/components/OnboardingPage/Step5/Counter/Counter.jsx";

const Animation = ({isCounting, setIsCounting}) => {
  return (
    <div className={s.animation}>
      <Counter isCounting={isCounting} setIsCounting={setIsCounting} classname={s.percentCounter} />
      
      <div className={s.gameLoader}>
        <div className={isCounting ? s.planet : `${s.planet} ${s.noAnimation}` }>
          <div className={s.loaderRadius1}></div>
          <div className={s.loaderRadius2}></div>
          <div className={s.loaderRadius3}></div>
          <div className={s.loaderRadius4}></div>
          <div className={s.loaderMini1}></div>
          <div className={s.loaderMini2}></div>
          <div className={s.loaderMini3}></div>
          <div className={s.loaderMini4}></div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="15"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo"/>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
};

export default Animation;