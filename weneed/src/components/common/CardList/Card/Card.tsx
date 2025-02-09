import styles from '@/components/common/CardList/Card/Card.module.scss';
import { FC, useState } from 'react';
import YellowStar from '@/assets/icons/yellow-star.svg';
import GrayStar from '@/assets/icons/gray-star.svg';

interface CardProps {
  title: string;
  amount: string;
  location: string;
  price: number;
  company: string;
  style?: React.CSSProperties;
}

const formatPrice = (price: number) => {
  return (
    <span>
      <span className={styles.priceValue}>{price.toLocaleString()}</span>
      <span className={styles.priceUnit}> 원</span>
    </span>
  );
};

const Card: FC<CardProps> = ({ title, amount, location, price, company, style }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <div className={styles.card} style={style}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <img 
          src={isFavorite ? YellowStar : GrayStar} 
          alt="favorite icon" 
          className={styles.favoriteIcon} 
          onClick={toggleFavorite} 
        />
      </div>
      
      <p className={styles.amount}>{amount}</p>
      <p className={styles.location}>{location}</p>
      
      <div className={styles.bottomWrapper}>
        <p className={styles.company}><strong>{company}</strong></p>
        <p className={styles.price}><strong>{formatPrice(price)}</strong></p>
      </div>
    </div>
  );
};

export default Card;