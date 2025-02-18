import s from './PersonSVGPicture.module.scss';

const PersonSvgPicture = ({pictureUrl, compatPictureUrl}) => {

  const url = 'https://my.aspectum.app' + pictureUrl
  const compatUrl = 'https://my.aspectum.app' + compatPictureUrl

  return <div className={s.wrapper}>
    <img src={compatUrl} alt="SVG Compat Chart" className={s.img}/>
    <img src={url} alt="SVG Chart" className={s.img}/>
  </div>
};

export default PersonSvgPicture;