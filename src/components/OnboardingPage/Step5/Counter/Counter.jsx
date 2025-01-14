import React, {useEffect} from 'react';
import s from "@/components/OnboardingPage/Step5/Animation/Animation.module.scss";

const Counter = ({isCounting, setIsCounting, classname}) => {

  useEffect(() => {
    const onboardingPercentCounter = document.querySelector(
      ".onboarding__percent-counter"
    );
    let currentPercentValue = 0;

    // останавливаем анимацию через минуту
    setTimeout(() => {
      const gameLoader = document.querySelector(".game-loader__planet");
      gameLoader.classList.add("no-animation");
      nextButton.textContent = "Приступить";
    }, 63000);

    const intervalId = setInterval(() => {
      if (currentPercentValue < 100) {
        currentPercentValue = currentPercentValue + 1;
        onboardingPercentCounter.textContent = currentPercentValue + "%";
      } else {
        clearInterval(intervalId);
      }
    }, 600);
  }, []);
  
  return (
    <div className={classname}>100%</div>
  );
};

export default Counter;