import s from './LoginPage.module.scss';
import InputGroup from "@/components/ui/systemComponents/InputGroup/InputGroup.jsx";
import {useState} from "react";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "@/contexts/authContext.jsx";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import Popup from "@/components/ui/Popup/Popup.jsx";
import Text16 from "@/components/ui/systemComponents/Text16/Text16.jsx";

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sending, setSending] = useState(false)
  const [sendingForgot, setSendingForgot] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const navigate = useNavigate()

  const {resetUser} = useAuthContext()

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    if (!email) {
      alert("Пожалуйста, введите ваш email.");
      return false;
    } else if (!emailRegex.test(email)) {
      alert("Пожалуйста, введите правильный email.");
      return false;
    }

    try {
      setSending(true)
      const resp = await axiosInstance.post('api/login/', {email, password})

      if (resp.data.status === 'Login successful') {
        localStorage.setItem('natalChartCreated', true)
        await resetUser()
        navigate('/')
      } else {
        throw new Error('Произошла ошибка')
      }
    } catch (err) {
      if (err.status === 401) {
        alert('Неправильный email или пароль')
      } else {
        console.log(err)
      }
    } finally {
      setSending(false)
    }
  }


  const handleForgot = async () => {
    
    if (!email) {
      alert("Пожалуйста, введите ваш email")
      return
    }
    
    try {
      setSendingForgot(true)

      const resp = await axiosInstance.post('api/forgot/', {email})
      
      if (resp.status === 200) {
        await resetUser()
        setPopupOpen(true)
      }

    } catch {

    } finally {
      setSendingForgot(false)
    }

  }


  return (
    <>
      <div className={s.loginContainer}>
        <div className={s.wrapper}>
          <h2 className={s.header}>Вход</h2>
          <p className={s.text}>для зарегистрированных пользователей</p>

          <InputGroup classname={s.inputGroup} value={email} setValue={setEmail} label="Email"/>
          <InputGroup type="password" classname={s.inputGroup} value={password} setValue={setPassword} label="Пароль"/>

          <button disabled={sendingForgot} onClick={handleForgot} className={s.forgotBtn}>Забыли пароль?</button>

          <Button disabled={sending} onClick={handleSubmit} classname={s.submitBtn}>{
            sending ? <MiniSpinner/> : "Войти"
          }
          </Button>
        </div>
      </div>
      {
        popupOpen && <Popup classname={s.popup} setOpen={setPopupOpen}>
        <div className={s.popupContent}>
          <Text16 classname={s.popupText}>Если пользователь с данным email существует, то инструкции по восстановлению пароля отправлены на указанный email</Text16>
          <Button classname={s.OkBtn} onClick={()=>setPopupOpen(false)}>Ok</Button>          
        </div>        
        </Popup>
      }
    </>
  );
};

export default LoginPage;