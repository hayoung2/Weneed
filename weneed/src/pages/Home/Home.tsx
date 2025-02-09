import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import styles from "./Home.module.scss";
import SearchBar from '@/components/common/SearchBar/SearchBar';
import SearchButton from '@/components/atoms/SearchButton/SearchButton';
import Toggle from '@/components/atoms/Toggle/Toggle';
import DemandIcon from '@/assets/icons/package.svg'
import SupplyIcon from '@/assets/icons/truck.svg'
import FarmerImg from '@/assets/images/farmer-img.png'
import BusinessImg from '@/assets/images/business-img.png'
import WorkerImg from '@/assets/images/worker-img.png'

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAiMatch, setIsAiMatch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (searchTerm.trim() !== '') {
      console.log("Search submitted:", searchTerm);
    }
  };

  return (
    <div className={styles.home}>
      <Header />
      <div className = {styles.header}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>버려지는 부산물?<br/>새로운 가치로!<br/><span className={styles.highlight}>위니드</span>에서 연결하세요.</h2>
          </div>
          
            <div className={styles.resourceButtons}>
              <div className={styles.supplyButton} onClick={() => navigate('/supply')}>
                <p>공급 가능한 <br/> 자원등록하기</p>
                <img src={SupplyIcon} alt="" />
              </div>
              <div className={styles.demandButton} onClick={() => navigate('/demand')}>
                <p>필요한 자원 <br/>등록하기</p>
                <img src={DemandIcon} alt="" />
              </div>
            </div>
        </div>

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

      <div className={styles.problemSection}>
        <h3>위니드는 이런 고민을 가지고 탄생했어요!</h3>
        <div className={styles.problemCards}>
          <div className = {styles.cardWrapper}>
            <img src={FarmerImg} alt="농업인 아이콘" />
            <div className={styles.problemCard}>
              <p>우리 회사에서 발생하는<br/> 부산물을 처리하는 데 <br/>경제적 부담이 있어요.</p>
            </div>
          </div>
            <div className = {styles.cardWrapper}>
              <img src={BusinessImg} alt="비즈니스 아이콘" />
              <div className={styles.problemCard}>
                <p>창업하고 싶은데 정보가 없어서 필요한 자원을 구하기가 어려워요.</p>
              </div>
          </div>
          <div className = {styles.cardWrapper}>
            <img src={WorkerImg} alt="작업자 아이콘" />
            <div className={styles.problemCard}>
              <p>우리 회사에 필요한 알맞은 양의 자원을 구하고 싶어요.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;