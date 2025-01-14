import s from './HomePage.module.scss';
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import Text14 from "@/components/ui/systemComponents/Text14/Text14.jsx";
import SmallBar from "@/components/ui/systemComponents/SmallBar/SmallBar.jsx";
import BigBar from "@/components/ui/systemComponents/BigBar/BigBar.jsx";
import ButtonWithBeak from "@/components/ui/systemComponents/ButtonWithBeak/ButtonWithBeak.jsx";

const HomePage = () => {
  return (
    <div className={s.homePage}>
      <div className='container'>
        <Header24 classname={s.title}>
          Главная страница
        </Header24>

        <Text14>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem consectetur consequuntur cum
          delectus
          dolor dolorum earum esse est in inventore iste libero molestias nam odio perferendis, quas, quis, quisquam
          rerum
          sed suscipit tempora vel veritatis voluptate voluptatem voluptates voluptatum? Amet dolorum facilis illo illum
          maiores nulla obcaecati possimus voluptates. Ad cumque, dolore doloribus ducimus fugiat, hic ipsam laudantium
          necessitatibus neque nisi nostrum obcaecati odit placeat, possimus quia repellat repudiandae similique sint
          sunt
          voluptate. Ab amet, consequuntur dicta et id ipsam iusto laborum molestias optio porro quas quidem ratione rem
          repellendus voluptatem? Accusamus aliquam aliquid consequuntur cum cupiditate dignissimos dolores dolorum ea
          eius eveniet explicabo id incidunt ipsam laudantium maxime molestiae, molestias natus nemo nihil nulla
          officiis
          perferendis provident qui repellendus rerum sed soluta tempore tenetur ullam voluptatem. Ad consectetur
          doloribus id officia quos voluptatibus. Accusamus aliquam corporis, culpa dolor dolorum mollitia quod tempora!
          Accusamus aliquam autem beatae facilis porro reprehenderit vel. Ab asperiores consectetur cupiditate hic nam
          pariatur quasi qui reiciendis similique, sit vel vitae voluptates. Ad adipisci alias, aliquid animi asperiores
          atque culpa deleniti dignissimos dolorem doloribus ducimus earum esse in ipsum itaque magnam maxime nemo
          nesciunt nobis porro quas sed sequi soluta temporibus velit veritatis voluptatum. Totam.
        </Text14>

        <SmallBar title="Заголовок-1"
                  description="Описание-1"
                  number={20}/>

        <SmallBar title="Заголовок-2"
                  description=" Ab asperiores consectetur cupiditate hic nam
        pariatur quasi qui reiciendis similique, sit vel vitae voluptates. Ad adipisci alias, aliquid animi asperiores
        atque culpa deleniti dignissimos dolorem doloribus ducimus earum esse in ipsum itaque magnam maxime nemo
        nesciunt nobis porro quas sed sequi soluta temporibus velit veritatis voluptatum. Totam."
                  number={5}/>
        <SmallBar title="Заголовок-3"
                  description="Описание-3"
                  number={10}/>


        <ButtonWithBeak title="Кнопка-1"
                  description="Описание"
                  number={2}/>

        <ButtonWithBeak title="Кнопка-2"
                  description="A consectetur cupiditate hic nam pariat"
                  number={5}/>

        <ButtonWithBeak title="Кнопка-3"
                  description="Описание"
                  number={15}/>

      </div>
    </div>
  );
};

export default HomePage;
    