import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import styles from '@/pages/Search/Search.module.scss';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import SearchButton from '@/components/atoms/SearchButton/SearchButton';
import Toggle from '@/components/atoms/Toggle/Toggle';

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

  const handleToggleChange = () => {
    setIsAiMatch((prev) => !prev);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.toggleContainer}>
          <p className={styles.aiText}>AI 매칭 {isAiMatch ? "ON" : "OFF"}</p>
          <Toggle checked={isAiMatch} onChange={handleToggleChange} />
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
          <SearchButton    style={{marginTop:'1.5vw'}} isAiMatch={isAiMatch} onClick={handleSearch} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;