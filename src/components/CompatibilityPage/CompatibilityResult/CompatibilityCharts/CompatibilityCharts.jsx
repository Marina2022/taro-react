import React from 'react';
import s from "./CompatibilityCharts.module.scss";
import CompatibilityItem
  from "@/components/CompatibilityPage/CompatibilityResult/CompatibilityCharts/CompatibilityItem/CompatibilityItem.jsx";

const CompatibilityCharts = ({biorhythms}) => {
  return (
    <div className={s.charts}>
      <ul>
        {
          biorhythms.map((biorhythm, i) => <CompatibilityItem
            name={biorhythm.label}
            value={biorhythm.percentage}
            key={i}
          />)
        }
      </ul>

    </div>
  );
};

export default CompatibilityCharts;