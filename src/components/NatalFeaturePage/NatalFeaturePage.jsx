import s from './NatalFeaturePage.module.scss';
import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import TextBlock from "@/components/ui/TextBlock/TextBlock.jsx";
import {signsMapping} from "../../../data/singsMapping.js";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import Text16 from "@/components/ui/systemComponents/Text16/Text16.jsx";
import QuoteBlock from "@/components/ui/systemComponents/QuoteBlock/QuoteBlock.jsx";
import AdditionalNavButtons from "@/components/NatalPage/AdditionalNavButtons/AdditionalNavButtons.jsx";

const NatalFeaturePage = () => {
  const {feature} = useParams()
  const [data, setData] = useState(null)
  const [dataIsLoading, setDataIsLoading] = useState(true)
  const [error, setError] = useState(null)  
  const location = useLocation()
  
  useEffect(() => {
    const getData = async () => {
      try {
        setDataIsLoading(true)
        setError(null)
        const response = await axiosInstance(`api/natal/description/${feature}`)
        setData(response.data)
      } catch (err) {
        setError('Нет такой страницы :(')
      } finally {
        setDataIsLoading(false)
      }
    }

    getData()
    
  }, [location]);

  if (dataIsLoading) return <Spinner/>
  if (error) return <div style={{textAlign: 'center', marginTop: 50, fontSize: 24}} className="container">{error}</div>


  return (
    <div className={s.natalFeaturePage}>
      <div className="container">
        <Header24 classname={s.mainTitle}>{data.section_name}</Header24>
        <div className={s.texts}>
          {
            data.texts.map((text, i) => {
              return (
                <TextBlock key={i} classname={s.textBlock}>
                  <div className={s.headerBlock}>

                    <div className={s.imgWrapper}>
                    <img className={s.iconImg} src={`https://my.aspectum.app/${text.icon}`} alt="icon"/>
                    </div>
                  <Header20 classname={s.textTitle}>{text.header}</Header20>

                  </div>
                  <div>
                    {
                      text.text.split('\n').map((item, ind) => {
                        return <Text16 key={ind} classname={s.text}>{item}</Text16>
                      })
                    }
                  </div>
                </TextBlock>
              )
            })
          }
        </div>
        <AdditionalNavButtons sections={data.sections} />
      </div>
    </div>
  );
};

export default NatalFeaturePage;