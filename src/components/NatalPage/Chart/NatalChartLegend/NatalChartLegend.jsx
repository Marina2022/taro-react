import s from './NatalChartLegend.module.scss';
import {IoIosArrowDown} from "react-icons/io";
import {useState} from "react";
import PlanetIcon from "@/components/ui/PlanetIcon/PlanetIcon.jsx";
import {TbZodiacCancer} from "react-icons/tb";
import {signIcons} from "../../../../../data/signIcons.js";
import SignIcon from "@/components/ui/SignIcon/SignIcon.jsx";

const NatalChartLegend = ({planets}) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div onClick={() => setIsOpen((prev) => !prev)} className={s.legendWrapper}>
        <span className={s.btnText}>          
          {
            isOpen ? 'Скрыть' : 'Подробнее'
          }                    
        </span>
        <IoIosArrowDown className={isOpen ? s.iconUpsidedown : s.icon}/>
      </div>

      {
        isOpen && <div className={s.info}>
          {
            planets.map((onePlanet, i) => {
              return <li className={s.raw} key={i}>
                <PlanetIcon className={s.signIcon} name={onePlanet.planet_icon_name} stroke="white" fill="white"/>
                <span>{onePlanet.name}</span>
                <span> ⟶ </span>
                <SignIcon className={s.signIcon} name={onePlanet.sign} stroke="white" fill="white"/>
                <span className={s.degrees}>{onePlanet.full_degree}</span>
              </li>
            })
          }
        </div>
      }
    </div>
  )
}

export default NatalChartLegend;