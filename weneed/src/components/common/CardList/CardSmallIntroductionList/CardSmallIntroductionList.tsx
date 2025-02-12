import React from 'react';
import CardSmallIntroduction from '@/components/common/CardList/CardSmallIntroduction/CardSmallIntroduction';
import styles from '@/components/common/CardList/CardSmallIntroductionList/CardSmallIntroductionList.module.scss';

interface CardSmallIntroductionListProps {
  cards: {
    companyName: string;
    companyAddress: string;
    byproductName?:string;
    byproductAmount?:number;
    onClick?: () => void;
    style?: React.CSSProperties;
  }[];
}

const CardSmallIntroductionList: React.FC<CardSmallIntroductionListProps> = ({ cards }) => {
  return (
    <div className={styles.cardSmallListContainer}>
      <div className={styles.cardSmallList}>
        {cards.map((item, index) => (
          <CardSmallIntroduction key={index} {...item} style={{ minWidth: '200px' }}  onClick={() => console.log('클릭됨')}  />
        ))}
      </div>
    </div>
  );
};

export default CardSmallIntroductionList;