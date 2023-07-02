import styles from "./CityTitle.module.css";

interface CityTitleProps {
  title: string;
}

const CityTitle = ({ title }: CityTitleProps) => {
  return <div className={`${styles.title} color-light`}>{title}</div>;
};

export default CityTitle;
