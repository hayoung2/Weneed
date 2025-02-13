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

  const formatDateTime = (dateTimeString: string) => {
    const dateObj = new Date(dateTimeString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
    const day = String(dateObj.getDate()).padStart(2, "0"); // 일
    const hour = String(dateObj.getHours()).padStart(2, "0"); // 시
    const minute = String(dateObj.getMinutes()).padStart(2, "0"); // 분
    return { year, month, day, hour, minute };
  };

  const { year, month, day, hour, minute } = formatDateTime(transaction.transactionDate);

  return (
    <>
      <Header />
      {/* ✅ 거래 상태 배너 */}
      <div className={styles.bannerWrapper}>
        <div className={`${styles.banner} ${statusColors[transaction.status]}`}>
          <p>{statusMessages[transaction.status]}</p>
        </div>
      </div>
      <div className = {styles.titleWrapper}>
        <h2 className={styles.title}>거래 정보서</h2>
        <p className={styles.description}>
          아래의 정보는 위니드 고객센터에서 중개한 내용을 기반으로 입력되었습니다.
        </p>
      </div>

      {/* ✅ 거래 예정 시간 & 거래 장소 */}
      <div className={styles.inputGroup}>
        <div className={styles.inputBox}>
          <label>거래 예정 시간</label>
          <div className={styles.dateInput}>
            <input type="text" value={year} readOnly />
            <span>년</span>
            <input type="text" value={month} readOnly />
            <span>월</span>
            <input type="text" value={day} readOnly />
            <span>일</span>
            <input type="text" value={hour} readOnly />
            <span>시</span>
            <input type="text" value={minute} readOnly />
            <span>분</span>
          </div>
          <div className={styles.inputBox}>
            <label>거래 장소</label>
            <input type="text" value={transaction.transactionLocation} readOnly />
          </div>
        </div>
         <div className={styles.fullInputBox}>
          <label>거래 예정 주소</label>
          <input type="text" value="경상북도 위니드 산업로 514-6" readOnly />
        </div>
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

        <div style={{ borderTop: "1px solid #e0e0e0", margin: "20px 0" }} />

        {/* ✅ 회사 정보 */}

        <div className={styles.companyInfoWrappper}>
          <p className={styles.title}>{companyInfo.companyName}</p>

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

      <Footer />
    </>
  );
};

export default TransactionView;
