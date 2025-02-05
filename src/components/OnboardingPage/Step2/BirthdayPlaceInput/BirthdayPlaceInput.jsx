import s from './BirthdayPlaceInput.module.scss';

const BirthdayPlaceInput = ({setPopupOpened, selectedCity, coords, classname=''}) => {
  
  let inputContent = 'Нажмите для выбора'
  if(selectedCity) {
    inputContent = `${selectedCity.name}, ${selectedCity.region}`
  } else if(coords?.lat) {
    inputContent = `${coords.lat}, ${coords.lng}`
  }
  
  return (
    <div onClick={()=> {      
      setPopupOpened(true)
    }} className={`${s.iconContainer} ${classname}`}>
      <div className={s.cityInputBlock}>
        <div className={s.clickText}>
          {inputContent}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.289062 6.4375C0.289062 2.92969 3.14062 0.078125 6.64844 0.078125C10.1562 0.078125 13.0078 2.92969 13.0078 6.4375C13.0078 7.80469 12.5625 9.07031 11.8203 10.0938L15.3906 13.6719C15.6016 13.8906 15.7109 14.1797 15.7109 14.4922C15.7109 15.1406 15.2344 15.6406 14.5703 15.6406C14.2656 15.6406 13.9609 15.5391 13.7422 15.3125L10.1484 11.7188C9.14844 12.3984 7.95312 12.7969 6.64844 12.7969C3.14062 12.7969 0.289062 9.94531 0.289062 6.4375ZM1.94531 6.4375C1.94531 9.03125 4.04688 11.1406 6.64844 11.1406C9.24219 11.1406 11.3516 9.03125 11.3516 6.4375C11.3516 3.84375 9.24219 1.73438 6.64844 1.73438C4.04688 1.73438 1.94531 3.84375 1.94531 6.4375Z"
            fill="white"
            fillOpacity="0.8"
          />
        </svg>
      </div>
    </div>
  )
}

export default BirthdayPlaceInput;