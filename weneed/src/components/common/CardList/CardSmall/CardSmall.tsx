import styles from '@/components/common/CardList/CardSmall/CardSmall.module.scss';
import { FC, useState } from 'react';
import YellowStar from '@/assets/icons/yellow-star.svg';
import GrayStar from '@/assets/icons/gray-star.svg';

interface CardSmallProps {
  companyName?: string;
  companyAddress?: string;
  byproductName?:string;
  byproductAmount?:number;
  onClick: () => void;
  style?: React.CSSProperties;
}

const CardSmall: FC<CardSmallProps> = ({ 
  companyName,
  companyAddress,
  byproductName ='',
  byproductAmount='',
  onClick,
  style
 }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <div className={styles.card} style={style} onClick={onClick}>
      <div className={styles.byproductName}>{byproductName && `${byproductName}`}</div>
      <div className={styles.header}>
        <h2 className={styles.byproductAmount}>{byproductAmount && `${byproductAmount}`}</h2>
        <img 
          src={isFavorite ? YellowStar : GrayStar} 
          alt="favorite icon" 
          className={styles.favoriteIcon} 
          onClick={toggleFavorite} 
        />
      </div>
      <p className={styles.title}>{companyAddress}</p>
      <p className={styles.amount}>{companyName}</p>
    </div>
  );
};

export default CardSmall;
