import {planetIcons} from "../../../../data/planetIcons.js";

const Icon = ({ name, stroke='white', fill = 'white', size = 22, className = '' }) => {
  const SvgIcon = planetIcons[name];

  if (!SvgIcon) {
    console.error(`Icon "${name}" not found`);
    return null;
  }

  return (
    <SvgIcon
      className={className}
      style={{
        fill: fill,
        stroke: stroke,
        width: size,
        height: size,
        transition: 'fill 0.3s ease', // Плавный переход цвета
      }}      
    />
  );
};

export default Icon;