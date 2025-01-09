import s from './AstrologerCard.module.scss';

const AstrologerCard = ({ name, description, imageUrl, classname}) => {
  return (
    <div className={`${s.astrologerCard} ${classname}`}>
      
      {/*Изображение астролога*/}
      <img className={s.astrologerImage} src={imageUrl} alt="Астролог"/>
      
      {/*Текстовая информация*/}
      <div className={s.astrologerInfo}>
        <h2 className={s.astrologerName}>{name}</h2>
        <p className={s.astrologerDescription}>{description}</p>
      </div>

      {/*Декоратор справа*/}
      <div className={s.astrologerDecorator}>
        <svg
          width="46"
          height="47"
          viewBox="0 0 46 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.4092 39.618C34.6763 39.5159 34.9635 39.4252 35.2594 39.3497C36.7549 38.9756 37.8723 37.7362 38.1561 36.221C38.2407 35.7675 38.3468 35.3444 38.4799 35.0081C38.6125 35.3444 38.7191 35.7675 38.8033 36.221C39.0871 37.7362 40.2044 38.9756 41.7 39.3497C41.9959 39.4252 42.2831 39.5159 42.5502 39.618C42.5502 39.618 42.2853 39.6784 41.8957 39.7653C40.3246 40.0978 39.1037 41.3485 38.8199 42.928C38.733 43.4154 38.6216 43.8727 38.4799 44.2316C38.3382 43.8727 38.2271 43.4155 38.1398 42.9318C37.8568 41.3561 36.6423 40.1092 35.0769 39.7691C34.6793 39.6822 34.4092 39.618 34.4092 39.618Z"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="0.880062"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.85426 41.5752H6.24609"
            stroke="#D8B573"
            strokeWidth="0.880062"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.60783 41.5752H1"
            stroke="#D8B573"
            strokeWidth="0.880062"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.42383 46V42.6409"
            stroke="#D8B573"
            strokeWidth="0.880062"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.42383 40.5059V37.1467"
            stroke="#D8B573"
            strokeWidth="0.880062"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.42794 44.1069C5.42794 41.7075 5.54585 41.5752 7.66452 41.5752C5.54585 41.5752 5.42794 41.4392 5.42794 39.0398C5.42794 41.4392 5.31045 41.5752 3.19141 41.5752C5.31045 41.5752 5.42794 41.7075 5.42794 44.1069Z"
            stroke="#D8B573"
            strokeWidth="0.880062"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.8538 23.026L21.6604 23.0259M21.6604 23.0259C19.5417 23.0259 19.4238 25.5614 19.4238 25.5614M21.6604 23.0259C21.6604 23.0259 19.4244 22.8915 19.4238 20.4942M17.1873 23.0259L15 23.026M17.1873 23.0259C19.3063 23.0259 19.4238 20.4942 19.4238 20.4942M17.1873 23.0259C17.1873 23.0259 19.4238 23.1619 19.4238 25.5614M19.4244 27.4544L19.4238 25.5614M19.4238 20.4942L19.4244 18.6013"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="0.880062"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M44.954 13.5203C44.1257 13.6979 43.4833 14.3592 43.3333 15.1943C43.2872 15.4474 43.2286 15.6893 43.1538 15.882C43.0786 15.6893 43.0197 15.4474 42.9736 15.1905C42.8236 14.3554 42.1778 13.6942 41.3465 13.5166C41.1406 13.4712 41 13.441 41 13.441C41.1417 13.3843 41.2932 13.339 41.45 13.2974C42.2413 13.1009 42.8323 12.4434 42.9827 11.6424C43.0273 11.4005 43.0831 11.1776 43.1538 11C43.2237 11.1776 43.2804 11.4005 43.325 11.6424C43.475 12.4434 44.0663 13.1009 44.8576 13.2974C45.014 13.339 45.1659 13.3843 45.3072 13.441C45.3072 13.441 45.1644 13.475 44.954 13.5203Z"
            stroke="#D8B573"
            strokeWidth="0.880062"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 5.61373C8.26715 5.71575 8.55432 5.80646 8.85019 5.88203C10.3458 6.25612 11.4631 7.49549 11.7469 9.01071C11.8315 9.46415 11.9377 9.88734 12.0707 10.2236C12.2033 9.88734 12.3099 9.46415 12.3941 9.01071C12.6779 7.49549 13.7953 6.25612 15.2908 5.88203C15.5867 5.80646 15.8739 5.71575 16.141 5.61373C16.141 5.61373 15.8761 5.55329 15.4866 5.46639C13.9154 5.13387 12.6945 3.88314 12.4108 2.30368C12.3238 1.81624 12.2124 1.35903 12.0707 1.00006C11.929 1.35903 11.8179 1.81622 11.7306 2.29988C11.4476 3.87556 10.2332 5.12251 8.66768 5.46259C8.27017 5.54949 8 5.61373 8 5.61373Z"
            stroke="#D8B573"
            strokeWidth="0.880062"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default AstrologerCard;