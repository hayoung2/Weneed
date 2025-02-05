import { useState } from "react";
import styles from "./TransactionDetail.module.scss";
import TransactionContainer from "@/components/common/TransactionContainer/TransactionContainer";
import EditButton from "@/components/common/EditButton/EditButton";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";

const TransactionDetail = () => {
  const [showTransactionLog, setShowTransactionLog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // 예시 데이터
  const companyName = "위니드 주식회사";
  const contact = "010-1234-5678";
  const fax = "02-9876-5432";
  const representative = "김대표";
  const address = "서울특별시 강남구 테헤란로 123";
  const businessType = "제조업";

  const transactions = [
    { id: 1, title: "부산물 A", subtitle: "500kg", unit: "kg" },
    { id: 2, title: "부산물 B", subtitle: "200개", unit: "개" },
  ];

  const handleTransactionClick = () => {
    setShowTransactionLog(true);
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{companyName}</h2>
          <button className={styles.companyInfoButton}>회사소개 보러가기</button>
        </div>

   
        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>연락처</span>
            <span className={`${styles.value} ${!showTransactionLog && styles.hiddenContact}`}>
              {showTransactionLog ? contact : "이 회사와 거래를 결정하면 연락처를 알려드려요."}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>팩스</span>
            <span className={`${styles.value} ${!showTransactionLog && styles.hiddenContact}`}>
              {showTransactionLog ? fax : "이 회사와 거래를 결정하면 팩스 정보를 알려드려요."}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>대표자명</span>
            <span className={styles.value}>{representative}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>주소</span>
            <span className={styles.value}>{address}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>업종</span>
            <span className={styles.value}>{businessType}</span>
          </div>
        </div>

   
        <div className={styles.transactions}>
        <TransactionContainer title="부산물 종류" text2="메추리알" />
          <TransactionContainer title="우리 회사와의 거래 횟수" text2="" />
          <TransactionContainer title="우리 회사와의 거래성공률" text2="" />
          <TransactionContainer title="부산물량 월별 평균" text2="100" text3="kg" />
          <TransactionContainer title="오늘의 거래 여부" text2="거래 가능" />
        </div>


        <p className={styles.notice}>    {showTransactionLog ? "반드시 통화로 거래 협의 후에 거래일지를 작성해주세요!" : "회사와 거래하기 버튼을 클릭하면 연락처 정보를 알 수 있어요."}</p>
        <div className={styles.buttonWrapper}>
          <EditButton type="submit" onClick={handleTransactionClick}>
            {showTransactionLog ? "거래일지 작성하기" : "이 회사와 거래하기"}
          </EditButton>
        </div>
      </div>


      {showTransactionLog && (
        <div className={styles.transactionLogWrapper}>
          <div className={styles.transactionLog}>
            <h3 className={styles.logTitle}>위니드 거래일지</h3>
            <p className={styles.logSummary}>
              {transactions.length}개의 거래일지 중{" "}
              {transactions.filter((tx) => tx.subtitle).length}번 거래를 완료했어요!
            </p>

            {transactions.length === 0 && (
              <div className={styles.noTransactionsContainer}>
                <p className={styles.noTransactions}>작성한 거래일지가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TransactionDetail;
