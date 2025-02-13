import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AiMatching from '@/pages/AiMatching/AiMatching';
import styles from '@/pages/AiMatchingS/AiMatchingS.module.scss';

const AiMatchingS = () => {
  const [submittedSearch, setSubmittedSearch] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSubmittedSearch(searchQuery);
    }
  }, [location]);

  




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

            
          </div>
        </div>
      }
    />
  );
};

export default AiMatchingS;
