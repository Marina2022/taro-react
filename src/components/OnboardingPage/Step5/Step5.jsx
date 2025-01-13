import s from './Step5.module.scss';
import DataInput from "@/components/ui/systemComponents/DataInput/DataInput.jsx";
import TimeInput from "@/components/ui/systemComponents/TimeInput/TimeInput.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import {useEffect} from "react";
import Animation from "@/components/OnboardingPage/Step5/Animation/Animation.jsx";

const Step5 = ({setStep}) => {

  useEffect(() => {

    function fetchUserProfile() {
      fetch('https://my.aspectum.app/api/profile/', {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => {
          if (response.status === 200) {
            
            return response.json();
          } else if (response.status === 403 || response.status === 401) {
            // Обработка случая, когда пользователь не аутентифицирован
            console.error('Пользователь не аутентифицирован');
            // Вы можете перенаправить пользователя на страницу входа или показать сообщение
          } else {
            throw new Error('Ошибка при получении данных профиля');
          }
        })
        // .then(data => {
        //
        //   console.log(data)
        //  
          // Обновляем имя пользователя
        //   const userNameElement = document.getElementById('user-name');
        //   if (userNameElement && data.name) {
        //     userNameElement.innerText = data.name;
        //   }
        //
        //   // Обновляем знак зодиака пользователя
        //   const horoSignElement = document.querySelector('.horo-sign');
        //   if (horoSignElement && data.sign) {
        //     horoSignElement.className = 'horo-sign';
        //     horoSignElement.classList.add(data.sign.toLowerCase());
        //   }
        // })
        .catch(error => {
          console.error('Ошибка:', error);
        });
    }

    fetchUserProfile()
    
    // fetch('https://my.aspectum.app/api/profile/').then(res => res.json()).then(res => console.log(res))
  }, []);

  return (
    <>
      <div className={s.controlsBlock}>
        <h2 className={s.header}>Добро пожаловать</h2>
        <p className={s.text}>
          Мы отправили пароль на ваш email
        </p>

        <Animation/>


      </div>
      <Button classname={s.btn}>Далее</Button>
    </>
  );
};

export default Step5;