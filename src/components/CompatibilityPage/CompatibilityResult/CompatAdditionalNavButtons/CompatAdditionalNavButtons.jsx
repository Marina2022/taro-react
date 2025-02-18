import s from './CompatAdditionalNavButtons.module.scss';
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import SectionButton from "@/components/NatalPage/AdditionalNavButtons/SectionButton/SectionButton.jsx";
import CompatSectionButton
  from "@/components/CompatibilityPage/CompatibilityResult/CompatAdditionalNavButtons/CompatSectionButton/CompatSectionButton.jsx";
import React from "react";

const CompatAdditionalNavButtons = ({sections, userId}) => {

  const testSections = [...sections, { ...sections[0], completed: true, in_progress: false}, {...sections[1], in_progress: true, completed: false}]
  
  return (
    <div>      
      <div className={s.wrapper}>
        <ul className={s.buttonsList}>
          {
            sections.map((section, i) => <CompatSectionButton key={i} section={section} userId={userId} />)            
          }
        </ul>
      </div>
    </div>
  );
};

export default React.memo(CompatAdditionalNavButtons);