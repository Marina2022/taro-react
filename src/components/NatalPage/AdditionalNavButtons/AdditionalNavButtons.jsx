import s from './AdditionalNavButtons.module.scss';
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import SectionButton from "@/components/NatalPage/AdditionalNavButtons/SectionButton/SectionButton.jsx";

const AdditionalNavButtons = ({sections}) => {
  return (
    <div>

      {/*<Header20>Дополнительная информация</Header20>*/}

      <div className={s.wrapper}>
        <ul className={s.buttonsList}>
          {
            sections.map((section, i) => <SectionButton key={i} section={section}/>)
          }
        </ul>
      </div>


    </div>
  );
};

export default AdditionalNavButtons;