import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CreateTransaction.module.scss";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import EditButton from "@/components/common/EditButton/EditButton";

const CreateTransaction: React.FC = () => {
  const location = useLocation();
  const company = location.state?.company || null; 

  if (!company) {
    console.error("Error: No company data received!");
    return (
      <>
        <Header />
        <div className={styles.container}>
          <h2 className={styles.title}>거래 예정서 작성</h2>
          <p className={styles.error}>회사 정보를 찾을 수 없습니다.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>거래 예정서 작성</h2>

        {/* 기본정보 표시 */}
        <div className={styles.infoGrid}>
          <div className={styles.row}><span className={styles.label}>회사명</span><span className={styles.value}>{company.companyName}</span></div>
          <div className={styles.row}><span className={styles.label}>연락처</span><span className={styles.value}>{company.contactNumber}</span></div>
          <div className={styles.row}><span className={styles.label}>대표자명</span><span className={styles.value}>{company.representativeName}</span></div>
        </div>

        {/* 버튼 */}
        <div className={styles.buttonWrapper}>
          <EditButton type="submit">거래 예정서 제출</EditButton>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateTransaction;
