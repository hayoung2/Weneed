import React from "react";
import styles from "@/components/common/CardList/CardLeftOverDetail/CardLeftOverDetail.module.scss";

interface CardLeftOverDetailProps {
  title: string;
  amount: string | number;  // 숫자도 허용
  price?: number;  // price가 optional
  description: string;
}

const CardLeftOverDetail: React.FC<CardLeftOverDetailProps> = ({
  title,
  amount,
  price = 0,  // 기본값 0
  description,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.price}>
          {price} <span className={styles.priceUnit}>원</span>
        </span>
      </div>
      <p className={styles.amount}>{typeof amount === "number" ? `${amount} 단위` : amount}</p>

      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{description || "설명이 없습니다."}</p>
      </div>
    </div>
  );
};

export default CardLeftOverDetail;
