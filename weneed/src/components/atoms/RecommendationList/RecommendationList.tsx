import { useState } from "react";
import styles from "@/components/atoms/RecommendationList/Recommendation.module.scss";
import Gold from "@/assets/icons/gold.svg";
import Silver from "@/assets/icons/silver.svg";
import Bronze from "@/assets/icons/bronze.svg";
import Four from "@/assets/icons/Four.svg";
import Five from "@/assets/icons/Five.svg";
import YellowStar from '@/assets/icons/yellow-star.svg';
import GrayStar from '@/assets/icons/gray-star.svg';
import MeetIcon from '@/assets/icons/meet.svg'

interface RecommendationListProps {
  index: number; 
  title: string;
  company: string;
  location: string;
  amount: string;
  isFavorite: boolean;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  index,
  title,
  company,
  location,
  amount,
  isFavorite: initialFavorite
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const rankIcons = [Gold, Silver, Bronze, Four, Five];

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.leftSection}>
        <div className={styles.iconWrapper}>
          <img src={rankIcons[index - 1]} alt={`${index + 1}위`} className={styles.rankIcon} />
        </div>

        <div className={styles.title}>{title}</div>

        <div className={styles.middleSection}>
          <div className={styles.company}>{company}</div>
          <div className={styles.location}>{location}</div>
        </div>
      </div>
      <div className={styles.amountContainer}>
        <img src={MeetIcon} className={styles.amountIcon} />
        <div className={styles.amountText}>
          <span className={styles.amountValue}>{amount}</span>
        </div>
      </div>

      <div className={styles.rightSection}>
        <span className={styles.favorite} onClick={toggleFavorite} role="button" aria-label="Toggle favorite">
          <img src={isFavorite ? YellowStar : GrayStar} alt="Favorite star" width={24} height={24} />
        </span>
      </div>
    </div>
  );
};

export default RecommendationList;
