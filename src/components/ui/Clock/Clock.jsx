import s from './Clock.module.scss';
import {useAppContext} from "@/context/appContext.jsx";

const Clock = ({classname}) => {
  
  const {currentTimer} = useAppContext()

  console.log(currentTimer)

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
      {formatTime(currentTimer)}
    </div>
  );
};

export default Clock;