import styles from '@/components/common/CardList/Card/Card.module.scss';
import { FC } from 'react';

const formatPrice = (price: number) => {
  return (
    <span>
      <span className={styles.priceValue}>{price.toLocaleString()}</span>
      <span className={styles.priceUnit}> 원</span>
    </span>
  );
};

interface CardProps {
  id: string;
  availableByproductName: string;
  amount: string;
  companyAddress: string;
  companyName: string;
  price: number;
  style?: React.CSSProperties;
  onClick: () => void;
}

const Card: FC<CardProps> = ({
  id,
  availableByproductName,
  amount,
  companyAddress,
  companyName,
  price,
  style,
  onClick,
}) => {
  return (
    <div className={styles.card} style={style} onClick={onClick} data-id={id}>
      <div className={styles.header}>
        <h2 className={styles.title}>{availableByproductName}</h2>
      </div>

      <p className={styles.amount}>월평균 {amount}</p>
      <p className={styles.companyAddress}><strong>{companyAddress}</strong></p>

      <div className={styles.bottomWrapper}>
        <p className={styles.companyName}><strong>{companyName}</strong></p>
        <p className={styles.price}><strong>{formatPrice(price)}</strong></p>
      </div>
    </div>
  );
};

export default Card;

