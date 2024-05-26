import { Inter } from "next/font/google";

// import calender from "../../assets/calender.svg";
// import search from "../../assets/search.svg";
// import star from "../../assets/star.svg";
import Image from "next/image";
import styles from "./How.module.css";
interface HOWWORKSProps {
  htag: string; // or React.ReactNode if you want to allow other types of children
}
const HOWWORKS: React.FC<HOWWORKSProps> = ({ htag }) => (
  <div
    className="how__cta"
    style={{
      backgroundColor: "#672C70",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}
  >
    <div className={styles.main__container}>
      <div className={styles.how__cta_content}>
        <h3>{htag}</h3>
      </div>

      <div className={styles.howLogo_Cont}>
        <div className={styles.how_container_a}>
          <div className={styles.how_img_cont}>
            <Image
              src="/images/calender.svg"
              alt="prof"
              width={50}
              height={50}
            />
          </div>
          <h1>Find And Choose</h1>

          <p>Browse the categories and search to your activity need</p>
        </div>
        <div className={styles.how_container_a}>
          <div className={styles.how_img_cont}>
            <Image src="/images/day.png" alt="prof" width={50} height={50} />
          </div>
          <h1>Book it with ease</h1>

          <p>
            Once you find a perfect match, book the vendor and pay online
            through our easy-to-use payment system
          </p>
        </div>
        <div className={styles.how_container_a}>
          <div className={styles.how_img_cont}>
            <Image src="/images/star.svg" alt="prof" width={50} height={50} />
          </div>
          <h1>Meet, make or create</h1>

          <p>Browse the categories and search to your activity need</p>
        </div>
      </div>
    </div>
  </div>
);

export default HOWWORKS;
