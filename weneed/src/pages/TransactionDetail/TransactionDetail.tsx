import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom"
import styles from "./TransactionDetail.module.scss";
import TransactionContainer from "@/components/common/TransactionContainer/TransactionContainer";
import EditButton from "@/components/common/EditButton/EditButton";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import Pagination from "@/components/atoms/Pagination/Pagination";
import { useAuth } from '@/components/contexts/AuthContext';

const API_URL = "http://localhost:5000/api";

const TransactionDetail = () => {
  const [showTransactionLog, setShowTransactionLog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams(); 
  const [byproduct, setByproduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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
    }
  }, [id]);

  if (loading) return <p className={styles.loading}>로딩 중...</p>;
  if (!byproduct) return <p className={styles.error}>해당 정보를 찾을 수 없습니다.</p>;


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
          <h2 className={styles.title}>{byproduct.companyInfo?.companyName || "회사명 없음"}</h2>
        </div>

   
        <p className={styles.sectionTitle}>기본정보</p>
        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>연락처</span>
            <span className={styles.value}>
              {byproduct.companyInfo?.contactNumber}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>팩스</span>
            <span className={styles.value}>
              {byproduct.companyInfo?.faxNumber}
            </span>
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
            <span className={styles.value}>{byproduct.companyInfo?.industryType || "-"}</span>
          </div>
        </div>

        <p className={styles.sectionTitle}>상세정보</p>
        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>사업자등록번호</span>
            <span className={styles.value}>{byproduct.companyInfo?.businessNumber || "-"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>업종</span>
            <span className={styles.value}>{byproduct.companyInfo?.industryType || "-"}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>매출액</span>
            <span className={styles.value}>{byproduct.companyInfo?.revenue || "정보 없음"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>홈페이지 링크</span>
            <span className={styles.value}>{byproduct.companyInfo?.companyAddress || "주소 없음"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>위니드 등록일자</span>
            <span className={styles.value}>{byproduct.companyInfo?.createdAt || "-"}</span>
          </div>
        </div>


        <div className={styles.transactions}>
        <TransactionContainer title="부산물 종류" text2={byproduct.availableByproductName} />
          <TransactionContainer title="총 거래 횟수" text2="" />
          <TransactionContainer title="총 거래성공률" text2="" />
          <TransactionContainer title="부산물량 월별 평균" text2={byproduct.availableByproductAmount} text3={byproduct.availableByproductUnit} />
          <TransactionContainer title="오늘의 부산물량" text2="거래 가능" />
        </div>

        <div className={styles.textareaContainer}>
          <p className={styles.sectionTitle}>부산물 성분 분석</p>
          <div className={styles.textareaWrapper}>
            <p>{byproduct.availableByproductAnalysis}</p>
          </div>
        </div>


        <p className={styles.notice}>{user?.userType=="개인"?"*개인 회원은 기업과의 거래가 제한됩니다." :""}</p>
        <div className={styles.buttonWrapper} >
          <EditButton type="submit" onClick={user?.userType=="개인" ? () => {}: handleTransactionClick}  style={user?.userType === "개인" ? { backgroundColor: "#b0b0b0"}:{}}>
           이 기업과 거래하기
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
