import { ReactComponent as Arrow } from "./down.svg";

import styles from "./Input.module.css";

interface InputProps {
  value: string;
  setValue: (val: string) => void;
  placeholder: string;
  id: string;
}

const Input = ({ value, setValue, placeholder, id }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        placeholder={placeholder}
      />
      <Arrow className={styles.arrow} />
    </div>
  );
};

export default Input;
