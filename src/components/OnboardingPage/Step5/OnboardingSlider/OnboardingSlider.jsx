import s from './OnboardingSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {onboardingSlides} from "../../../../../data/onboardingSlides.js";
import {useEffect, useRef} from "react";
const OnboardingSlider = ({changeSlide}) => {

 const swiperRef = useRef(null);
 
 // чтобы при первом рендере слайдера useEffect не срабатывал
 const firstTime = useRef(true)
   
  useEffect(()=>{   
    if (firstTime.current) {      
      firstTime.current = false
      return
    }
    
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }    
  }, [changeSlide])
  
  return (
    <Swiper
      className={s.onboardingSlider}
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}      
      onSwiper={(swiper) => {
        swiperRef.current = swiper; // Сохраняем ссылку на Swiper
      }}
      pagination={{clickable: true}}
      // navigation      
    >
      {
        onboardingSlides.map((slide, i) => {
          return (
            <SwiperSlide className={s.slide} key={i}>
              <h2 className={s.slideTitle}>{slide.title}</h2>
              <div className={s.slideText}>
                {slide.text}
              </div>
            </SwiperSlide>
          )
        })
      }      
    </Swiper>
  );
};

export default OnboardingSlider;