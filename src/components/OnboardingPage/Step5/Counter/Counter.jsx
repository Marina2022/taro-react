import React, {useEffect, useRef, useState} from 'react';
import s from "@/components/OnboardingPage/Step5/Animation/Animation.module.scss";

const Counter = ({isCounting, setIsCounting, classname}) => {

  const [currentPercent, setCurrentPercent] = useState(0)
  const intervalId = useRef()

  useEffect(() => {    
    intervalId.current = setInterval(() => {
      setCurrentPercent(prev => prev + 1)
    }, 600);  
    
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    }
  }, []);

  useEffect(() => {

    if (currentPercent >= 100) {
      clearInterval(intervalId.current);
      setIsCounting(false)
    }
  }, [currentPercent])

  return (
    <div className={classname}>{currentPercent}%</div>
  );
};

export default Counter;