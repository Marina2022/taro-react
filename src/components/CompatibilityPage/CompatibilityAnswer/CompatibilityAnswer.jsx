import s from './CompatibilityAnswer.module.scss';
import React, {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useParams} from "react-router-dom";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import astrologerImg from "@/assets/img/home/astrologist.png";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import Text16 from "@/components/ui/systemComponents/Text16/Text16.jsx";

const CompatibilityAnswer = () => {

  const {id, theme} = useParams()
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const getResult = async () => {
      try {
        setIsLoading(true)
        const result = await axiosInstance(`api/compatibility/answer/${id}/followup/${theme}`)
        setResult(result.data)

        console.log(result.data)

      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getResult()

  }, []);

  if (isLoading) return <Spinner/>

  const answerParagraphs = result.interpretation_text.split("\n\n")

  return (
    <div className={s.compatabilityAnswer}>
      <div className="container">
        <Header24 classname={s.mainTitle}>{result.page_name}</Header24>

        <AstrologerCard
          name="Александра Таровна"
          imageUrl={astrologerImg}>
          {result.result_name}
        </AstrologerCard>

        <div className={s.textBlock}>
          <Header20 classname={s.subTitle}>Интересующие вопросы:</Header20>
          <Text16>
            <ul>
              {
                result.questions.map((question, i) => <li key={i} className={s.question}>{question}</li>)
              }
            </ul>
          </Text16>
        </div>

        <div className={s.textBlock}>
          <Header20 classname={s.subTitle}>Трактовка совместимости:</Header20>
          <Text16>
            {
              answerParagraphs.map((paragraph, i) => {
                const innerParagraphs = paragraph.split("\r\n")
                return (
                  <p className={s.par} key={i}>
                    {
                      innerParagraphs.map((innerParagraph, ind) => <p className={s.innerPar}
                                                                      key={ind}>{innerParagraph}</p>)
                    }
                  </p>
                )
              })}
          </Text16>
        </div>


      </div>
    </div>
  )
}

export default CompatibilityAnswer;