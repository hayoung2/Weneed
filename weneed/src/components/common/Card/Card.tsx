import styles from '@/components/common/Card/Card.module.scss';
import { FC, useState } from 'react';
import YellowStar from '@/assets/icons/yellow-star.svg';
import GrayStar from '@/assets/icons/gray-star.svg';

interface CardProps {
  title: string;
  amount: string;
  location: string;
  company: string;
  industry: string;
}

const Card: FC<CardProps> = ({ title, amount, location, company, industry }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <div className={styles.card}>
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
          <p className={styles.industry}>{industry}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
