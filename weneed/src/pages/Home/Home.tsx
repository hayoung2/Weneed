import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import styles from "./Home.module.scss";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import SearchButton from "@/components/atoms/SearchButton/SearchButton";
import Toggle from "@/components/atoms/Toggle/Toggle";
import DemandIcon from "@/assets/icons/package.svg";
import DemandIconHover from "@/assets/icons/package-hover.svg";
import SupplyIcon from "@/assets/icons/truck.svg";
import SupplyIconHover from "@/assets/icons/truck-hover.svg";
import WeneedLogoWhite from "@/assets/icons/white-weneed.svg"
import FarmerImg from "@/assets/images/farmer-img.png";
import BusinessImg from "@/assets/images/business-img.png";
import WorkerImg from "@/assets/images/worker-img.png";
import AibuttonIcon from "@/assets/icons/home-aibutton.svg";
import ClipboardIcon from "@/assets/icons/home-board.svg";
import MapIcon from "@/assets/icons/home-map.svg";
import ChartIcon from "@/assets/icons/home-chart.svg";
import MinistryLogo from "@/assets/icons/ministryLogo.svg";

import firstDetail from "@/assets/images/step1-detail.png";
import secondDetail from "@/assets/images/step2-detail.png";
import thirdDetail from "@/assets/images/step3-detail.png";
import fourthDetail from "@/assets/images/step4-detail.png";
import { useAuth } from "@/components/contexts/AuthContext"; 

export const HomePage = () => {
  const imageUrl =
    "https://s3-alpha-sig.figma.com/img/8190/e338/5d2a670b08891128fbd753070eebc18f?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=U8Hl-yX1-1zVTjG1hRlvGtiDbQPKVCxhBLyYz-MLNK-yb46ryqQQjnIDZpCtP8ESvoWq3wuVRptXdRrJ2wAQWb3mXVnUIy9mtqKUt86vuQNu7zkqyyO2nc5xOP3BhWcq2EU9IivpmtbrcP3vgDK239CwefevNfiH75tK8lcy5BrfHKHmbiYzHyI3dsSwYZglSm8t6YQLUmoYxCBeBHqjU8-ckhVnytxwOxrOyWHqA~RWtlSL2uevbO~7dWMVOiLw7R7pAX5u2B556N1u~7FtYPNpRbWqbr-53BNGPLca85YizTREP0XDWKuRatwS1CXph9PYV-xFaSImGaWIagVKrg__";
  const [searchTerm, setSearchTerm] = useState("");
  const [isAiMatch, setIsAiMatch] = useState(false);
  const [isSupplyHovered, setIsSupplyHovered] = useState(false);
  const [isDemandHovered, setIsDemandHovered] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const howtoSectionRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/list?search=${encodeURIComponent(searchTerm)}`);
    }
  }

  const handleScrollToHowto = () => {
    if (howtoSectionRef.current) {
      howtoSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  
  const handleSupplyClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user?.userType === "개인") {
      alert("개인 회원의 경우 공급 자원 등록이 불가능합니다.");
      return;
    }
    navigate("/registerByProduct"); 
  };


  const handleDemandClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user?.userType === "개인") {
      alert("개인 회원의 경우 필요 자원 등록이 불가능합니다.");
      return;
    }
    navigate("/registerResource");
  };

  return (
    <div className={styles.home}>
      <div className = {styles.headerWrappers}>
        <Header />
      </div>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>
              버려지는 폐기물에 가치를 더하다.
              <br />
            </h2>
            <h4>
              <span className={styles.highlight}>위니드</span>에서 연결하세요.
            </h4>
          </div>
        </div>

        <div className={styles.headerWrapper}>
          <div className={styles.toggleContainer}>
            <p className={styles.aiText}>
              AI 매칭 {isAiMatch ? "ON" : "OFF"}
            </p>
              <Toggle
                checked={isAiMatch}
                onChange={() => setIsAiMatch(!isAiMatch)}
                style={{ width: "35%" ,paddingLeft:"35%",marginTop:"0.4vw"}}
              />

          </div>

          <div className={styles.searchContainer}>
            <SearchBar
              value={searchTerm}
              onChange={(value: string) => setSearchTerm(value)}
              onSubmit={handleSubmit}
              placeholder="원하는 자원을 검색해보세요."
            />
            <div className={styles.searchbutton}>
              <SearchButton isAiMatch={isAiMatch} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      <div className = {styles.startSection}>
        <h3>쉽고 빠르게 위니드 시작하기</h3>
          <div className={styles.resourceButtons}>
            <div
              className={styles.weneedButton}
              onClick={handleScrollToHowto}
            >
              <p>
                위니드 이용방법
              </p>
              <img
                src={WeneedLogoWhite}
                alt= "로고 아이콘"
                className = {styles.weneedLogo}
              />
            </div>
            <div
              className={styles.supplyButton}
              onClick={handleSupplyClick}
              onMouseEnter={() => setIsSupplyHovered(true)}
              onMouseLeave={() => setIsSupplyHovered(false)}
            >
              <p>
                공급 가능한 <br /> 자원 등록하기
              </p>
              <img
                src={isSupplyHovered ? SupplyIconHover : SupplyIcon}
                alt="공급 아이콘"
                className = {styles.supplyIcon}
              />
            </div>
            <div
              className={styles.demandButton}
              onClick={handleDemandClick} 
              onMouseEnter={() => setIsDemandHovered(true)}
              onMouseLeave={() => setIsDemandHovered(false)}
            >
              <p>
                필요한 자원 <br /> 등록하기
              </p>
              <img
                src={isDemandHovered ? DemandIconHover : DemandIcon}
                alt="수요 아이콘"
                className = {styles.demandIcon}
              />
            </div>
          </div>
        
      </div>
      <div className={styles.problemSection}>
        <h3>위니드는 이런 고민을 가지고 탄생했어요!</h3>
        <div className={styles.problemCards}>
          <div className={styles.cardWrapper}>
            <img src={FarmerImg} alt="" />
            <div className={styles.problemCard}>
              <p>
                우리 회사에서 발생하는
                <br /> 부산물을 처리하는 데 <br />
                경제적 부담이 있어요.
              </p>
            </div>
          </div>
          <div className={styles.cardWrapper}>
            <img src={BusinessImg} alt="콘" />
            <div className={styles.problemCard}>
              <p>
                창업하고 싶은데 정보가
                <br /> 없어서 필요한 자원을
                <br /> 구하기가 어려워요.
              </p>
            </div>
          </div>
          <div className={styles.cardWrapper}>
            <img src={WorkerImg} alt="" />
            <div className={styles.problemCard}>
              <p>
                우리 회사에 필요한 <br />
                알맞은 양의 자원을 <br />
                구하고 싶어요.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.solutionSection}>
        <h3>
          <span className={styles.highlight}>위니드</span>가 제공하는 맞춤
          솔루션
        </h3>
        <div className={styles.solutionCards}>
          <div className={styles.solutionCard}>
            <img src={AibuttonIcon} className={styles.AiButton} alt="" />
            <div className={styles.textWrapper}>
              <h4>AI 매칭 기능</h4>
              <p>
                우리 회사의 집중된 자원 목록을
                <br /> 바탕으로 AI 매칭 기능이 제공됩니다.
              </p>
            </div>
          </div>
          <div className={styles.solutionCard}>
            <img src={ClipboardIcon} className = {styles.Clipboard} alt="" />
            <div className={styles.textWrapper}>
              <h4>거래 일지 작성 하기</h4>
              <p>
                거래를 위한 정보를 쉽게 체계적으로
                <br /> 기록할 수 있는 거래 일지를 제공합니다.
              </p>
            </div>
          </div>
          <div className={styles.solutionCard}>
            <div className={styles.iconWrapper}>
              <img src={MapIcon} className={styles.MapIcon} alt="" />
              <img src={ChartIcon} className={styles.ChartIcon} alt="" />
            </div>
            <div className={styles.textWrapper}>
              <h4>지역 부산물 현황 알기</h4>
              <p>
                with 위니드에서 특정 지역 기업의
                <br /> 부산물 현황을 파악할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.howtoSection} ref={howtoSectionRef}>
        <h3 className={styles.sectionTitle}>서비스 이용방법</h3>
        <div className={styles.stepsContainer}>
          <div className={styles.stepCard}>
            <img src={firstDetail} alt="Step 1" className={styles.stepImage} />
          </div>
          <div className={styles.stepCard}>
            <img src={secondDetail} alt="Step 2" className={styles.stepImage} />
          </div>
          <div className={styles.stepCard}>
            <img src={thirdDetail} alt="Step 3" className={styles.stepImage} />
          </div>
          <div className={styles.stepCard}>
            <img src={fourthDetail} alt="Step 4" className={styles.stepImage} />
          </div>
        </div>
      </div>

      <div
        className={styles.heroSection}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className={styles.heroOverlay}>
          <p>
            위니드는 부산물 자원의 공급자와 <br />
            이를 필요로 하는 수요자를 연결하여 <br />
            자원의 순환구조를 구축합니다.
          </p>
        </div>
      </div>

      <div className={styles.partnershipSection}>
        <img
          src={MinistryLogo}
          alt="산업통상자원부 로고"
          className={styles.partnerLogo}
        />
        <p>
          위니드는 서비스의 지속가능성을 위해 대한민국 환경부와 함께
          합니다.
        </p>
      </div>
      <div className = {styles.footerWrapper}>
      <Footer />
      </div>
    </div>
  );
};

export default HomePage;
