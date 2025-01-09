import s from './RadioButtons.module.scss';

const RadioButtons = ({radioButtons, radioButtonsValue, setRadioButtonsValue, classname}) => {
  const handleClick = (radioBtn) => {
    setRadioButtonsValue(radioBtn.value)
  }

  return (
    <ul>
      {
        radioButtons.map((radioBtn, i) => {
          return (
            <li
              key={i}
              onClick={() => handleClick(radioBtn)}
              className={`${s.radioBtnContainer} ${classname}`}>
              {
                radioButtonsValue === radioBtn.value ?
                  <span className={s.checked}></span>
                  : <span className={s.unchecked}></span>
              }
              <div>{radioBtn.label}</div>
            </li>
          )
        })
      }
    </ul>
  );
};

export default RadioButtons;