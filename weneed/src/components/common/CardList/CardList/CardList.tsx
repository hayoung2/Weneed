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
    isFavorite: boolean;
    style?: React.CSSProperties;
  }[];
  onCardClick: (item: any) => void;
  onFavoriteToggle: (id: string, companyName: string) => void; 
}

const CardList: React.FC<CardListProps> = ({ cards, onCardClick, onFavoriteToggle }) => {
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
          isFavorite={item.isFavorite}
          onClick={() => onCardClick(item)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};


export default CardList;
