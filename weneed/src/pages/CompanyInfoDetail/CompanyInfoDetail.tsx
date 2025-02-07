import React, { useState } from "react";
import styles from "./CompanyInfoDetail.module.scss";
import TransactionContainer from "@/components/common/TransactionContainer/TransactionContainer";
import EditButton from "@/components/common/EditButton/EditButton";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";

const CompanyInfoDetail: React.FC = () => {
  const [isTrading, setIsTrading] = useState(false);

  // 예시 데이터
  const companyName = "마늘먹인";
  const contact = "010-1234-5678";
  const fax = "02-9876-5432";
  const representative = "김대표";
  const address = "서울특별시 강남구 테헤란로 123";
  const businessType = "제조업";
  const registrationNumber = "123-45-67890";
  const revenue = "100억";
  const website = "www.manul.com";
  const joinDate = "2023-01-01";

  return (
    <>
      <Header />
      <div className={styles.container}>
        <p className={styles.title}>{companyName}</p>

        {/* 기본정보 */}
        <p className={styles.sectionTitle}>기본정보</p>
        <div className={styles.infoGrid}>
          <div className={styles.row}>
            <span className={styles.label}>연락처</span>
            <span
              className={styles.value}
              style={{ color: isTrading ? "#4a4a4a" : "#828282" }}
            >
              {isTrading
                ? contact
                : "이 기업과 거래를 결정하면 연락처를 알려드려요."}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>팩스</span>
            <span
              className={styles.value}
              style={{ color: isTrading ? "#4a4a4a" : "#828282" }}
            >
              {isTrading ? fax : "이 기업과 거래를 결정하면 팩스를 알려드려요."}
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

        {/* 상세정보 */}
        <div className={styles.detailSection}>
          <p className={styles.sectionTitle}>상세정보</p>
          <div className={styles.details}>
            <div className={styles.row}>
              <span className={styles.labelLong}>사업자등록번호</span>
              <span className={styles.value}>{registrationNumber}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.labelLong}>업종</span>
              <span className={styles.value}>{businessType}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.labelLong}>매출액</span>
              <span className={styles.value}>{revenue}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.labelLong}>홈페이지 링크</span>
              <span className={styles.value}>{website}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.labelLong}>위니드 등록일자</span>
              <span className={styles.value}>{joinDate}</span>
            </div>
          </div>
        </div>

        {/* 거래 정보 */}
        <div className={styles.transactions}>
          <TransactionContainer title="부산물 종류" text2="메추리알" />
          <TransactionContainer title="총거래횟수" text2="" />
          <TransactionContainer title="총 거래성공률" text2="" />
          <TransactionContainer
            title="부산물량 월별 평균"
            text2="100"
            text3="kg"
          />
          <TransactionContainer title="오늘의 부산물량" text2="거래 가능" />
        </div>

        {/* 부산물 성분 분석 및 textarea */}
        <div className={styles.textareaContainer}>
          <p className={styles.sectionTitle}>부산물 성분 분석</p>
          <div className={styles.textareaWrapper}>
            <textarea
              className={styles.textarea}
              placeholder="추가 정보를 입력하세요."
            />
          </div>
        </div>

        {/* 거래 버튼 */}
        <div className={styles.buttonWrapper}>
          <EditButton
            type="submit"
            className={styles.tradeButton}
            onClick={() => setIsTrading(!isTrading)}
          >
            {isTrading ? "거래 내역 페이지로 바로가기" : "이 기업과 거래하기"}
          </EditButton>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CompanyInfoDetail;
