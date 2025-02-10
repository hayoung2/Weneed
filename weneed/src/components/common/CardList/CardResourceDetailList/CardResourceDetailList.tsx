import React from 'react';
import CardResourceDetail from '@/components/common/CardList/CardResourceDetail/CardResourceDetail';
import styles from '@/components/common/CardList/CardResourceDetailList/CardResourceDetailList.module.scss';

interface CardResourceDetailListProps {
  cards: {
    title: string;
    amount: string;
    description: string;
  }[];
}

const CardResourceDetailList: React.FC<CardResourceDetailListProps> = ({ cards }) => {
  return (
    <div className={styles.cardResourceDetailListContainer}>
      <div className={styles.cardResourceDetailList}>
        {cards.map((item, index) => (
          <CardResourceDetail key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CardResourceDetailList;