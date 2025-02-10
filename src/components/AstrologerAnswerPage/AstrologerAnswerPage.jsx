import s from './AstrologerAnswerPage.module.scss';
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance.js";
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import astrologerImg from "@/assets/img/home/astrologist.png";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import Text16 from "@/components/ui/systemComponents/Text16/Text16.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const AstrologerAnswerPage = () => {

  const [answer, setAnswer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {id} = useParams()

  useEffect(() => {
    const getAnswer = async () => {
      try {
        setIsLoading(true)
        const result = await axiosInstance(`api/astrologists/answer/${id}`)
        setAnswer(result.data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getAnswer()

  }, []);

  if (isLoading) return <Spinner/>
  
  const answerParagraphs = answer.answer.split("\n\n")

  return (
    <div className={s.astrologerAnswer}>
      <div className='container'>
        <Header24 classname={s.mainTitle}>ОТВЕТ АСТРОЛОГА</Header24>
        <AstrologerCard
          name="Александра Таровна"
          imageUrl={astrologerImg}>
          Таро, Астрология
        </AstrologerCard>
        <Header20 classname={s.title}>Ваш вопрос:</Header20>
        <Text16>
          {answer.question}
        </Text16>
        <Header20 classname={s.answerTitle}>Ответ астролога:</Header20>
        <Text16>
          {
            answerParagraphs.map((paragraph, i) => {
              const innerParagraphs = paragraph.split("\r\n")
              return (
                <div className={s.par} key={i}>
                  {
                    innerParagraphs.map((innerParagraph, ind) => <p className={s.innerPar}
                                                                    key={ind}>{innerParagraph}</p>)
                  }
                </div>
              )
            })}
        </Text16>
      </div>
    </div>
  );
};

export default React.memo(AstrologerAnswerPage);