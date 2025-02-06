import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import CompatibilityBar from "@/components/CompatibilityPage/CompatibilitySelect/CompatibilityBar/CompatibilityBar.jsx";
import BigBar from "@/components/ui/systemComponents/BigBar/BigBar.jsx";
import s from './CompatibilitySelect.module.scss'
import {LuCirclePlus} from "react-icons/lu";

const CompatibilitySelect = () => {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  
  useEffect(() => {
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

    getData()

  }, []);

  
  const addPersonHandler = () => {
    navigate('/compatibility/order')
  }
  
  if (isLoading) return <Spinner/>

  const testData = [...data, {...data[0], status: 'in_progress', seconds_left: 1000}]

  return (
    <div>
      <ul>
        {
          data.map((item, i) => <CompatibilityBar key={i} data={item}/>)
          //testData.map((item, i)=> <CompatibilityBar key={i} data={item} />)          
        }
      </ul>


      <div className={s.card} onClick={addPersonHandler}>
        <div className={s.cardText}>
          <p className={s.cardTitle}>Добавить персону</p>
        </div>
        <LuCirclePlus className={s.cardIcon}/>
      </div>

    </div>
  );
};

export default React.memo(CompatibilitySelect);