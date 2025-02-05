import styles from '@/components/atoms/SearchButton/SearchButton.module.scss'
import chartIcon from '@/assets/icons/chart.svg';
import searchIcon from '@/assets/icons/search.svg';

interface SearchButtonProps {
  isAiMatch: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isAiMatch }) => {
  return (
    <button className={styles.searchButton}>
      <img 
        src={isAiMatch ? chartIcon : searchIcon} 
        alt="검색 버튼 아이콘" 
        className={styles.searchIcon} 
      />
      <p>{isAiMatch ? "AI 매칭" : "검색하기"}</p>
    </button>
  );
};

export default SearchButton;
