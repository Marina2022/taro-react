import s from './Step5.module.scss';
import DataInput from "@/components/ui/systemComponents/DataInput/DataInput.jsx";
import TimeInput from "@/components/ui/systemComponents/TimeInput/TimeInput.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import {useEffect, useState} from "react";
import Animation from "@/components/OnboardingPage/Step5/Animation/Animation.jsx";
import {useNavigate} from "react-router-dom";
import {useUserAuth} from "@/context/authContext.jsx";
import OnboardingSlider from "@/components/OnboardingPage/Step5/OnboardingSlider/OnboardingSlider.jsx";

const Step5 = ({setStep}) => {

  const {setNatalChartCreated} = useUserAuth()
  const [isCounting, setIsCounting] = useState(true)
  const navigate = useNavigate()  
  const [changeSlide, setChangeSlide] = useState(true) 

  useEffect(() => {
    if (!isCounting) {      
      localStorage.setItem('natalChartCreated', true)
      setNatalChartCreated(true)
    }
  }, [isCounting]);
  
  const handleClick = () => {
    if (isCounting) {
      setChangeSlide(prev => !prev)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <div className={s.controlsBlock}>
        <h2 className={s.header}>Добро пожаловать</h2>
        <p className={s.text}>
          Мы отправили пароль на ваш email
        </p>
        <Animation isCounting={isCounting} setIsCounting={setIsCounting}/>
        <div className={s.sliderWrapper}>
          <OnboardingSlider changeSlide={changeSlide}/>
        </div>
      </div>
      <Button onClick={handleClick} classname={s.btn}>{isCounting ? 'Далее' : 'Приступить'}</Button>
    </>
  );
};

export default Step5;