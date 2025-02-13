import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/contexts/AuthContext";
import CardLeftOverDetailList from "@/components/common/CardList/CardLeftOverDetailList/CardLeftOverDetailList";
import CardResourceDetailList from "@/components/common/CardList/CardResourceDetailList/CardResourceDetailList";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import axios from "axios";
import Pagination from "@/components/atoms/Pagination/Pagination";

const API_URL = "http://43.201.160.49:5000/api";

const Mypage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [availableByproducts, setAvailableByproducts] = useState<any[]>([]);
  const [neededByproducts, setNeededByproducts] = useState<any[]>([]);
  const [showTransactionLog] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<any[]>([]);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (user?.uniqueId) {
      axios
        .get(`${API_URL}/user-info/${user.uniqueId}`)
        .then((response) => {
          setCompanyInfo(response.data);
        })
        .catch((error) => {
          console.error("사용자 정보 불러오기 오류:", error);
        });
  
      axios
        .get(`${API_URL}/available-byproducts/${user.uniqueId}`)
        .then((response) => {
          setAvailableByproducts(response.data);
        })
        .catch((error) => {
          console.error("공급 가능한 부산물 불러오기 오류:", error);
        });
  
      axios
        .get(`${API_URL}/needed-byproducts/${user.uniqueId}`)
        .then((response) => {
          setNeededByproducts(response.data);
        })
        .catch((error) => {
          console.error("필요 자원 불러오기 오류:", error);
        });
  
      // 🔥 거래 내역을 임시 데이터로 설정
      const mockTransactions = [
        {
          id: 1,
          uniqueId: user.uniqueId,
          byproductName: "폐목재",
          transactionDate: "2024-02-14 15:30:00",
          byproductQuantity: 100,
          byproductUnit: "kg",
          transactionPrice: 50000,
          status: "거래 완료",
        },
        {
          id: 2,
          uniqueId: user.uniqueId,
          byproductName: "재활용 플라스틱",
          transactionDate: "2024-02-18 12:00:00",
          byproductQuantity: 200,
          byproductUnit: "kg",
          transactionPrice: 80000,
          status: "거래 요청",
        },
        {
          id: 3,
          uniqueId: user.uniqueId,
          byproductName: "금속 스크랩",
          transactionDate: "2024-02-20 10:45:00",
          byproductQuantity: 50,
          byproductUnit: "kg",
          transactionPrice: 30000,
          status: "입금 요청",
        },
        {
          id: 4,
          uniqueId: user.uniqueId,
          byproductName: "폐종이",
          transactionDate: "2024-02-22 17:15:00",
          byproductQuantity: 500,
          byproductUnit: "kg",
          transactionPrice: 120000,
          status: "거래 확정",
        },
        {
          id: 5,
          uniqueId: user.uniqueId,
          byproductName: "고철",
          transactionDate: "2024-02-24 09:30:00",
          byproductQuantity: 300,
          byproductUnit: "kg",
          transactionPrice: 90000,
          status: "거래 취소",
        },
      ];
  
      setTransactions(mockTransactions);
    }
  }, [user?.uniqueId]);
  

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleTransactionClick = (transaction: any) => {
    navigate("/transactionView", {
      state: { transaction, companyInfo },
    });
  };

  
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.companyName}>
            {companyInfo?.companyName || "회사명 없음"}
          </h2>
        </div>
        <div>
          <p className={styles.userText}>{user?.uniqueId} | 기업 회원</p>
        </div>

        {/* ✅ 공급 가능한 부산물 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionTitle}>우리 기업의 부산물 자원 및 양</p>
            <button
              className={styles.registerButton}
              onClick={() => navigate("/registerbyproduct")}
            >
              * 공급 가능한 부산물 자원 등록하기
            </button>
          </div>
          <CardLeftOverDetailList
            cards={availableByproducts.map((item) => ({
              title: item.availableByproductName,
              amount: `${item.availableByproductAmount} ${item.availableByproductUnit}`,
              price: item.availableByproductPrice,
              description: item.availableByproductAnalysis || "부산물 성분 분석 없음",
            }))}
          />
        </div>

        {/* ✅ 필요 자원 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionTitle}>우리 기업의 필요자원 및 양</p>
            <button
              className={styles.registerButton}
              onClick={() => navigate("/registerresource")}
            >
              * 필요자원 등록하기
            </button>
          </div>
          <CardResourceDetailList
            cards={neededByproducts.map((item) => ({
              title: item.neededByproductName,
              amount: `${item.neededByproductAmount} ${item.neededByproductUnit}`,
              description: item.neededByproductProperty || "추가 설명 없음",
            }))}
          />
        </div>
      </div>
        {/* ✅ 거래 일지 섹션 */}
        {showTransactionLog && (
          <div className={styles.transactionLogWrapper}>
            <div className={styles.transactionLog}>
              <h3 className={styles.logTitle}>위니드 거래일지</h3>
              <p className={styles.logSummary}>
                {transactions.length}개의 거래일지 중{" "}
                {transactions.filter((tx) => tx.status === "거래 완료").length}번 거래를 완료했어요!
              </p>

              {/* ✅ 거래 목록 */}
              <div className={styles.transactionList}>
                {currentItems.length > 0 ? (
                  currentItems.map((transaction) => (
                    <div key={transaction.id} className={styles.transactionItem} onClick={() => handleTransactionClick(transaction)}>
                      <div className={styles.transactionInfo}>
                        <p className={styles.transactionTitle}>{transaction.byproductName}</p>
                        <p className={styles.transactionDate}>{transaction.transactionDate}</p>
                        
                      </div>
                      <span
                        className={`${styles.status} ${
                          transaction.status === "입금 요청"
                            ? styles.paymentRequested
                            : transaction.status === "거래 확정"
                            ? styles.confirmed
                            : transaction.status === "거래 완료"
                            ? styles.completed
                            : transaction.status === "거래 요청"
                            ? styles.requested
                            : styles.canceled === "거래 취소"
                        }`}
                      >
                        {transaction.status}
                      </span>

                    </div>
                  ))
                ) : (
                  <div className={styles.noTransactionsContainer}>
                    <p className={styles.noTransactions}>작성한 거래일지가 없습니다.</p>
                  </div>
                )}
              </div>

              {/* ✅ 페이지네이션 */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <Pagination totalPages={totalPages} activePage={currentPage} onPageClick={handlePageClick} />
                </div>
              )}
            </div>
          </div>
        )}
      <div className = {styles.footerWrapper}>
        <Footer />
      </div>
    </>
  );
};

export default Mypage;
