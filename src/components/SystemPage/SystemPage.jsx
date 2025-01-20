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
import Checkboxes from "@/components/ui/systemComponents/Checkboxes/Checkboxes.jsx";
import RadioButtons from "@/components/ui/systemComponents/RadioButtons/RadioButtons.jsx";
import ProgressBar from "@/components/ui/systemComponents/ProgressBar/ProgressBar.jsx";
import ButtonWithBeak from "@/components/ui/systemComponents/ButtonWithBeak/ButtonWithBeak.jsx";
import SmallBar from "@/components/ui/systemComponents/SmallBar/SmallBar.jsx";
import BigBar from "@/components/ui/systemComponents/BigBar/BigBar.jsx";
import BigPictureCards from "@/components/ui/systemComponents/BigPictureCards/BigPictureCards.jsx";
import SmallPictureCards from "@/components/ui/systemComponents/SmallPictureCards/SmallPictureCards.jsx";
import QuoteBlock from "@/components/ui/systemComponents/QuoteBlock/QuoteBlock.jsx";
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import RingChart from "@/components/ui/systemComponents/RingChart/RingChart.jsx";
import InputLabel from "@/components/ui/systemComponents/InputLabel/InputLabel.jsx";

const SystemPage = () => {

  const [inputValue, setInputValue] = useState('')

  const [day, setDay] = useState('')
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState('')

  const [time, setTime] = useState('')
  const [dontKnowTime, setDontKnowTime] = useState([])

  const [selectedValue, setSelectedValue] = useState('')

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')

  const [selectedTab, setSelectedTab] = useState(1)
  const [checkboxCheckedValues, setCheckboxCheckedValues] = useState([2])

  const [radioButtonsValue, setRadioButtonsValue] = useState(10)

  const [textAreaValue, setTextAreaValue] = useState('')
  
  return (
    <div className={s.systemContainer}>


      {/*Заголовки*/}
      <Header24>Заголовок 24</Header24>
      <Header20>Второй заголовок 20</Header20>

      {/*Основной контент*/}
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

      {/*Поле ввода*/}
      <div className={s.smallWidthWrapper}>
        <InputGroup
          label="Текстовый ввод"
          value={inputValue}
          setValue={setInputValue}
          placeholder="Введите значение"
        />
      </div>

      {/*Поле ввода даты*/}
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

      {/*Поле ввода времени*/}
      <div className={s.smallWidthWrapper}>
        <TimeInput
          time={time}
          setTime={setTime}
          label="Ввод времени"
          dontKnowTime={dontKnowTime}
          setDontKnowTime={setDontKnowTime}/>
      </div>

      {/* Выбор из списка */}
      <div className={s.smallWidthWrapper}>
        <Select selectedValue={selectedValue} onSelect={setSelectedValue} options={
          [
            {value: 1, label: 'option 1'},
            {value: 2, label: 'option 2'},
            {value: 3, label: 'option 3'},
            {value: 4, label: 'option 4'},
            {value: 5, label: 'option 5'},
          ]
        }/>
      </div>

      {/*Поле для длинного текста с подсчетом символов*/}
      <div className={s.smallWidthWrapper}>
        <TextArea
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
          label="Поле для длинного текста"
          placeholder="Введите текст"
          maxLength={200}/>
      </div>

      {/*Основная кнопка*/}
      <div className={s.smallWidthWrapper}>
        <Button onClick={() => console.log('click')}>Главная кнопка</Button>
      </div>

      {/*Дополнительная кнопка*/}
      <div className={s.smallWidthWrapper}>
        <SecondaryButton onClick={() => console.log('click по дополнительной кнопке')}>Дополнительная
          кнопка</SecondaryButton>
      </div>

      {/*Табы (вкладки)*/}
      <div className={s.smallWidthWrapper}>
        <Tabs
          label="Лейбл для селекта"
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

      {/*Чекбоксы*/}
      <div className={s.smallWidthWrapper}>
        <Checkboxes
          checkboxCheckedValues={checkboxCheckedValues}
          setCheckboxCheckedValues={setCheckboxCheckedValues}
          checkboxes={
            [
              {value: 1, label: 'Значение 1'},
              {value: 2, label: 'Значение 2'},
              {
                value: 3,
                label: 'Текст на несколько строк текст на несколько строк текст на несколько строк'
              },
            ]
          }
        />
      </div>

      {/*Радио-кнопки*/}
      <div className={s.smallWidthWrapper}>
        <RadioButtons
          radioButtonsValue={radioButtonsValue}
          setRadioButtonsValue={setRadioButtonsValue}
          radioButtons={
            [
              {value: 10, label: 'Значение 10'},
              {value: 20, label: 'Значение 20'},
              {
                value: 30,
                label: 'Текст на несколько строк текст на несколько строк текст на несколько строк'
              },
            ]
          }
        />
      </div>

      <div style={{height: 20}}></div>

      {/* Прогресс бары */}
      {/* Низкое значение */}
      <ProgressBar value={.3} low={.4} high={.6} label="Показатель красный"/>

      {/* Среднее значение */}
      <div style={{height: 20}}></div>
      <ProgressBar value={.5} low={.4} high={.6} label="Показатель желтый"/>

      {/* Высокое значение */}
      <div style={{height: 20}}></div>
      <ProgressBar value={.8} low={.4} high={.6} label="Показатель зеленый"/>

      <div style={{height: 20}}></div>

      {/*Кнопка с клювиком справа*/}
      {/*href - если отправляем href, то будем рендерить ссылку*/}
      
      <ButtonWithBeak
        title="Заголовок"
        description="Описание"
        number={2}
      />

      <div style={{height: 20}}></div>

      {/*Маленькая плашка*/}
      <SmallBar title="Заголовок"
                description="Описание"
                number={20}/>

      <div style={{height: 20}}></div>

      {/*Большая плашка*/}
      <BigBar title="Заголовок" description="Описание"/>

      <div style={{height: 20}}></div>

      {/*Карточка с изображением*/}
      <BigPictureCards
        pictures={
          [
            {
              imageUrl: "/img/placeholder.png",
              title: "Заголовок",
              description: "Описание"
            },
            {
              imageUrl: "/img/placeholder.png",
              title: "Заголовок",
              description: "Описание"
            }
          ]
        }
      />

      <div style={{height: 20}}></div>

      {/*Маленькие карточки с изображением*/}
      <SmallPictureCards
        pictures={
          [
            {
              imageUrl: "/img/placeholder.png",
              title: "Заголовок",
              description: "Описание"
            },
            {
              imageUrl: "/img/placeholder.png",
              title: "Заголовок",
              description: "Описание"
            },
            {
              imageUrl: "/img/placeholder.png",
              title: "Заголовок",
              description: "Описание"
            }
          ]
        }
      />

      <div style={{height: 20}}></div>

      {/*Блок с цитатой*/}
      <QuoteBlock>
        Натальная карта - это основа для трактовок личности и расшифровки положения звёзд. На основе этой информации
        астролог сможет разбирать сложные ситуации и отвечать на вопросы.
      </QuoteBlock>

      <div style={{height: 20}}></div>

      {/*Карточка астролога*/}
      <AstrologerCard
        name="Александра Таровна"
        imageUrl="/img/astrologist.png">
        Таро, Астрология
      </AstrologerCard>

      <div style={{height: 20}}></div>

      {/* Диграмма  */}
      <div className={s.diagramWrapper}>
        <div style={{flex: 1}}>
          <InputLabel>С низким значением:</InputLabel>
          <RingChart value={0.3} low={0.4} high={0.6}/>
        </div>

        <div style={{flex: 1}}>
          <InputLabel>Со средним значением:</InputLabel>
          <RingChart value={0.5} low={0.4} high={0.6}/>
        </div>

        <div style={{flex: 1}}>
          <InputLabel>С высоким значением:</InputLabel>
          <RingChart value={0.7} low={0.4} high={0.6}/>
        </div>
      </div>

      <div style={{height: 100}}></div>
    </div>
  )
}

export default SystemPage;