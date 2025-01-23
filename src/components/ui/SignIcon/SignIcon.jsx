import {signIcons} from "../../../../data/signIcons.js";

const SignIcon = ({ name, stroke='white', fill = 'white', size = 22, className = '' }) => {
  const SvgIcon = signIcons[name];

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
        transition: 'fill 0.3s ease', 
      }}      
    />
  );
};

export default SignIcon;