import styles from '@/pages/ListPage/ListPage.module.scss';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import SearchButton from '@/components/atoms/SearchButton/SearchButton';
import Toggle from '@/components/atoms/Toggle/Toggle';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import CardList from '@/components/common/CardList/CardList/CardList';
import Pagination from '@/components/atoms/Pagination/Pagination';

const mockData = Array.from({ length: 48 }, (_, index) => ({
  title: `메추리알 껍데기 ${index + 1}`,
  amount: "일평균 100kg",
  location: "부산 영도구 남항동",
  company: "HJ 중공업",
  industry: "제조업"
}));

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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSearchTerm(searchQuery);
    setSubmittedSearch(searchQuery);
    setIsAiMatch(aiMatchQuery);
  }, [searchQuery, aiMatchQuery]);

  const handleSubmit = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/list?search=${encodeURIComponent(searchTerm)}&aiMatch=${isAiMatch}`);
    }
  };

  const filteredItems = mockData.filter(item =>
    item.title.toLowerCase().includes(submittedSearch.toLowerCase())
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

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
            <Toggle checked={isAiMatch} onChange={() => setIsAiMatch(!isAiMatch)} />
          </div>

          <div className={styles.searchContainer}>
            <SearchBar
              value={searchTerm}
              onChange={(value: string) => setSearchTerm(value)}
              onSubmit={handleSubmit}
              placeholder="원하는 자원을 검색해보세요."
            />
            <SearchButton isAiMatch={isAiMatch} onClick={handleSubmit}/>
          </div>
        </div>
      </div>

      <div className={styles.mainbody}>
        {submittedSearch && (
          <div className={styles.searchResult}>
            <span>"{submittedSearch}"</span>에 대한 검색결과
          </div>
        )}

        <div className={styles.listup}>
          {filteredItems.length > 0 ? (
            <CardList cards={currentItems} />
          ) : (
            <div className={styles.noResults}>검색 결과가 없습니다.</div>
          )}
        </div>

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
