import styles from "./Home.module.scss";
import GetMockData from "@/components/atoms/MockDate/GetMockData"; // GetMockData import

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.cardContainer}>
        <GetMockData />
      </div>
    </div>
  );
};