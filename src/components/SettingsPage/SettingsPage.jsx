import s from './SettingsPage.module.scss';
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import {useAuthContext} from "@/contexts/authContext.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import SubscriptionPage from "@/components/SubscriptionPage/SubscriptionPage.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Popup from "@/components/ui/Popup/Popup.jsx";
import DeleteUserModalContent from "@/components/SettingsPage/DeleteUserModalContent/DeleteUserModalContent.jsx";
import PasswordModalContent from "@/components/SettingsPage/PasswordModalContent/PasswordModalContent.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";

const SettingsPage = () => {

  const {user, isUserLoading} = useAuthContext()
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false)

  const navigate = useNavigate()

  if (isUserLoading) return <Spinner/>

  let date
  let formattedDate = ''
  let formattedTime = ''


  if (user) {
    date = new Date(user.dob);
    const options = {day: "numeric", month: "long", year: "numeric"};
    formattedDate = date.toLocaleDateString("ru-RU", options);

    formattedTime = date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const [sending, setSending] = useState(false)

  const {setUser} = useAuthContext()
  const logout = async () => {

    try {
      setSending(true)
      const resp = await axiosInstance.post('api/logout/')

      if (resp.data.status === "Logout successful") {
        setUser(null)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div className={s.settings}>
        <div className='container'>
          <Header24 classname={s.mainTitle}>НАСТРОЙКИ</Header24>

          <div className={s.propertyCard}>
            <span className={s.label}>E-mail:</span>
            <span className={s.value}>{user.email}</span>
          </div>

          <div className={s.propertyCard}>
            <span className={s.label}>Имя:</span>
            <span className={s.value}>{user.name}</span>
          </div>

          <div className={s.propertyCard}>
            <span className={s.label}>Дата рождения:</span>
            <span className={s.value}>{formattedDate}</span>
          </div>

          <div className={s.propertyCard}>
            <span className={s.label}>Время рождения:</span>
            <span className={s.value}>{formattedTime}</span>
          </div>

          <div className={s.propertyCard}>
            <span className={s.label}>Место рождения:</span>
            <span className={s.value}>{user.location}</span>
          </div>

          <div className={s.propertyCard}>
            <span className={s.label}>Подписка:</span>
            <span className={s.value}>{user.subscription_type ? 'активна' : 'неактивна'}</span>
          </div>

          <div className={s.buttons}>
            <div className={s.actionButton} onClick={() => navigate('/subscription')}>
              <span>Оформить подписку</span>
              <div className={s.listItemChevron}></div>
            </div>

            <div className={s.actionButton} onClick={() => setDeleteUserModalOpen(true)}>
              <span>Изменить мои данные</span>
              <div className={s.listItemChevron}></div>
            </div>
            <div className={s.actionButton} onClick={() => setPasswordModalOpen(true)}>
              <span>Изменить пароль</span>
              <div className={s.listItemChevron}></div>
            </div>
            <div className={s.actionButton} onClick={() => logout()}>
            <span>
            {
              sending ? <MiniSpinner/> : 'Выйти'
            }
            </span>
              <div className={s.listItemChevron}></div>
            </div>
          </div>
        </div>
      </div>

      {
        deleteUserModalOpen && <Popup classname={s.modalDelete} setOpen={setDeleteUserModalOpen}>
          <DeleteUserModalContent setDeleteUserModalOpen={setDeleteUserModalOpen}/>
        </Popup>
      }

      {
        passwordModalOpen && <Popup classname={s.modalPassword} setOpen={setPasswordModalOpen}>
          <PasswordModalContent setPasswordModalOpen={setPasswordModalOpen}/>
        </Popup>
      }

    </>
  );
};

export default SettingsPage;