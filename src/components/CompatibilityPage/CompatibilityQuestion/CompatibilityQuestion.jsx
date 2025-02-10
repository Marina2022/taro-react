import s from './CompatibilityQuestion.module.scss';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import astrologerImg from "@/assets/img/home/astrologist.png";
import Tabs from "@/components/ui/systemComponents/Tabs/Tabs.jsx";
import {modes} from "../../../../data/modes.js";
import TextArea from "@/components/ui/systemComponents/TextArea/TextArea.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import WaitingPopup from "@/components/ui/WaitingPopup/WaitingPopup.jsx";
import AskTaroPopupContent from "@/components/AskTaroOrderPage/AskTaroPopupContent/AskTaroPopupContent.jsx";
import {useState} from "react";
import {useAppContext} from "@/contexts/appContext.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import compatibility from "@/pages/Compatibility.jsx";
import {FaCheck} from "react-icons/fa";

const CompatibilityQuestion = () => {
  const location = useLocation();

  const {id, theme} = useParams()

  const data = location.state


  const [sending, setSending] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [innerTimer, setInnerTimer] = useState(null)

  const {fetchSituations} = useAppContext()
  const navigate = useNavigate()

  const submitHandler = async () => {


    // api/compatibility/answer/<целочисленный id результата базовой совместимости>/ask/


    try {
      setSending(true)
      const result = await axiosInstance.post(`api/compatibility/answer/${id}/ask/`, {
        followup_name: theme
      })

      if (result.data.message === "Interpretation is being processed") {
        setIsOpen(true)
        setInnerTimer(result.data.seconds_left)
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


  return (
    <>
      <div className={s.compatQuestion}>
        <div className="container">
          <Header24 classname={s.mainTitle}>{data.name}</Header24>

          <AstrologerCard
            name="Александра Таровна"
            imageUrl={astrologerImg}>
            Таро, Астрология
          </AstrologerCard>


          <p className={s.text}>При заказе этой услуги наш астролог изучит ваши натальные карты, чтобы ответить на
            следующие вопросы:</p>

          <ul className={s.list}>
            {
              data.questions.map((question, i) => {
                return (

                  <li key={i} className={s.item}>
                    <FaCheck className={s.check}/>
                    {question}
                  </li>
                )
              })
            }
          </ul>

          <p className={s.timeText}>Примерное время анализа - 9 часов.</p>

          <Button classname={s.btn} disabled={sending} onClick={submitHandler}>
            {
              sending ? <MiniSpinner/> : 'Далее'
            }
          </Button>
        </div>
      </div>

      <WaitingPopup isOpen={isOpen} setIsOpen={setIsOpen} onUnderstood={understoodHandler}>
        <AskTaroPopupContent currentTimer={innerTimer}/>
      </WaitingPopup>
    </>
  );
};

export default CompatibilityQuestion;