import Card from "@/components/common/Card/Card";
import styles from "@/components/atoms/CardList/CardList.module.scss"; 

interface CardListProps {
  cards: {
    title: string;
    amount: string;
    location: string;
    company: string;
    industry: string;
  }[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className={styles.cardList}>
      {cards.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};

export default CardList;
