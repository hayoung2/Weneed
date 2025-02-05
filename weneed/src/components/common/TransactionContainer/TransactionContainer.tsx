import React from "react";
import styles from "./TransactionContainer.module.scss";

interface TransactionContainerProps {
  title: string;
  text2?: string;
  text3?: string;
}

const TransactionContainer: React.FC<TransactionContainerProps> = ({ title, text2, text3 }) => {
  const isTwoTexts = text3 === undefined; 
  const isEmptyText2 = !text2; 

  const text2Color = title === "부산물량 월별 평균" ? "#757575" : "#00B2FF";

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {isTwoTexts ? (
        <div className={styles.text2} style={{ color: isEmptyText2 ? "#BBBBBB" : "#00B2FF" }}>
          {isEmptyText2 ? "아직 거래가 없어요!" : text2}
        </div>
      ) : (
        <div className={styles.textGroup}>
          <span className={styles.text2} style={{ color: text2Color }}>{text2}</span>
          <span className={styles.text3}>{text3}</span>
        </div>
      )}
    </div>
  );
};

export default TransactionContainer;
