import styles from "@/components/atoms/RecommendationList/Recommendation.module.scss";
import Gold from "@/assets/icons/gold.svg";
import Silver from "@/assets/icons/silver.svg";
import Bronze from "@/assets/icons/bronze.svg";
import four from "@/assets/icons/four.svg";
import five from "@/assets/icons/five.svg";
import {  ReactNode } from "react";

interface RecommendationListProps {
  index: number;
  title: string;
  company: string;
  location: string;
  amount: string;
  price: number;
  middleContent?: ReactNode;
}

const formatPrice = (price: number) => {
  return (
    <span className = {styles.noWrap}>
      <span className={styles.priceValue}>{price.toLocaleString()}</span>
      <span className={styles.priceUnit}> 원</span>
    </span>
  );
};

const RecommendationList: React.FC<RecommendationListProps> = ({
  index,
  title,
  company,
  location,
  amount,
  price,
  middleContent
}) => {
  const rankIcons = [Gold, Silver, Bronze,four,five];
  return (
    <div className={styles.itemContainer}>
      <div className={styles.leftSection}>
        <div className={styles.iconWrapper}>
          <img src={rankIcons[index - 1]} alt={`${index}위`} className={styles.rankIcon} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.middleSection}>
          <div className={styles.company}>{company}</div>
          <div className={styles.location}>{location}</div>
        </div>
        <div className={styles.amountText}>
          <span className={styles.amountValue}>{amount}</span>
        </div>
      </div>
      <div className={styles.rightSection}>
      <div className={styles.priceText}>
          <span className={styles.priceValue}>{formatPrice(price)}</span>
        </div>
      </div>
      {middleContent && <div className={styles.middleContent}>{middleContent}</div>}
    </div>
  );
};

export default RecommendationList;
