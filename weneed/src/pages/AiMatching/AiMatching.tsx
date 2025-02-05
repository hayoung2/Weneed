import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import SearchBar from "@/components/common/SearchBar/SearchBar";
import SearchButton from '@/components/atoms/SearchButton/SearchButton';
import styles from "@/pages/AiMatching/AiMatching.module.scss";
import { useState, useEffect } from "react";
import RecommendationItem from "@/components/atoms/RecommendationList/RecommendationList";

interface Recommendation {
  id: number;
  icon: string;
  title: string;
  company: string;
  location: string;
  amount: string;
  favorite: boolean;
}

interface AiMatchingProps {
  middleContent?: React.ReactNode;
}

const AiMatching: React.FC<AiMatchingProps> = ({ middleContent }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecommendations([
        { id: 1, icon: "🥇", title: "메추리알 껍데기", company: "HJ 중공업", location: "부산 영도구 남항동", amount: "월평균 100kg", favorite: false },
        { id: 2, icon: "⚫", title: "메추리알 껍데기", company: "HJ 중공업", location: "부산 영도구 남항동", amount: "월평균 100kg", favorite: true },
        { id: 3, icon: "🥉", title: "메추리알 껍데기", company: "HJ 중공업", location: "부산 영도구 남항동", amount: "월평균 100kg", favorite: false }
      ]);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
          <p className={styles.description}>
            AI를 바탕으로 우리 기업에게 필요한 부산물 자원을 추천해줍니다.
          </p>

          <div className={styles.recommendationList}>
            {isLoading ? (
              [...Array(5)].map((_, index) => (
                <div key={index} className={styles.recommendationItem}></div>
              ))
            ) : (
              recommendations.map((item) => (
                <RecommendationItem key={item.id} {...item} />
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
              onSubmit={() => console.log("검색 실행:", searchValue)}
            />
            <SearchButton isAiMatch={false} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AiMatching;
