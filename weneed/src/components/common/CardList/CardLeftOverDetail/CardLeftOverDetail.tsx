import React from "react";
import styles from "@/components/common/CardList/CardLeftOverDetail/CardLeftOverDetail.module.scss";

interface CardLeftOverDetailProps {
  title: string;
  amount: string;
  price: number;
  description: string;
}

const CardLeftOverDetail: React.FC<CardLeftOverDetailProps> = ({
  title,
  amount,
  price,
  description,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.price}>{price.toLocaleString()} <span className={styles.priceUnit}>원</span></span>
      </div>
      <p className={styles.amount}>{amount}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default CardLeftOverDetail;