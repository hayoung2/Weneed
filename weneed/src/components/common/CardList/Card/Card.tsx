import styles from '@/components/common/CardList/Card/Card.module.scss';
import { FC } from 'react';
import MeetIcon from '@/assets/icons/meet.svg';

interface CardProps {
  title: string;
  amount: string;
  location: string;
  price: number;
  style?: React.CSSProperties;
}
const formatPrice = (price: number) => {
  return `${price.toLocaleString()} 원`;
};

const Card: FC<CardProps> = ({ title, amount, location, price, style }) => {
  return (
    <div className={styles.card} style={style}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <img src={MeetIcon} alt="meeticon" className={styles.MeetIcon} />
      </div>
      
      <p className={styles.amount}>{amount}</p>

      <div className={styles.infoWrapper}>
        <div className={styles.bottomWrapper}>
          <p className={styles.location}>{location}</p>
          <p className={styles.price}><strong>{formatPrice(price)}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Card;
