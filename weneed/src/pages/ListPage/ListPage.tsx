import styles from '@/pages/ListPage/ListPage.module.scss';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import SearchButton from '@/components/atoms/SearchButton/SearchButton';
import Toggle from '@/components/atoms/Toggle/Toggle';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import Pagination from '@/components/atoms/Pagination/Pagination';
import CardList from '@/components/common/CardList/CardList/CardList';

const API_URL = "http://43.201.160.49:5000/api"; // 백엔드 API 주소

const ITEMS_PER_PAGE = 10;

const ListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const aiMatchQuery = queryParams.get('aiMatch') === 'true';
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const [isAiMatch, setIsAiMatch] = useState<boolean>(aiMatchQuery);
  const submittedSearch = searchQuery;
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);


  // 🔥 검색 실행 (submittedSearch 변경될 때 실행)
  useEffect(() => {
    if (submittedSearch) {
      fetch(`${API_URL}/available-byproducts?search=${encodeURIComponent(submittedSearch)}`)
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.error("검색 오류:", error));
    }
  }, [submittedSearch]);

 

  const handleSubmit = () => {
    if (isAiMatch) {
      if (searchTerm.trim() == "") {
        alert("입력한 단어가 등록된 필요자원에 없을 경우, 정확한 AI 매칭이 이루어지지 않을 수 있습니다.");
      } else {
        navigate(`/aimatchings?search=${encodeURIComponent(searchTerm)}`);
      }
    } else {
      if (searchTerm.trim() !== "") {
        navigate(`/list?search=${encodeURIComponent(searchTerm)}`);
      }
    }
  };





  const handleCardClick = (item: any) => {
    navigate(`/transactionDetail/${item.id}`, { state: item }); 
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
      
      <div className = {styles.listupWrapper}>
        {currentItems.length > 0 ? (
          <CardList 
            cards={currentItems.map(item => ({
              id: item.id,
              uniqueId:item.uniqueId,
              availableByproductName: item.availableByproductName,
              amount: `${item.availableByproductAmount} ${item.availableByproductUnit}`,
              price: Number(item.availableByproductPrice),
              companyAddress: item.companyInfo?.companyAddress || "주소가 존재하지 않습니다.",
              companyName: item.companyInfo?.companyName || "회사 이름이 없습니다.",
            }))}
            onCardClick={handleCardClick}
          />
        ) : (
          <p className={styles.subContent}>
            검색 결과가 없습니다.
          </p>
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
