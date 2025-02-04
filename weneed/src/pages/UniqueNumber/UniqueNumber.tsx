import { useState } from "react";
import styles from "./UniqueNumber.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chartIcon from "@/assets/icons/copy.svg"; 
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";


interface UniqueNumberProps {
    companyName: string;
    businessNumber: string;
    representative: string;
    uniqueNumber: string;
    onNext?: () => void | Promise<void>;  
  }
  
const UniqueNumber: React.FC<UniqueNumberProps> = ({ companyName, uniqueNumber, onNext }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <Header />
    <div className={styles.container}>
      <p className={styles.title}>
        <span className={styles.blueText}>{companyName}</span>의 고유번호
      </p>

      <CopyToClipboard text={uniqueNumber} onCopy={() => setCopied(true)}>
        <div className={styles.inputContainer}>
        <img src={chartIcon} alt="chart icon" className={styles.icon} />
          <input type="text" value={uniqueNumber} readOnly />
        </div>
      </CopyToClipboard>
      
      <p className={styles.description}>고유번호는 무엇인가요? <br /> 고유번호를 기억해주세요!</p>

      <button type="submit" onClick={onNext} className={styles.button}>회사 소개 및 부산물 작성하기</button>
    </div>
    <Footer />
    </div>
  );
};

export default UniqueNumber;
