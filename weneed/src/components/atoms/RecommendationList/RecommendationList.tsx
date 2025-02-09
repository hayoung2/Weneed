import styles from "@/components/atoms/RecommendationList/Recommendation.module.scss";
import Gold from "@/assets/icons/gold.svg";
import Silver from "@/assets/icons/silver.svg";
import Bronze from "@/assets/icons/bronze.svg";
import Four from "@/assets/icons/Four.svg";
import Five from "@/assets/icons/Five.svg";
import MeetIcon from '@/assets/icons/meet.svg'

interface RecommendationListProps {
  index: number; 
  title: string;
  company: string;
  location: string;
  amount: string;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  index,
  title,
  company,
  location,
  amount
}) => {
  const rankIcons = [Gold, Silver, Bronze, Four, Five];


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
    </div>
  );
};

export default RecommendationList;
