import styles from '@/components/common/CardList/CardSmall/CardSmall.module.scss';
import { FC, useState } from 'react';
import YellowStar from '@/assets/icons/yellow-star.svg';
import GrayStar from '@/assets/icons/gray-star.svg';

interface CardSmallProps {
  location: string;
  company: string;
  title: string;
  amount: string;
  style?: React.CSSProperties;
}

const CardSmall: FC<CardSmallProps> = ({ location, company, title, amount, style }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <div className={styles.card} style={style}>
      <div className={styles.location}>{location}</div>
      <div className={styles.header}>
        <h2 className={styles.company}>{company}</h2>
        <img 
          src={isFavorite ? YellowStar : GrayStar} 
          alt="favorite icon" 
          className={styles.favoriteIcon} 
          onClick={toggleFavorite} 
        />
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.amount}>{amount}</p>
    </div>
  );
};

export default CardSmall;
