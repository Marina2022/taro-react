import s from './PasswordModalContent.module.scss';
import Text16 from "@/components/ui/systemComponents/Text16/Text16.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import InputGroup from "@/components/ui/systemComponents/InputGroup/InputGroup.jsx";
import {useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {useAuthContext} from "@/contexts/authContext.jsx";
import {useNavigate} from "react-router-dom";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";

const PasswordModalContent = ({setPasswordModalOpen}) => {


  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [sending, setSending] = useState('')

  const {resetUser} = useAuthContext()
  const navigate = useNavigate()
  const saveHandler = async () => {
    if (!oldPass || !newPass || !confirmPass) {
      alert("Заполните, пожалуйста, все поля")
      return
    }

    if (newPass !== confirmPass) {
      setErrorMessage('Новый пароль и подтверждение пароля не совпадают')
      return
    }

    try {
      setSending(true)

      const resp = await axiosInstance.post('api/pwdchange/', {
        new_password: newPass,
        new_password_confirm: confirmPass,
        old_password: oldPass
      })

      navigate('/login')

    } catch (err) {
      console.log(err)

    } finally {
      setSending(false)
    }

  }

  const handleFocus = () => {
    setErrorMessage('')
  }

  // Старый пароль указан неверно  


  return (
    <div className={s.wrapper}>
      <Header20 classname={s.title}>Изменить пароль</Header20>

      <div className={s.inputs}>
        <InputGroup type="password" value={oldPass} setValue={setOldPass} autofocus placeholder="Старый пароль"/>
        <InputGroup type="password" value={newPass} setValue={setNewPass} placeholder="Новый пароль" onFocus={handleFocus}/>
        <InputGroup type="password" value={confirmPass} setValue={setConfirmPass} placeholder="Подтверждение нового пароля"
                    onFocus={handleFocus}/>

        {
          errorMessage && <div className={s.notMatch}>{errorMessage}</div>
        }

      </div>


      <div className={s.buttons}>
        <Button onClick={saveHandler}>
          {
            sending ? <MiniSpinner/> : 'Сохранить'}
        </Button>
        <Button classname={s.secondaryBtn} onClick={() => setPasswordModalOpen(false)}>Отмена</Button>
      </div>

    </div>
  );
};

export default PasswordModalContent;