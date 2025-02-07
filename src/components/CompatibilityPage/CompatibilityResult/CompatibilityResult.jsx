import React, {useEffect, useState} from 'react';
import s from './CompatibilityResult.module.scss'
import {useParams} from "react-router-dom";
import PersonBar from "@/components/CompatibilityPage/CompatibilityResult/PersonBar/PersonBar.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import PersonSVGPicture from "@/components/CompatibilityPage/CompatibilityResult/PersonSVGPicture/PersonSVGPicture.jsx";
import ShortInfo from "@/components/CompatibilityPage/CompatibilityResult/ShortInfo/ShortInfo.jsx";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import CompatibilityCharts
  from "@/components/CompatibilityPage/CompatibilityResult/CompatibilityCharts/CompatibilityCharts.jsx";
import CompatibilityResultText
  from "@/components/CompatibilityPage/CompatibilityResult/CompatibilityResultText/CompatibilityResultText.jsx";
import AdditionalNavButtons from "@/components/NatalPage/AdditionalNavButtons/AdditionalNavButtons.jsx";
import CompatAdditionalNavButtons
  from "@/components/CompatibilityPage/CompatibilityResult/CompatAdditionalNavButtons/CompatAdditionalNavButtons.jsx";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";

const CompatibilityResult = () => {

  const {id} = useParams()
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getResult = async () => {
      try {
        setIsLoading(true)
        const result = await axiosInstance(`api/compatibility/answer/${id}`)
        setResult(result.data)
        
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getResult()

  }, []);

  if (isLoading) return <Spinner/>

  const sinastry = result.sinastry_text.split("\n\n")
  const matches = result.matches.split("\n\n")
  const dissonances = result.dissonances.split("\n\n")

  return (

    <div className={s.compatResult}>
      <div className="container">
        <Header24 classname={s.mainTitle}>СОВМЕСТИМОСТЬ</Header24>

        <PersonBar data={result}/>

        <PersonSVGPicture pictureUrl={result.svg_url}/>
        
        <ShortInfo data={result}/>
        <Header20 classname={s.integralHeader}>
          ИНТЕГРАЛЬНАЯ СОВМЕСТИМОСТЬ:&nbsp;{result.integral_compatibility}%
        </Header20>
        <CompatibilityCharts biorhythms={result.biorhythms}/>

        {
          sinastry.length > 0 && <CompatibilityResultText pars={sinastry} title="Синастрия"/>
        }

        {
          matches.length > 0 && <CompatibilityResultText pars={matches} title="Сочетания"/>
        }

        {
          dissonances.length > 0 && <CompatibilityResultText pars={dissonances} title="Диссонансы"/>
        }

        <div className={s.nowWeCan}>Теперь, когда мы рассчитали взаимное влияние двух натальных карт, можно ответить на
          многие вопросы о взаимодействии вас и этого человека
        </div>

        <CompatAdditionalNavButtons sections={result.sections} userId={id}/>

      </div>
    </div>
  );
};

export default React.memo(CompatibilityResult);