import React from 'react';
import CardSmall from '@/components/common/CardList/CardSmall/CardSmall';
import styles from '@/components/common/CardList/CardSmallList/CardSmallList.module.scss';

interface CardSmallListProps {
  cards: {
    companyName: string;
    companyAddress: string;
    byproductName?:string;
    byproductAmount?:number;
    style?: React.CSSProperties;
  }[];
}

const CardSmallList: React.FC<CardSmallListProps> = ({ cards }) => {
  return (
    <div className={styles.cardSmallListContainer}>
      <div className={styles.cardSmallList}>
        {cards.map((item, index) => (
          <CardSmall key={index} {...item} style={{ minWidth: '200px' }} />
        ))}
      </div>
    </div>
  );
};

export default CardSmallList;