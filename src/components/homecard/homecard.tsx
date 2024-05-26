import styles from "./Homecard.module.css";
const Info = ({ title }) => {
  return (
    <div className={styles.info__featuresContainer__feature}>
      <div />
      <div className={styles.info__featuresContainer__featureTitle}>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Info;
