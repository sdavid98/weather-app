import styles from "./WeatherInfo.module.css";

interface WeatherInfoProps {
  iconSrc: string;
  description: string;
}

const WeatherInfo = ({ iconSrc, description }: WeatherInfoProps) => {
  return (
    <div className={`${styles.info} color-light`}>
      <img src={iconSrc} alt={description} />
      {description}
    </div>
  );
};

export default WeatherInfo;
