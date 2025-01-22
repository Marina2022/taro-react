import s from './Chart.module.scss';
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import NatalChartLegend from "@/components/NatalPage/Chart/NatalChartLegend/NatalChartLegend.jsx";
import TextBlock from "@/components/ui/TextBlock/TextBlock.jsx";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import Text16 from "@/components/ui/systemComponents/Text16/Text16.jsx";
import QuoteBlock from "@/components/ui/systemComponents/QuoteBlock/QuoteBlock.jsx";
import AdditionalNavButtons from "@/components/NatalPage/AdditionalNavButtons/AdditionalNavButtons.jsx";

const Chart = () => {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {

      try {
        setIsLoading(true)
        const result = await axiosInstance('api/natal')
        setData(result.data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getData()

  }, []);

  console.log(data)

  const date = new Date(data?.user.birth_date);

  const formattedDate = date?.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const resultedDate = formattedDate.replace(" г.", "").replace(",", "").replace(" в ", " - ");


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

          <div className={s.picturesWithLegend}>
            <div className={s.picturesBlock}>
              <img className={s.mapImg} src="https://my.aspectum.app/api/natal/chart-svg/" alt="nalal map"/>
              <img className={s.aspectImg} src="https://my.aspectum.app/api/natal/aspect-chart-svg/" alt="aspect"/>
            </div>
            <NatalChartLegend planets={data.planets}/>
          </div>
        </div>

        <div className={s.texts}>
          <TextBlock classname={s.textBlock}>
            <Header20 classname={s.textTitle}>Знак: {data.user.sign}</Header20>
            <Text16 classname={s.text}>{data.user.sign_text}</Text16>
          </TextBlock>

          <TextBlock classname={s.textBlock}>
            <Header20 classname={s.textTitle}>Асцендент: {data.user.ascendant_sign}</Header20>
            <Text16 classname={s.text}>{data.user.ascendant_sign_text}</Text16>
          </TextBlock>

          <div className={s.outerQuote}>
            <QuoteBlock classname={s.quote}>
              Натальная карта – это основа для трактовок личности и расшифровки положения звёзд. На основе этой
              информации
              астролог сможет разбирать сложные ситуации и отвечать на вопросы.
            </QuoteBlock>
          </div>
        </div>

        <AdditionalNavButtons sections={data.sections} />
               
      </div>
    </div>
  );
};

export default Chart;