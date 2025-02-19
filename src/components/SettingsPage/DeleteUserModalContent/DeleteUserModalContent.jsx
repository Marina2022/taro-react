import s from './DeleteUserModalContent.module.scss';
import Text16 from "@/components/ui/systemComponents/Text16/Text16.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import axiosInstance from "@/api/axiosInstance.js";

const DeleteUserModalContent = ({setDeleteUserModalOpen}) => {
  
  const handleDelete = async () => {
    // const resp  = await axiosInstance.post('https://my.aspectum.app/api/deluser/')
    
    // const resp = await fetch()

    const response = await fetch('https://my.aspectum.app/api/deluser/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  })
    })
    
    console.log(resp)
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
        <Button onClick={handleDelete} >Удалить профиль</Button>
        <Button classname={s.secondaryBtn} onClick={() => setDeleteUserModalOpen(false)}>Отмена</Button>

      </div>
    </div>
  );
};

export default DeleteUserModalContent;