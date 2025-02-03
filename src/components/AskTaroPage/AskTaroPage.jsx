import s from './AskTaroPage.module.scss';
import {useAppContext} from "@/contexts/appContext.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import astrologerImg from "@/assets/img/home/astrologist.png";
import ButtonWithBeak from "@/components/ui/systemComponents/ButtonWithBeak/ButtonWithBeak.jsx";
import askIcon from "@/assets/img/home/askIcon.png";
import React from "react";

const AskTaroPage = () => {

  const {tarotLayouts, areTarotLayoutsLoading} = useAppContext()
  
  if (areTarotLayoutsLoading) return <Spinner/>
  
  return (
    <div className={s.askTarot}>
      <div className='container'>
        <Header24 classname={s.mainTitle}>СПРОСИТЬ ТАРО</Header24>
        <AstrologerCard
          name="Александра Таровна"
          imageUrl={astrologerImg}>
          Таро, Астрология
        </AstrologerCard>

        <ul className={s.buttonList}>
          {
            tarotLayouts.map((tarotLayout, i) => {
              return (
                <ButtonWithBeak                  
                  key={i}
                  classname={s.navButton}
                  title={tarotLayout.name}
                  description= {tarotLayout.description ? tarotLayout.description : "разбор натальной карты, гороскопа и прогнозы от специалиста-астролога" }
                    
                    
                  href={tarotLayout.id}
                  img={`https://my.aspectum.app/${tarotLayout.icon}`}
                />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default React.memo(AskTaroPage);