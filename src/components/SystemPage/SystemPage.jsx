import s from './SystemPage.module.scss';
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import Text16 from "@/components/ui/systemComponents/Text16/Text16.jsx";
import Text12 from "@/components/ui/systemComponents/Text12/Text12.jsx";
import Text14 from "@/components/ui/systemComponents/Text14/Text14.jsx";
import InputGroup from "@/components/ui/systemComponents/InputGroup/InputGroup.jsx";
import {useState} from "react";
import DataInput from "@/components/ui/systemComponents/DataInput/DataInput.jsx";
import TimeInput from "@/components/ui/systemComponents/TimeInput/TimeInput.jsx";
import Select from "@/components/ui/systemComponents/Select/Select.jsx";
import TextArea from "@/components/ui/systemComponents/TextArea/TextArea.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import SecondaryButton from "@/components/ui/systemComponents/SecondaryButton/SecondaryButton.jsx";
import Tabs from "@/components/ui/systemComponents/Tabs/Tabs.jsx";

const SystemPage = () => {

  const [inputValue, setInputValue] = useState('')

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  const [time, setTime] = useState('')

  const [selectedValue, setSelectedValue] = useState('')

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
    
  const [selectedTab, setSelectedTab] = useState(1)

  return (
    <div className={s.systemContainer}>
      <Header24>Заголовок 24</Header24>
      <Header20>Второй заголовок 20</Header20>
      <Text14>
        Основной текст 16. Хороший день для дел, которые вы давно хотели сделать, но откладывали. Благоприятный день для
        любых механических или рутинных занятий, а так же путешествий, прогулок или отдыха на природе.
      </Text14>
      <Text14>Уменьшенный текст 14. Хороший день для дел, которые вы давно хотели сделать, но откладывали.
        Благоприятный день для любых механических или рутинных занятий, а так же путешествий, прогулок или отдыха на
        природе.</Text14>
      <Text12>Мелкий текст 12. Хороший день для дел, которые вы давно хотели сделать, но откладывали. Благоприятный
        день для любых механических или рутинных занятий, а так же путешествий, прогулок или отдыха на природе.
      </Text12>


      <div className={s.smallWidthWrapper}>
        <InputGroup
          label="Текстовый ввод"
          value={inputValue}
          setValue={setInputValue}
          placeholder="Введите значение"
        />
      </div>

      <div className={s.smallWidthWrapper}>
        <DataInput
          label="Ввод даты"
          day={day}
          setDay={setDay}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
      </div>

      <div className={s.smallWidthWrapper}>
        <TimeInput label="Ввод времени"/>
      </div>

      <div className={s.smallWidthWrapper}>
        <Select selectedValue={selectedValue} setSelectedValue={setSelectedValue} options={
          [
            {value: 1, label: 'option 1'},
            {value: 2, label: 'option 2'},
            {value: 3, label: 'option 3'},
            {value: 4, label: 'option 4'},
            {value: 5, label: 'option 5'},
          ]
        }/>
      </div>

      <div className={s.smallWidthWrapper}>
        <TextArea label="Поле для длинного текста" placeholder="Введите текст" maxLength={200}/>
      </div>

      <div className={s.smallWidthWrapper}>
        <Button onClick={() => console.log('click')}>Главная кнопка</Button>
      </div>

      <div className={s.smallWidthWrapper}>
        <SecondaryButton onClick={() => console.log('click по дополнительной кнопке')}>Дополнительная
          кнопка</SecondaryButton>
      </div>

      <div className={s.smallWidthWrapper}>
        <Tabs
          selectedTab={selectedTab} 
          setSelectedTab={setSelectedTab}
          tabs={
          [
            {value: 1, label: 'Значение 1'},
            {value: 2, label: 'Значение 2'},
            {value: 3, label: 'Значение 3'},
          ]
        }/>
      </div>

      <div className={s.smallWidthWrapper} >
        ddd
      </div>

    </div>
  )
    ;
};

export default SystemPage;