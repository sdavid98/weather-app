import { useNavigate } from "react-router";

import { ReactComponent as Arrow } from "./icon.svg";

import styles from "./Back.module.css";

const Back = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className={styles.back}>
      <Arrow />
    </div>
  );
};

export default Back;
