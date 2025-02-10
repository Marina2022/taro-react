import s from './AskTaroOrderPage.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useAppContext} from "@/contexts/appContext.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useEffect, useRef, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import astrologerImg from "@/assets/img/home/astrologist.png";
import Tabs from "@/components/ui/systemComponents/Tabs/Tabs.jsx";
import TextArea from "@/components/ui/systemComponents/TextArea/TextArea.jsx";
import {modes} from "../../../data/modes.js";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import WaitingPopup from "@/components/ui/WaitingPopup/WaitingPopup.jsx";
import AskAstrologerPopupContent
  from "@/components/AskAstrologerPage/AskAstrologerPopupContent/AskAstrologerPopupContent.jsx";
import AskTaroPopupContent from "@/components/AskTaroOrderPage/AskTaroPopupContent/AskTaroPopupContent.jsx";

const AskTaroOrderPage = () => {
  const {order} = useParams()
  const {tarotLayouts, areTarotLayoutsLoading} = useAppContext()
  
  let tarotLayout
  if (!areTarotLayoutsLoading) {
    tarotLayout = tarotLayouts.find((layout) => layout.id === order)
  }

  const [mode, setMode] = useState("relationships")
  const [description, setDescription] = useState('')
  const [question, setQuestion] = useState('')

  const [sending, setSending] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [innerTimer, setInnerTimer] = useState(null)

  const {fetchSituations} = useAppContext()
  const navigate = useNavigate()
  const [initialTimer, setInitialTimer] = useState(null)
  
  const intervalId = useRef()

  useEffect(() => {

    // если установили начальный таймер, т.е. пришел ответ с АПИ
    if (initialTimer > 0) {
      setInnerTimer(initialTimer)
      intervalId.current = setInterval(() => {
        setInnerTimer((prev) => {
          if (prev === 0) {
            clearInterval(intervalId.current); // Остановка таймера, когда значение достигло 0            
            endHandler()
            return 0;
          }
          return prev - 1; // Уменьшение таймера
        });
      }, 1000);
      return () => clearInterval(intervalId.current); // Очистка интервала при размонтировании
    }
  }, [initialTimer]);

  const submitHandler = async () => {

    if (!description) {
      alert('Опишите, пожалуйста, ситуацию')
      return
    }

    if (!question) {
      alert('Задайте, пожалуйста, вопрос')
      return
    }

    try {
      setSending(true)
      const result = await axiosInstance.post('api/tarot/ask/', {
        layout_type: order,
        mode: mode,
        situation_description: description,
        user_question: question
      })

      if (result.data.message === "Interpretation is being processed") {
        setIsOpen(true)
        setInitialTimer(result.data.seconds_left)
        
      } else {
        throw new Error("Interpretation is not being processed for some reason")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
  }
  const understoodHandler = async () => {    
    await fetchSituations()
    setIsOpen(false)

    setTimeout(() => {
      navigate('/')
    }, 0)
  }

  if (areTarotLayoutsLoading) return <Spinner/>

  return (
    <>
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
            maxLength={300}
            classname={s.descTextarea}
          />

          <TextArea
            textAreaValue={question}
            setTextAreaValue={setQuestion}
            label="Кратко сформулируйте вопрос"
            placeholder="Ваш вопрос..."
            maxLength={200}
            classname={s.questionTextarea}
          />

          <Button disabled={sending} onClick={submitHandler}>
            {
              sending ? <MiniSpinner/> : 'Далее'
            }
          </Button>
        </div>
      </div>

      <WaitingPopup isOpen={isOpen} setIsOpen={setIsOpen} onUnderstood={understoodHandler}>
        <AskTaroPopupContent currentTimer={innerTimer} layout={tarotLayout.name} />
      </WaitingPopup>
    </>
  )
}

export default AskTaroOrderPage;