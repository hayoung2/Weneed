import styles from '@/components/common/CardList/Card/Card.module.scss';
import { FC, useState } from 'react';
import YellowStar from '@/assets/icons/yellow-star.svg';
import GrayStar from '@/assets/icons/gray-star.svg';



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
  price: number;
  industryType: string;
  companyName: string;
  isFavorite: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
  onFavoriteToggle: (id: string, companyName: string) => void; // ✅ companyName을 필수 매개변수로 지정
}

const Card: FC<CardProps> = ({
  id,
  availableByproductName,
  amount,
  price,
  industryType,
  companyName,
  isFavorite,
  style,
  onClick,
  onFavoriteToggle,
}) => {
  return (
    <div className={styles.card} style={style} onClick={onClick} data-id={id}>
      <div className={styles.header}>
        <h2 className={styles.title}>{availableByproductName}</h2>
        <img
          src={isFavorite ? YellowStar : GrayStar}
          alt="favorite icon"
          className={styles.favoriteIcon}
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(id, companyName); // ✅ 항상 companyName 전달
          }}
        />
      </div>

      <p className={styles.amount}>{amount}</p>

      <div className={styles.bottomWrapper}>
        <p className={styles.company}><strong>{companyName}</strong></p>
        <p className={styles.industry}><strong>{industryType}</strong></p>
        <p className={styles.price}><strong>{price.toLocaleString()} 원</strong></p>
      </div>
    </div>
  );
};

export default Card;

