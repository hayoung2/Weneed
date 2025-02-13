import styles from '@/components/common/CardList/CardSmallIntroduction/CardSmallIntroduction.module.scss';
import { FC } from 'react';

interface CardSmallIntroductionProps {
  companyName?: string;
  companyAddress?: string;
  byproductName?:string;
  byproductAmount?:number;
  onClick: () => void;
  style?: React.CSSProperties;
}

const CardSmallIntroduction: FC<CardSmallIntroductionProps> = ({ 
  companyName,
  companyAddress,
  byproductName ='',
  byproductAmount='',
  onClick,
  style
 }) => {

  return (
    <div className={styles.card} style={style} onClick={onClick}>
      <div className={styles.byproductName}>{byproductName && `${byproductName}`}</div>
      <div className={styles.header}>
        <h2 className={styles.byproductAmount}> {byproductAmount && `${byproductAmount}`}</h2>
      </div>
      <p className={styles.title}>{companyAddress}</p>
      <p className={styles.amount}>{companyName}</p>
    </div>
  );
};

export default CardSmallIntroduction;
