import Card from "@/components/common/CardList/Card/Card";
import styles from "@/components/common/CardList/CardList/CardList.module.scss"; 

interface CardListProps {
  cards: {
    title: string;
    amount: string;
    location: string;
    price: number;
    industry: string;
    company: string;
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
