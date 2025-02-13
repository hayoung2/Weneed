import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import SearchBar from "@/components/common/SearchBar/SearchBar";
import SearchButton from '@/components/atoms/SearchButton/SearchButton';
import styles from "@/pages/AiMatching/AiMatching.module.scss";
import { useState, useEffect } from "react";
import RecommendationItem from "@/components/atoms/RecommendationList/RecommendationList";
import { useAuth } from '@/components/contexts/AuthContext';
import { useNavigate } from "react-router-dom";

interface Recommendation {
  id: number;
  availableByproductName: string;
  companyName: string;
  companyAddress: string;
  availableByproductAmount: string;
  availableByproductUnit: string;
  availableByproductPrice: number;
  distance: number;
}

interface AiMatchingProps {
  middleContent?: React.ReactNode;
}

const AiMatching: React.FC<AiMatchingProps> = ({ middleContent }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.uniqueId) return;

    const fetchRecommendations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ai-recommendation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            neededByproductName: searchValue || "메추리알 껍데기",
            requestingCompanyUniqueId: user.uniqueId 
          }),
        });

        const data = await response.json();
        if (data.success) {
          setRecommendations(
            data.recommendations
              .slice(0, 5) 
              .map((item: any, index: number) => ({
                id: index + 1,
                availableByproductName: item.availableByproductName,
                companyName: item.companyName,
                companyAddress: item.companyAddress,
                availableByproductAmount: item.availableByproductAmount,
                availableByproductUnit: item.availableByproductUnit,
                availableByproductPrice: item.availableByproductPrice,
                distance: item.distance,
              }))
          );
        }
      } catch (error) {
        console.error("AI 추천 데이터 가져오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [user?.uniqueId, searchValue]);

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      navigate(`/list?search=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerText}>
          {isLoading ? "AI 분석중..." : "AI 분석완료!"}
          </div>
        </div>

        <div className={styles.mainBody}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>위니드</span>는 이렇게 추천해요!
          </h2>
          <div className={styles.description}>
            AI를 바탕으로 우리 기업에게 필요한 부산물 자원을 추천해줍니다.
          </div>

          <div className={styles.recommendationList}>
            {isLoading ? (
              [...Array(3)].map((_, index) => (
                <div key={index} className={styles.recommendationItem}></div>
              ))
            ) : (
              recommendations.map((item) => (
                <RecommendationItem
                  index={item.id} 
                  key={item.id}
                  title={item.availableByproductName}
                  company={item.companyName}
                  location={item.companyAddress}
                  amount={`${item.availableByproductAmount} ${item.availableByproductUnit}`}
                  price={item.availableByproductPrice}
                />
              ))
            )}
          </div>
        </div>
        
        {middleContent && <div className={styles.middleSection}>{middleContent}</div>}

        <div className={styles.bottomSection}>
          <div className={styles.infoText}>마음에 드는 부산물이 없다면?</div>
          <div className={styles.searchContainer}>
            <SearchBar
              value={searchValue}
              placeholder="검색어를 입력하세요..."
              onChange={(value) => setSearchValue(value)}
              onSubmit={handleSearch}
            />
            <SearchButton isAiMatch={false} alwaysSearchLabel={true} onClick={handleSearch} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AiMatching;
