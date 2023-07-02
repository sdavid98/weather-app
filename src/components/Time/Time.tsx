import { useEffect, useState } from "react";

import styles from "./Time.module.css";

interface TimeProps {
  offset: number;
}

const Time = ({ offset }: TimeProps) => {
  const [time, setTime] = useState(getLocalTime(offset));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getLocalTime(offset));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.time}>
      <div>{time.split(":")[0]}</div>
      <div>{time.split(":")[1]}</div>
    </div>
  );
};

const getLocalTime = (offset: number) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
  }).format(
    new Date().getTime() +
      new Date().getTimezoneOffset() * 60 * 1000 +
      offset * 1000
  );

export default Time;
