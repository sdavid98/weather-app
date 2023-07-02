import { Icon } from "../../types/enums";

import { ReactComponent as Temperature } from "./icons/temperature.svg";
import { ReactComponent as Sunrise } from "./icons/sunrise.svg";
import { ReactComponent as Sunset } from "./icons/sunset.svg";

import styles from "./IconWithText.module.css";

interface IconWithTextProps {
  icon: Icon;
  text: string;
}

const IconWithText = ({ icon, text }: IconWithTextProps) => {
  return (
    <div className={styles.wrapper}>
      {iconByName[icon]}
      <div className="color-light">{text}</div>
    </div>
  );
};

const iconByName = {
  [Icon.TEMPERATURE]: <Temperature />,
  [Icon.SUNRISE]: <Sunrise />,
  [Icon.SUNSET]: <Sunset />,
};

export default IconWithText;
