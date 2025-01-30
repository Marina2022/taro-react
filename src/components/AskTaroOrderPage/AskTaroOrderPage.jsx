import s from './AskTaroOrderPage.module.scss';
import {useParams} from "react-router-dom";
import {useAppContext} from "@/contexts/appContext.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useEffect} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import AstrologerCard from "@/components/ui/systemComponents/AstrologerCard/AstrologerCard.jsx";
import astrologerImg from "@/assets/img/home/astrologist.png";

const AskTaroOrderPage = () => {
  const {order} = useParams()
  const {tarotLayouts, areTarotLayoutsLoading} = useAppContext()
  const tarotLayout = tarotLayouts.find((layout) => layout.id === order)

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


        {/*AskTaroOrderPage - {order}*/}


      </div>
    </div>
  );
};

export default AskTaroOrderPage;