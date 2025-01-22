import s from './Clock.module.scss';
import {useAppContext} from "@/contexts/appContext.jsx";
import {useEffect, useRef, useState} from "react";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";

const Clock = ({
                 classname,
                 loading,
                 currentTimer,
                 onEnd = () => {
                 },
                 useGlobalTimer = false
               }) => {
  const [innerTimerValue, setInnerTimerValue] = useState(currentTimer)
  const intervalId = useRef()

  useEffect(() => {
    if (innerTimerValue > 0) {
      intervalId.current = setInterval(() => {
        setInnerTimerValue((prev) => {
          if (prev === 0) {
            clearInterval(intervalId.current); // Остановка таймера, когда значение достигло 0
            onEnd()
            return 0;
          }
          return prev - 1; // Уменьшение таймера
        });
      }, 1000);
      return () => clearInterval(intervalId.current); // Очистка интервала при размонтировании
    }
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');
  };

  return (
    <div className={`${s.clock} ${classname}`}>
      {
        loading ? <MiniSpinner/> : formatTime(useGlobalTimer ? currentTimer : innerTimerValue)
      }
    </div>
  )
}

export default Clock;