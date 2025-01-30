import s from './AskTaroOrderPage.module.scss';
import {useParams} from "react-router-dom";
import {useAppContext} from "@/contexts/appContext.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import astrologerImg from "@/assets/img/home/astrologist.png";
import Tabs from "@/components/ui/systemComponents/Tabs/Tabs.jsx";
import TextArea from "@/components/ui/systemComponents/TextArea/TextArea.jsx";
import {modes} from "../../../data/modes.js";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";

const AskTaroOrderPage = () => {
  const {order} = useParams()
  const {tarotLayouts, areTarotLayoutsLoading} = useAppContext()
  const tarotLayout = tarotLayouts.find((layout) => layout.id === order)
  
  const [mode, setMode] = useState("relationships")
  const [description, setDescription] = useState('')
  const [question, setQuestion] = useState('')

  
  const submitHandler = (e) => {
    if (!description) {
      alert('Опишите, пожалуйста, ситуацию')
      return
    }

    if (!question) {
      alert('Задайте, пожалуйста, вопрос')
      return
    }

    console.log({
      mode, description, question
    })
    
  }
  
  if (areTarotLayoutsLoading) return <Spinner/>  
  
  return (
    <div className={s.askTarotOrder}>
      <div className="container">
        <div>
          <Header24 classname={s.mainTitle}>{tarotLayout.name}</Header24>
          <p className={s.subtitle}>Задать вопрос</p>
        </div>
                
        <AstrologerCard
          name="Александра Таровна"
          imageUrl={astrologerImg}>
          Таро, Астрология
        </AstrologerCard>


        <Tabs
          label="О чём вы хотите спросить?"
          direction="vertical"
          selectedTab={mode}
          setSelectedTab={setMode}
          tabs={modes.map(mode => ({value: mode.value, label: mode.label}))}
          classname={s.tabs}
        />


        <TextArea
          textAreaValue={description}
          setTextAreaValue={setDescription}
          label="Опишите ситуацию"
          placeholder="Опишите ситуацию..."
          maxLength={200}
          classname={s.descTextarea}
        />


        <TextArea
          textAreaValue={question}
          setTextAreaValue={setQuestion}
          label="Кратко сформулируйте вопрос"
          placeholder="Ваш вопрос..."
          maxLength={100}
          classname={s.questionTextarea}
        />

        <Button onClick={submitHandler}>Далее</Button>

      </div>
    </div>
  );
};

export default AskTaroOrderPage;