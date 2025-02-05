import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AiMatching from '@/pages/AiMatching/AiMatching';
import CardList from "@/components/atoms/CardList/CardList";
import Pagination from "@/components/atoms/Pagination/Pagination";
import styles from '@/pages/AiMatchingS/AiMatchingS.module.scss';

const AiMatchingS = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [submittedSearch, setSubmittedSearch] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSubmittedSearch(searchQuery);
    }
  }, [location]);

  const mockData = Array.from({ length: 48 }, (_, index) => ({
    title: `메추리알 껍데기 ${index + 1}`,
    amount: "일평균 100kg",
    location: "부산 영도구 남항동",
    company: "HJ 중공업",
    industry: "제조업"
  }));

  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AiMatching
      middleContent={
        <div className={styles.middleSection}>
          <div className={styles.mainbody}>
            {submittedSearch && (
              <div className={styles.searchResult}>
                <span>"{submittedSearch}"</span>에 대한 검색결과
              </div>
            )}

            <div className={styles.listup}>
              <CardList cards={currentItems} />
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <Pagination totalPages={totalPages} activePage={currentPage} onPageClick={handlePageClick} />
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default AiMatchingS;
