import { useState } from "react";
import styles from "./TransactionDetail.module.scss";
import TransactionContainer from "@/components/common/TransactionContainer/TransactionContainer";
import EditButton from "@/components/common/EditButton/EditButton";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import Pagination from "@/components/atoms/Pagination/Pagination";

const TransactionDetail = () => {
  const [showTransactionLog, setShowTransactionLog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 예시 데이터
  const companyName = "위니드 주식회사";
  const contact = "010-1234-5678";
  const fax = "02-9876-5432";
  const representative = "김대표";
  const address = "서울특별시 강남구 테헤란로 123";
  const businessType = "제조업";

    const transactions = [
      { id: 1, title: "첫번째 거래 일지", date: "2024.02.08", status: "거래 완료" },
      { id: 2, title: "첫번째 거래 일지", date: "2024.02.14", status: "거래 예정" },
      { id: 3, title: "첫번째 거래 일지", date: "2024.02.17", status: "거래 취소" },
      { id: 4, title: "두번째 거래 일지", date: "2024.02.18", status: "거래 완료" },
      { id: 5, title: "두번째 거래 일지", date: "2024.02.19", status: "거래 예정" },
      { id: 6, title: "두번째 거래 일지", date: "2024.02.20", status: "거래 취소" },
      { id: 7, title: "세번째 거래 일지", date: "2024.02.21", status: "거래 완료" },
      { id: 8, title: "세번째 거래 일지", date: "2024.02.22", status: "거래 예정" },
      { id: 9, title: "세번째 거래 일지", date: "2024.02.23", status: "거래 취소" },
      { id: 10, title: "네번째 거래 일지", date: "2024.02.24", status: "거래 완료" },
      { id: 11, title: "네번째 거래 일지", date: "2024.02.25", status: "거래 예정" },
      { id: 12, title: "네번째 거래 일지", date: "2024.02.26", status: "거래 취소" },
      { id: 13, title: "다섯번째 거래 일지", date: "2024.02.27", status: "거래 완료" },
    ];
  

  const handleTransactionClick = () => {
    setShowTransactionLog(true);
  };

  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
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
              {transactions.filter((tx) => tx.status === "거래 완료").length}번 거래를 완료했어요!
            </p>

            {/*리스트*/}
            <div className={styles.transactionList}>
              {currentItems.map((transaction) => (
                <div key={transaction.id} className={styles.transactionItem}>
                  <div className={styles.transactionInfo}>
                    <p className={styles.transactionTitle}>{transaction.title}</p>
                    <p className={styles.transactionDate}>{transaction.date}</p>
                  </div>
                  <span
                    className={`${styles.status} ${
                      transaction.status === "거래 완료"
                        ? styles.completed
                        : transaction.status === "거래 예정"
                        ? styles.scheduled
                        : styles.canceled
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              ))}
            </div>

            {/*페이지네이션*/}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <Pagination totalPages={totalPages} activePage={currentPage} onPageClick={handlePageClick} />
              </div>
            )}

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
