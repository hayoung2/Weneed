import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/contexts/AuthContext";
import CardLeftOverDetailList from "@/components/common/CardList/CardLeftOverDetailList/CardLeftOverDetailList";
import CardResourceDetailList from "@/components/common/CardList/CardResourceDetailList/CardResourceDetailList";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Mypage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [availableByproducts, setAvailableByproducts] = useState<any[]>([]);
  const [neededByproducts, setNeededByproducts] = useState<any[]>([]);

  // ✅ 사용자 정보 가져오기
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

      // ✅ 공급 가능한 부산물 정보 가져오기
      axios
        .get(`${API_URL}/available-byproducts/${user.uniqueId}`)
        .then((response) => {
          setAvailableByproducts(response.data);
        })
        .catch((error) => {
          console.error("공급 가능한 부산물 불러오기 오류:", error);
        });

      // ✅ 필요 자원 정보 가져오기
      axios
        .get(`${API_URL}/needed-byproducts/${user.uniqueId}`)
        .then((response) => {
          setNeededByproducts(response.data);
        })
        .catch((error) => {
          console.error("필요 자원 불러오기 오류:", error);
        });
    }
  }, [user?.uniqueId]);

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

        {/* 회사 정보 */}
        <div className={styles.infoGrid}>
          <div className={styles.row}>
            <span className={styles.label}>연락처</span>
            <span className={styles.value}>{companyInfo?.contactNumber || "-"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>팩스</span>
            <span className={styles.value}>{companyInfo?.faxNumber || "-"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>대표자명</span>
            <span className={styles.value}>{companyInfo?.representativeName || "-"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>주소</span>
            <span className={styles.value}>{companyInfo?.companyAddress || "-"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>업종</span>
            <span className={styles.value}>{companyInfo?.industryType || "-"}</span>
          </div>
        </div>

        {/* 공급 가능한 부산물 */}
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

        {/* 필요 자원 */}
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
      <Footer />
    </>
  );
};

export default Mypage;
