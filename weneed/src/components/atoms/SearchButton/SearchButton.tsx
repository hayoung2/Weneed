import styles from '@/components/atoms/SearchButton/SearchButton.module.scss';
import chartIcon from '@/assets/icons/chart.svg';
import searchIcon from '@/assets/icons/search-bar.svg';
import { useState, useEffect } from 'react';

interface SearchButtonProps {
  isAiMatch?: boolean;
  alwaysSearchLabel?: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isAiMatch = false, alwaysSearchLabel = false,style, onClick }) => {
  const [animatedClass, setAnimatedClass] = useState('');

  useEffect(() => {
    setAnimatedClass(styles.transitionEffect);
  }, [isAiMatch]);

  return (
    <button 
      className={`${styles.searchButton} ${isAiMatch ? styles.aiMatchButton : ''} ${animatedClass}`} 
      onClick={onClick} style={style}
    >
      <img 
        src={isAiMatch && !alwaysSearchLabel ? chartIcon : searchIcon} 
        alt="검색 버튼 아이콘" 
        className={styles.searchIcon} 
      />
      <p>{alwaysSearchLabel ? "검색하기" : isAiMatch ? "AI 매칭" : "검색하기"}</p>
    </button>
  );
};

export default SearchButton;
