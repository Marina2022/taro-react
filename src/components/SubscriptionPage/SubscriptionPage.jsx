import s from './SubscriptionPage.module.scss';
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import Header20 from "@/components/ui/systemComponents/Header20/Header20.jsx";
import Button from "@/components/ui/systemComponents/Button/Button.jsx";
import {subscription} from "../../../data/subscription.js";

const SubscriptionPage = () => {

  const payHandler = (plan) => {
    alert(`Оплачено ${plan.price} руб.`)
  }

  return (
    <div className={s.subscription}>
      <div className='container'>
        <Header24 classname={s.mainTitle}>ВЫБОР ПОДПИСКИ</Header24>

        {/*<Header24 classname={s.title}>Выберите подписку</Header24>*/}
        <ul className={s.wrapper}>

          {
            subscription.map((plan, i) => {
              return (
                <li key={i} className={s.subscriptionBlock}>
                  <Header20 classname={s.subtitle}>{plan.label}</Header20>
                  <div className={s.priceRow}>
                    <span className={s.priceLabel}>Цена: </span>
                    <span className={s.priceValue}>{plan.price}&nbsp;руб.</span>
                  </div>
                  <Button onClick={() => payHandler(plan)} classname={s.btn}>Оплатить</Button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default SubscriptionPage;