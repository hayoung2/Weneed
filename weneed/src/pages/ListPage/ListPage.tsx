import styles from '@/pages/ListPage/ListPage.module.scss';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import SearchButton from '@/components/atoms/SearchButton/SearchButton';
import Toggle from '@/components/atoms/Toggle/Toggle';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import Pagination from '@/components/atoms/Pagination/Pagination';
import DropDown from '@/components/atoms/DropDown/DropDown';
import CardList from '@/components/common/CardList/CardList/CardList';

const API_URL = "http://localhost:5000/api"; // 백엔드 API 주소

const options = ['최신순', '가격 낮은 순', '배송비 낮은 순'];

const ITEMS_PER_PAGE = 10;

const ListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const aiMatchQuery = queryParams.get('aiMatch') === 'true';

  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const [isAiMatch, setIsAiMatch] = useState<boolean>(aiMatchQuery);
  const [submittedSearch, setSubmittedSearch] = useState<string>(searchQuery);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string>(options[0]);

  const userId = "currentUserId"; // TODO: 로그인된 유저 ID 가져오기

  // 🔥 검색 실행 (submittedSearch 변경될 때 실행)
  useEffect(() => {
    if (submittedSearch) {
      fetch(`${API_URL}/available-byproducts?search=${encodeURIComponent(submittedSearch)}`)
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.error("검색 오류:", error));
    }
  }, [submittedSearch]);

  // 🔥 즐겨찾기 가져오기
  useEffect(() => {
    fetch(`${API_URL}/favorites?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        const favoriteIds = data.map((fav: any) => fav.favoriteCompanyId);
        setFavorites(favoriteIds);
      })
      .catch(error => console.error("즐겨찾기 불러오기 오류:", error));
  }, []);

  // 🔥 검색 실행 시 즉시 반영되도록 변경
  const handleSubmit = () => {
    if (searchTerm.trim() !== '') {
      setSubmittedSearch(searchTerm); 
      navigate(`/list?search=${encodeURIComponent(searchTerm)}&aiMatch=${isAiMatch}`);
    }
  };

  const handleCardClick = (item: any) => {
    navigate(`/companyDetail/${item.uniqueId}`, { state: item });
  };

  const handleFavoriteToggle = (companyId: string, companyName: string) => {
    if (favorites.includes(companyId)) {
      fetch(`${API_URL}/favorites/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, favoriteCompanyId: companyId }),
      })
      .then(() => {
        setFavorites(favorites.filter(id => id !== companyId));
      })
      .catch(error => console.error("즐겨찾기 삭제 오류:", error));
    } else {
      fetch(`${API_URL}/favorites/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, favoriteCompanyId: companyId, companyName }),
      })
      .then(() => {
        setFavorites([...favorites, companyId]);
      })
      .catch(error => console.error("즐겨찾기 추가 오류:", error));
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div className={styles.toggleContainer}>
            <div className={styles.aiText}>AI 매칭 {isAiMatch ? 'ON' : 'OFF'}</div>
            <Toggle style={{width:'60%', paddingLeft:'10%'}} checked={isAiMatch} onChange={() => setIsAiMatch(!isAiMatch)} />
          </div>
          <div className={styles.searchContainer}>
            <SearchBar
              value={searchTerm}
              onChange={(value: string) => setSearchTerm(value)}
              onSubmit={handleSubmit}
              placeholder="원하는 자원을 검색해보세요."
            />
            <SearchButton  style={{marginTop:'1.5vw'}} isAiMatch={isAiMatch} onClick={handleSubmit}  />
          </div>
        </div>
      </div>

      <div className={styles.mainbody}>
        {submittedSearch && (
          <div className={styles.searchResult}>
            <span>"{submittedSearch}"</span>에 대한 검색결과
          </div>
        )}

        {currentItems.length > 0 ? (
          <CardList 
            cards={currentItems.map(item => ({
              id: item.uniqueId,
              availableByproductName: item.availableByproductName,
              amount: `${item.availableByproductAmount} ${item.availableByproductUnit}`,
              price: Number(item.availableByproductPrice),
              industryType: item.companyInfo?.industryType || "정보 없음",
              companyName: item.companyInfo?.companyName || "정보 없음",
              isFavorite: favorites.includes(item.uniqueId),
            }))}
            onCardClick={handleCardClick}
            onFavoriteToggle={handleFavoriteToggle} 
          />
        ) : (
          <p className={styles.subContent}>
            검색 결과가 없습니다.
          </p>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <Pagination totalPages={totalPages} activePage={currentPage} onPageClick={handlePageClick} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ListPage;
