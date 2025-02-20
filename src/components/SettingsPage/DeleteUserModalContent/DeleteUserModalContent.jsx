import s from './DeleteUserModalContent.module.scss';
import Text16 from "@/components/ui/systemComponents/Text16/Text16.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {useState} from "react";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import {useAuthContext} from "@/contexts/authContext.jsx";
import {useNavigate} from "react-router-dom";

const DeleteUserModalContent = ({setDeleteUserModalOpen}) => {

  const [sending, setSending] = useState(false)
  
  const {setUser} = useAuthContext()
  const navigate = useNavigate()
  const handleDelete = async () => {

    try {
      setSending(true)
      const resp = await axiosInstance.post('https://my.aspectum.app/api/deluser/')
      await setUser(null)      
      navigate('/deleted')
      
    } catch (err) {
      alert('Ошибка при удалении профиля')
      console.log(err)
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      <Header20 classname={s.title}>Изменить мои данные </Header20>
      <Text16 classname={s.text}>
        Ваши данные использовались для построения натальной карты, которая является основой всех астрологических
        расчётов. Любые изменения могут привести к ошибкам в
        системе и помешать работе астрологов. Вы можете удалить профиль (освободив email) и создать новый. В случае
        ошибки при регистрации свяжитесь с нами: support@aspectum.app.
      </Text16>
      <div className={s.buttons}>
        <Button onClick={handleDelete}>
          {
            sending ? <MiniSpinner/> : 'Удалить профиль'
          }
        </Button>
        <Button classname={s.secondaryBtn} onClick={() => setDeleteUserModalOpen(false)}>Отмена</Button>
      </div>
    </div>
  );
};

export default DeleteUserModalContent;