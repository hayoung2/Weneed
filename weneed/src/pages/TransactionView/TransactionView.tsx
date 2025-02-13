import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TransactionView.module.scss";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";

const statusMessages: { [key: string]: string } = {
  "입금 요청": "2024년 2월 14일까지 입금 완료 부탁드립니다.\n궁금한 사항이 있으시면 옆의 연락처로 연락주세요.",
  "거래 취소": "거래가 취소되었습니다.\n궁금한 사항이 있으시면 옆의 연락처로 연락주세요.",
  "거래 요청": "컨설턴트가 현재 거래 요청 중입니다.\n궁금한 사항이 있으시면 옆의 연락처로 연락주세요.",
  "거래 완료": "2024년 2월 14일까지 입금 완료 부탁드립니다.\n궁금한 사항이 있으시면 옆의 연락처로 연락주세요.",
  "거래 확정": "거래가 확정되었습니다!\n궁금한 사항이 있으시면 옆의 연락처로 연락주세요.",
};

const statusColors: { [key: string]: string } = {
  "입금 요청": styles.paymentRequested,
  "거래 확정": styles.confirmed,
  "거래 완료": styles.completed,
  "거래 요청": styles.requested,
  "거래 취소": styles.canceled,
};

const TransactionView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transaction, companyInfo } = location.state || {};

  if (!transaction || !companyInfo) {
    return (
      <div className={styles.errorPage}>
        <h2>잘못된 접근입니다.</h2>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* ✅ 거래 상태 배너 */}
        <div className={`${styles.banner} ${statusColors[transaction.status]}`}>
          <p>{statusMessages[transaction.status]}</p>
        </div>

        {/* ✅ 거래 상세 정보 */}
        <div className={styles.transactionInfo}>
          <h3>거래 상세 정보</h3>
          <p><strong>거래 품목:</strong> {transaction.byproductName}</p>
          <p><strong>거래 수량:</strong> {transaction.byproductQuantity} {transaction.byproductUnit}</p>
          <p><strong>거래 가격:</strong> {transaction.transactionPrice}원</p>
          <p><strong>거래 일자:</strong> {transaction.transactionDate}</p>
          <p><strong>거래 상태:</strong> {transaction.status}</p>
          <p><strong>추가 정보:</strong> {transaction.additionalNotes || "없음"}</p>
        </div>

        <div style={{ borderTop: "1px solid #e0e0e0", margin: "3% 0" }} />

        {/*가장 하단의 회사 정보*/}
        <div className={styles.companyInfoWrappper}>
          <p className={styles.title}>{companyInfo.companyName || "-"}</p>

          <div className={styles.companyInfo}>
            <div className={styles.row}>
              <span className={styles.label2}>대표자명</span>
              <span className={styles.value}> {companyInfo.representativeName || "-"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label2}>주소</span>
              <span className={styles.value}>{companyInfo.companyAddress || "-"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label2}>업종</span>
              <span className={styles.value}>{companyInfo.industryType || "-"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label2}>연락처</span>
              <span className={styles.value}>{companyInfo.contactNumber || "-"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label2}>팩스</span>
              <span className={styles.value}>{companyInfo.faxNumber || "-"}</span>
            </div>
          </div>
          </div>


      
      </div>
      <Footer />
    </>
  );
};

export default TransactionView;
