import styles from "./UniqueNumber.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chartIcon from "@/assets/icons/copy.svg"; 
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import { useAuth } from "@/components/contexts/AuthContext"; 

interface UniqueNumberProps {
    companyName: string;
    businessNumber: string;
    representative: string;
    uniqueNumber: string;
    onNext?: () => void | Promise<void>;  
}
  
const UniqueNumber: React.FC<UniqueNumberProps> = ({ representative,companyName, uniqueNumber, onNext }) => {
  const { user } = useAuth();

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <p className={styles.title}>
          <span className={styles.blueText}>{user?.userType =="개인" ? representative :companyName}</span>의 고유번호
        </p>

        <CopyToClipboard text={uniqueNumber} onCopy={() => true}>
          <div className={styles.inputContainer}>
            <img src={chartIcon} alt="chart icon" className={styles.icon} />
            <input type="text" value={uniqueNumber} readOnly />
          </div>
        </CopyToClipboard>
        <p className={styles.bottomText}>원활한 서비스 이용을 위해 고유번호를 꼭 기억해주세요!</p>

        {/* 개인/기업에 따라 버튼 텍스트 변경 */}
        <button type="submit" onClick={onNext} className={styles.button}>
          {user?.userType == "개인" ? "메인 화면 가기" : "회사 소개 및 부산물 작성하기"}
        </button>

        <p className={styles.description}>고유번호는 무엇인가요?</p>
        <p className={styles.text}>
          특정 객체 식별을 위해 부여되는 번호 및 문자열을 의미합니다.{"\n"}
          고유번호를 통해 기업 사칭 방지가 가능하며, 서비스에 대한 신뢰도가 향상됩니다.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default UniqueNumber;
