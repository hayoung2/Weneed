import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TransactionDetail.module.scss";
import TransactionContainer from "@/components/common/TransactionContainer/TransactionContainer";
import EditButton from "@/components/common/EditButton/EditButton";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import { useAuth } from '@/components/contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const API_URL = "http://43.201.160.49:5000/api";
interface Transaction {
  id: number;
  uniqueId: string;
  status: "거래 요청" | "입금 요청" | "거래 확정" | "거래 완료" | "거래 취소";
  transactionDate: string;
}
const TransactionDetail = () => {
  const { id } = useParams();
  const [byproduct, setByproduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [successRate, setSuccessRate] = useState<number>(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/transactionDetail/${id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("불러온 부산물 데이터:", data);
            setByproduct(data);
          })
          .catch((error) => console.error("부산물 데이터 불러오기 오류:", error))
          .finally(() => setLoading(false));
          fetch(`${API_URL}/transactions/${id}`)
          .then((res) => res.json())
          .then((transactions: Transaction[]) => {  // ✅ 여기서 타입을 지정
            const transactionCountMap = new Map<string, number>();
        
            transactions.forEach((transaction: Transaction) => { // ✅ 타입 명시
              transactionCountMap.set(transaction.uniqueId, (transactionCountMap.get(transaction.uniqueId) || 0) + 1);
            });
        
            setTotalTransactions(transactions.length);
        
            const successCount = transactions.filter((transaction: Transaction) => transaction.status === "거래 완료").length;
            const successRateValue = transactions.length > 0 ? (successCount / transactions.length) * 100 : 0;
            
            setSuccessRate(parseFloat(successRateValue.toFixed(2))); // ✅ 숫자로 변환
          })
          .catch((error) => console.error("거래 데이터 불러오기 오류:", error));
    }
  }, [id]);

  if (loading) return <p className={styles.loading}>로딩 중...</p>;
  if (!byproduct) return <p className={styles.error}>해당 정보를 찾을 수 없습니다.</p>;

  const handleTransactionClick = () => {
    if (user?.userType === "기업") {
      navigate("/createTransaction", {
        state: {
          company: byproduct.companyInfo
        }
      });
    }
  };

  return (
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{byproduct.companyInfo?.companyName || "회사명 없음"}</h2>
          </div>

          <p className={styles.sectionTitle}>기본정보</p>
          <div className={styles.info}>
            <div className={styles.row}>
              <span className={styles.label}>연락처</span>
              <span className={styles.value}>{byproduct.companyInfo?.contactNumber}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>팩스</span>
              <span className={styles.value}>{byproduct.companyInfo?.faxNumber}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>대표자명</span>
              <span className={styles.value}>{byproduct.companyInfo?.representativeName || "정보 없음"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>주소</span>
              <span className={styles.value}>{byproduct.companyInfo?.companyAddress || "주소 없음"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>업종</span>
              <span className={styles.value}>{byproduct.companyInfo?.industryType || "정보 없음"}</span>
            </div>
          </div>

          <p className={styles.sectionTitle}>상세정보</p>
          <div className={styles.info}>
            <div className={styles.row}>
              <span className={styles.label}>사업자등록번호</span>
              <span className={styles.value}>{byproduct.companyInfo?.businessNumber || "정보 없음"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>업종</span>
              <span className={styles.value}>{byproduct.companyInfo?.industryType || "정보 없음"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>매출액</span>
              <span className={styles.value}>{byproduct.companyInfo?.revenue || "정보 없음"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>홈페이지 링크</span>
              <span className={styles.value}>{byproduct.companyInfo?.companyAddress || "정보 없음"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>위니드 등록일자</span>
              <span className={styles.value}>{byproduct.companyInfo?.createdAt || "정보 없음"}</span>
            </div>
          </div>

          <div className={styles.transactions}>
            <TransactionContainer title="부산물 종류" text2={byproduct.availableByproductName} />
            <TransactionContainer title="총 거래 횟수" text2={totalTransactions.toString()} />
            <TransactionContainer title="총 거래성공률" text2={`${successRate}%`} />
            <TransactionContainer title="부산물량 월별 평균" text2={byproduct.availableByproductAmount} text3={byproduct.availableByproductUnit} />
            <TransactionContainer title="오늘의 부산물량" text2="거래 가능" />
          </div>

          <div className={styles.textareaContainer}>
            <p className={styles.sectionTitle}>부산물 성분 분석</p>
            <div className={styles.textareaWrapper}>
              <p>{byproduct.availableByproductAnalysis}</p>
            </div>
          </div>

          <p className={styles.notice}>{user?.userType === "개인" ? "*개인 회원은 기업과의 거래가 제한됩니다." : ""}</p>
          <div className={styles.buttonWrapper}>
            <EditButton type="submit" onClick={user?.userType === "개인" ? () => {} : handleTransactionClick} style={user?.userType === "개인" ? { backgroundColor: "#b0b0b0" } : {}}>
              이 기업과 거래하기
            </EditButton>
          </div>
        </div>

        <Footer />
      </div>
  );
};

export default TransactionDetail;
