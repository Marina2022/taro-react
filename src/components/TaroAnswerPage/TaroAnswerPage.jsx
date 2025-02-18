import s from './TaroAnswerPage.module.scss';
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance.js";
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import astrologerImg from "@/assets/img/home/astrologist.png";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import Text16 from "@/components/ui/systemComponents/Text16/Text16.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import QuoteBlock from "@/components/ui/systemComponents/QuoteBlock/QuoteBlock.jsx";

const TaroAnswerPage = () => {

  const [answer, setAnswer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {id} = useParams()

  useEffect(() => {
    const getAnswer = async () => {
      try {
        setIsLoading(true)
        const result = await axiosInstance(`api/tarot/answer/${id}`)
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

  const answerParagraphs = answer.layout_text.split("\n\n")
  const allButLast = answerParagraphs.slice(0, answerParagraphs.length - 1);
  const [day, month, year] = answer.order_date.split('-');
  const date = new Date(`${year}-${month}-${day}`);
  const formattedDate = date.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});

  return (
    <div className={s.astrologerAnswer}>
      <div className='container'>
        <Header24 classname={s.mainTitle}>{answer.page_name.toUpperCase()}</Header24>
        <AstrologerCard
          name={answer.layout_name}
          imageUrl={astrologerImg}>
          {
            formattedDate
          }
        </AstrologerCard>
        <div className={s.flexContainer}>
          <div className={s.leftPart}>
            <Header20 classname={s.title}>Ваша ситуация:</Header20>
            <Text16 classname={s.text}>
              {answer.situation_description}
            </Text16>
            <Header20 classname={s.title}>Ваш вопрос:</Header20>
            <Text16 classname={s.text}>
              {answer.user_question}
            </Text16>
          </div>
          <div className={s.rightPart}>
            <div className={s.resultWrapper}>
              <img className={s.resultImg} src={"https://my.aspectum.app/" + answer.svg_url} alt="result"/>
            </div>
          </div>
        </div>
        <Header20 classname={s.answerTitle}>Трактовка расклада:</Header20>
        <Text16 classname={s.text}>
          {
            allButLast.map((paragraph, i) => {
              const innerParagraphs = paragraph.split("\r\n");
              return (
                <div className={s.par} key={i}>
                  {
                    innerParagraphs.map((innerParagraph, ind) => <p
                        className={s.innerPar}
                        key={ind}
                      >
                        {innerParagraph}
                      </p>
                    )
                  }
                </div>
              )
            })
          }
        </Text16>
        <QuoteBlock>
          {
            answerParagraphs[answerParagraphs.length - 1]
          }
        </QuoteBlock>
      </div>
    </div>
  );
};

export default TaroAnswerPage;