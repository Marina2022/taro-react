import s from './AskAstrologerPage.module.scss';
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import TextArea from "@/components/ui/systemComponents/TextArea/TextArea.jsx";
import {useState} from "react";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import axios from "@/api/axiosInstance.js";

const AskAstrologerPage = () => {

  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const ss = {
    message: "Interpretation is being processed",
    question_id: 38,
    seconds_left: 59,
    situation_id: 176,
    status: "in_progress"
  }

  const askHandle = async () => {

    try {
      setSending(true)
      const result = await axios.post('astrologists/ask/', {
        user_question: message
      }, {withCredentials: true})

      console.log(result)

    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
        
  }

  return (
    <div className={s.askAstrologer}>
      <div className='container'>
        <AstrologerCard
          name="Александра Таровна"
          imageUrl="/img/astrologist.png">
          Таро, Астрология
        </AstrologerCard>
        <Header20 classname={s.title}>О чём вы хотите спросить?</Header20>
        <TextArea
          textAreaValue={message}
          setTextAreaValue={setMessage}
          label="Сформулируйте ваш вопрос"
          placeholder="Введите текст"
          maxLength={400}/>

        <Button onClick={askHandle}>Спросить</Button>


      </div>
    </div>
  );
};

export default AskAstrologerPage;