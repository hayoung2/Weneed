import React, { useState } from "react";
import styles from "./TransactionContainer.module.scss";

interface TransactionContainerProps {
  title: string;
  text2?: string;
  text3?: string;
}

const TransactionContainer: React.FC<TransactionContainerProps> = ({ title, text2, text3 }) => {
  const [isActive, setIsActive] = useState(false); // 클릭 여부 상태

  const isTwoTexts = text3 === undefined;
  const isEmptyText2 = !text2;

  const text2Color = title === "부산물량 월별 평균" ? "#757575" : "#00B2FF";

  // 줄바꿈 적용된 텍스트
  const formattedTitle = title.replace("우리 회사와의", "우리 회사와의\n");
  const formattedText2 = isEmptyText2 ? "아직 거래가\n없어요!" : text2;

  return (
    <div
      className={`${styles.container} ${isActive ? styles.active : ""}`}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={styles.title}>{formattedTitle}</div>
      {isTwoTexts ? (
        <div className={styles.text2} style={{ color: isEmptyText2 ? "#BBBBBB" : "#00B2FF" }}>
          {formattedText2}
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
