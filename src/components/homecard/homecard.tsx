import styles from "./Homecard.module.css";
interface InfoProps {
  title: string; // or React.ReactNode if you want to allow other types of children
}

const Info: React.FC<InfoProps> = ({ title }) => {
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
