import s from './PersonSVGPicture.module.scss';


const PersonSvgPicture = ({pictureUrl}) => {

  const url = 'https://my.aspectum.app' + pictureUrl

  return <div className={s.wrapper}>
    <img src={url} alt="SVG Chart" className={s.img}/>
  </div>
};

export default PersonSvgPicture;