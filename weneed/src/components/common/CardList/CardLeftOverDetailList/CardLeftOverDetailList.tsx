import React from 'react';
import CardLeftOverDetail from '@/components/common/CardList/CardLeftOverDetail/CardLeftOverDetail';
import styles from '@/components/common/CardList/CardLeftOverDetailList/CardLeftOverDetailList.module.scss';

interface CardLeftOverDetailListProps {
  cards: {
    title: string;
    amount: string;
    price: number;
    description: string;
  }[];
}

const CardLeftOverDetailList: React.FC<CardLeftOverDetailListProps> = ({ cards }) => {
  return (
    <div className={styles.cardLeftOverDetailListContainer}>
      <div className={styles.cardLeftOverDetailList}>
        {cards.map((item, index) => (
          <CardLeftOverDetail key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CardLeftOverDetailList;