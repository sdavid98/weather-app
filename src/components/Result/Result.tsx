import styles from "./Result.module.css";

interface ResultProps {
  text: string;
  query: string;
}

const Result = ({ text, query }: ResultProps) => {
  const indexOfQuery = text.toLocaleLowerCase().indexOf(query);

  return (
    <div className={styles.wrapper}>
      <span className={styles.dark}>{text.slice(0, indexOfQuery)}</span>
      <span className="color-light">
        {text.slice(indexOfQuery, indexOfQuery + query.length)}
      </span>
      <span className={styles.dark}>
        {text.slice(indexOfQuery + query.length)}
      </span>
    </div>
  );
};

export default Result;
