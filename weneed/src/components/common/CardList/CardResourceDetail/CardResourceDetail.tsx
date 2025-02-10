import React from "react";
import styles from "@/components/common/CardList/CardResourceDetail/CardResourceDetail.module.scss";

interface CardResourceDetailProps {
  title: string;
  amount: string;
  description: string;
}

const CardResourceDetail: React.FC<CardResourceDetailProps> = ({
  title,
  amount,
  description,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={styles.amount}>{amount}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default CardResourceDetail;
