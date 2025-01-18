import s from './RingChart.module.scss';
import {getProgressBarColor} from "@/utils.js";

const RingChart = ({value, low, high, classname=''}) => {

  const color = getProgressBarColor(value, low, high)

  // Рассчитываем угол градиента
  const angle = -90 + 180 * value;  

  return (
    <div className={`${s.ringChart} ${classname}`}>
      <div
        style={{backgroundImage: `conic-gradient(from ${angle}deg, transparent, ${color})`}}
        className={s.conicGradient}
      ></div>
      <svg
        className={s.ringMask}
        viewBox="0 0 108 55"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M108 0H0V55H108V0ZM1.00954 50.1565C0.855099 52.2754 2.59616 53.9999 4.7259 53.9999H16.3757C18.5054 53.9999 20.2092 52.2722 20.4519 50.1615C20.809 47.0559 21.5984 44.0087 22.8024 41.1092C24.4994 37.0223 26.9867 33.3089 30.1224 30.1809C33.258 27.0529 36.9806 24.5717 41.0775 22.8789C45.1745 21.186 49.5655 20.3147 54 20.3147C58.4345 20.3148 62.8256 21.186 66.9225 22.8789C71.0194 24.5717 74.742 27.053 77.8776 30.1809C81.0133 33.3089 83.5006 37.0223 85.1976 41.1092C86.4016 44.0087 87.191 47.0559 87.5481 50.1615C87.7908 52.2722 89.4946 54 91.6243 54L103.274 54C105.404 54 107.145 52.2755 106.99 50.1566C106.579 44.5122 105.263 38.9615 103.086 33.7178C100.416 27.2875 96.5025 21.4449 91.5689 16.5234C86.6352 11.6019 80.7782 7.6979 74.3321 5.0344C67.8861 2.37089 60.9772 1 54 1C47.0229 0.999996 40.114 2.37088 33.6679 5.03437C27.2218 7.69787 21.3648 11.6018 16.4312 16.5233C11.4976 21.4448 7.58402 27.2875 4.91397 33.7177C2.7366 38.9615 1.42094 44.5122 1.00954 50.1565Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default RingChart;