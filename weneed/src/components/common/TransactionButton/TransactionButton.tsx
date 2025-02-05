import React from "react";
import styles from "./TransactionButton.module.scss";

interface TransactionButtonProps {
  status: "완료" | "예정" | "취소";
}

const TransactionButton: React.FC<TransactionButtonProps> = ({ status }) => {
  return (
    <button
      className={`${styles.tradeButton} ${
        status === "완료"
          ? styles.completed
          : status === "예정"
          ? styles.upcoming
          : styles.canceled
      }`}
    >
      <span className={status === "취소" ? styles.canceledText : ""}>
        거래 {status}
      </span>
    </button>
  );
};

export default TransactionButton;
