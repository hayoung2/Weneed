import styles from '@/components/common/CardList/Card/Card.module.scss';
import { FC } from 'react';
import MeetIcon from '@/assets/icons/meet.svg';

interface CardProps {
  title: string;
  amount: string;
  location: string;
  company: string;
  style?: React.CSSProperties;
}

const Card: FC<CardProps> = ({ title, amount, location, company, style }) => {
  return (
    <div className={styles.card} style={style}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={styles.amount}>{amount}</p>
      <div className={styles.infoWrapper}>
        <p className={styles.location}>{location}</p>
        <div className={styles.bottomWrapper}>
          <p className={styles.company}><strong>{company}</strong></p>
          <div className={styles.industryContainer}>
            <img src={MeetIcon} alt="meeticon" className={styles.MeetIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
