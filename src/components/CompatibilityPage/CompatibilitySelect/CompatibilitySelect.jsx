import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import s from './CompatibilitySelect.module.scss'
import {LuCirclePlus} from "react-icons/lu";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import WaitingBar from "@/components/ui/WaitingBar/WaitingBar.jsx";

const CompatibilitySelect = () => {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const getData = async () => {
    try {
      setIsLoading(true)
      const result = await axiosInstance(`api/compatibility/select/`)
      setData(result.data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    getData()
  }, []);

  const addPersonHandler = () => {
    navigate('/compatibility/order')
  }

  if (!data) return <Spinner/>

  return (

    <div className={s.compatSelect}>
      <div className="container">
        <Header24 classname={s.mainTitle}>СОВМЕСТИМОСТЬ</Header24>

        <ul>
          {            
            data.map((item, i) => <WaitingBar key={i} situation={item} isSelectPage={true} endHandler={getData}  />)
          }
        </ul>

        <div className={s.card} onClick={addPersonHandler}>
          <div className={s.cardText}>
            <p className={s.cardTitle}>Добавить персону</p>
          </div>
          <LuCirclePlus className={s.cardIcon}/>
        </div>
      </div>
    </div>
   
  );
};

export default CompatibilitySelect;