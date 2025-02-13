import Card from "@/components/common/CardList/Card/Card";
import styles from "@/components/common/CardList/CardList/CardList.module.scss";

interface CardListProps {
  cards: {
    id: string;
    availableByproductName: string;
    amount: string;
    companyAddress: string;
    companyName: string;
    price: number;
    style?: React.CSSProperties;
  }[];
  onCardClick: (item: any) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, onCardClick }) => {
  return (
    <div className={styles.cardList}>
      {cards.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          availableByproductName={item.availableByproductName}
          amount={item.amount}
          price={item.price}
          companyAddress={item.companyAddress}
          companyName={item.companyName}
          onClick={() => onCardClick(item)}
        />
      ))}
    </div>
  );
};


export default CardList;
