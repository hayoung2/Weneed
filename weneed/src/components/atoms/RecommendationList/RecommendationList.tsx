import styles from "@/components/atoms/RecommendationList/Recommendation.module.scss";

interface RecommendationListProps {
  icon: string;
  title: string;
  company: string;
  location: string;
  amount: string;
  favorite: boolean;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  icon,
  title,
  company,
  location,
  amount,
  favorite
}) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.leftSection}>
        <span className={styles.icon}>{icon}</span>
        <div className={styles.title}>{title}</div>
        <div className={styles.middleSection}>
          <div className={styles.company}>{company}</div>
          <div className={styles.location}>{location}</div>
        </div>
        <span className={styles.amount}>{amount}</span>
      </div>
      <div className={styles.rightSection}>
        <span className={styles.favorite}>{favorite ? "⭐" : "☆"}</span>
      </div>
    </div>
  );
};

export default RecommendationList;
