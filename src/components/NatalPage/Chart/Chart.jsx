import s from './Chart.module.scss';
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const Chart = () => {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      
      try {
        setIsLoading(true)
        const result = await axiosInstance('api/natal')
        setData(result.data)  
      } catch(err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }      
    }

    getData()

  }, []);

  console.log(data)

  console.log(data?.user?.birth_date)

  // if (data) {
    const date = new Date(data?.user.birth_date);

    const formattedDate = date?.toLocaleString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const resultedDate = formattedDate.replace(" г.", "").replace(",", "").replace(" в ", " - ");


    
  // }
  
  if (isLoading) return null

  return (
    <div className={s.chartPage}>
      <div className='container'>
        <Header24 classname={s.mainTitle}>НАТАЛЬНАЯ КАРТА</Header24>

        <div className={s.chartWrapper}>
          <div className={s.userChartInfo}>
            <span className={s.chartInfoDate}>{resultedDate}</span>
            <span className={s.chartInfoLocation}>{data?.user.location}</span>            
          </div>

          <div className={s.picturesBlock}>
            <img className={s.mapImg} src="https://my.aspectum.app/api/natal/chart-svg/" alt="nalal map"/>
            <img className={s.aspectImg} src="https://my.aspectum.app/api/natal/aspect-chart-svg/" alt="aspect"/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chart;