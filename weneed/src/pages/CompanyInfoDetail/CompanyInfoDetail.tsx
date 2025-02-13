import React from "react";
import styles from "./CompanyInfoDetail.module.scss";
import TransactionContainer from "@/components/common/TransactionContainer/TransactionContainer";
import EditButton from "@/components/common/EditButton/EditButton";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const CompanyInfoDetail: React.FC = () => {
  const location = useLocation();
  const company = location.state;
  const byproducts = company?.byproducts || []; 
  const latestByproduct = byproducts.length > 0 ? byproducts[0] : null; 
  const navigate = useNavigate(); 
  const handleCreateTransaction = () => {
    if (!company) {
      console.error("Error: Company data is missing!");
      return;
    }
  
    navigate("/createTransaction", { state: { company } });
  };
  
  return (
    <>
      <Header />
      <div className={styles.container}>
        <p className={styles.title}>{company.companyName}</p>

        {/* 기본정보 */}
        <p className={styles.sectionTitle}>기본정보</p>
        <div className={styles.infoGrid}>
          <div className={styles.row}>
            <span className={styles.label}>연락처</span>
            <span
              className={styles.value}
            >{company.contactNumber}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>팩스</span>
            <span
              className={styles.value}
            >
              {company.faxNumber}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>대표자명</span>
            <span className={styles.value}>{company.representativeName}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>주소</span>
            <span className={styles.value}>{company.companyAddress}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>업종</span>
            <span className={styles.value}>{company.industryType}</span>
          </div>
        </div>

        <div className={styles.detailSection}>
          <p className={styles.sectionTitle}>상세정보</p>
          <div className={styles.details}>
            <div className={styles.row}>
              <span className={styles.labelLong}>사업자등록번호</span>
              <span className={styles.value}>{company.businessNumber}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.labelLong}>업종</span>
              <span className={styles.value}>{company.industryType}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.labelLong}>매출액</span>
              <span className={styles.value}>{company.revenue}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.labelLong}>홈페이지 링크</span>
              <span className={styles.value}>{company.websiteLink}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.labelLong}>위니드 등록일자</span>
              <span className={styles.value}>{company.createdAt}</span>
            </div>
          </div>
        </div>

        <div className={styles.transactions}>
          <TransactionContainer title="부산물 종류" text2={latestByproduct?.availableByproductName || "정보 없음"}/>
          <TransactionContainer title="총거래횟수" text2="" />
          <TransactionContainer title="총 거래성공률" text2="" />
          <TransactionContainer
            title="부산물량 월별 평균"
            text2={latestByproduct?.availableByproductAmount || ' 없음 '}
            text3={latestByproduct?.availableByproductUnit || '없음'}
          />
          <TransactionContainer title="오늘의 부산물량" text2="거래 가능" />
        </div>

        <div className={styles.textareaContainer}>
          <p className={styles.sectionTitle}>부산물 성분 분석</p>
          <div className={styles.textareaWrapper}>
            <p>{latestByproduct?.availableByproductAnalysis}</p>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <EditButton
            type="submit"
            className={styles.tradeButton}
            onClick={handleCreateTransaction}
          >
           거래 내역 페이지로 바로가기
          </EditButton>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CompanyInfoDetail;
