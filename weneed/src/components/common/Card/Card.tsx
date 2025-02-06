import styles from '@/components/common/Card/Card.module.scss';
import { FC, useState } from 'react';
import YellowStar from '@/assets/icons/yellow-star.svg';
import GrayStar from '@/assets/icons/gray-star.svg';
import MeetIcon from '@/assets/icons/meet.svg'

interface CardProps {
  title: string;
  amount: string;
  location: string;
  company: string;
  style?: React.CSSProperties;
}

const Card: FC<CardProps> = ({ title, amount, location, company,  style }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <div className={styles.card} style={style}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.favorite} onClick={toggleFavorite} role="button" aria-label="Toggle favorite">
          <img src={isFavorite ? YellowStar : GrayStar} alt="Favorite star" width={24} height={24} />
        </span>
      </div>
      <p className={styles.amount}>{amount}</p>
      <div className={styles.infoWrapper}>
        <p className={styles.location}>{location}</p>
        <div className={styles.bottomWrapper}>
          <p className={styles.company}><strong>{company}</strong></p>
          <div className={styles.industryContainer}>
            <img src={MeetIcon} alt="" className={styles.MeetIcon} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Card;