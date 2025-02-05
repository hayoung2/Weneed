import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import styles from '@/pages/Search/Search.module.scss';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import chartIcon from '@/assets/icons/chart.svg';
import searchIcon from '@/assets/icons/search.svg';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAiMatch, setIsAiMatch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (isAiMatch) {
      if (searchTerm.trim() === '') {
        navigate('/aimatching');
      } else {
        navigate(`/aimatchings?search=${encodeURIComponent(searchTerm)}`);
      }
    } else {
      if (searchTerm.trim() !== '') {
        navigate(`/list?search=${encodeURIComponent(searchTerm)}&aiMatch=false`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.toggleContainer}>
          <p className={styles.aiText}>AI 매칭 {isAiMatch ? "ON" : "OFF"}</p>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={isAiMatch} 
              onChange={() => setIsAiMatch(!isAiMatch)} 
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <p className={styles.aiDescription}>
          {isAiMatch 
            ? "버튼을 누르면 AI 매칭이 가능해요!" 
            : "AI 매칭 없이 검색이 진행돼요!"}
        </p>

        <div className={styles.searchContainer}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="원하는 자원을 검색해보세요."
            onKeyDown={handleKeyPress}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            <img 
              src={isAiMatch ? chartIcon : searchIcon} 
              alt="검색 버튼 아이콘" 
              className={styles.searchIcon} 
            />
            <p>{isAiMatch ? "AI 매칭" : "검색하기"}</p>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
