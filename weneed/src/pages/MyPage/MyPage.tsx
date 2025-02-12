import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/contexts/AuthContext";
import CardSmallList from "@/components/common/CardList/CardSmallList/CardSmallList";
import CardLeftOverDetail from "@/components/common/CardList/CardLeftOverDetail/CardLeftOverDetail";
import CardLeftOverDetailList from "@/components/common/CardList/CardLeftOverDetailList/CardLeftOverDetailList";
import CardResourceDetailList from "@/components/common/CardList/CardResourceDetailList/CardResourceDetailList";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import axios from "axios";

const Mypage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const favoriteCompanies = [
    {
      location: "부산 영도구 남항동",
      company: "HJ 중공업",
      title: "메추리알 껍데기 1",
      amount: "일평균 100kg",
    },
    {
      location: "부산 영도구 남항동",
      company: "HJ 중공업",
      title: "메추리알 껍데기 2",
      amount: "일평균 100kg",
    },
    {
      location: "부산 영도구 남항동",
      company: "HJ 중공업",
      title: "메추리알 껍데기 3",
      amount: "일평균 100kg",
    },
    {
      location: "부산 영도구 남항동",
      company: "HJ 중공업",
      title: "메추리알 껍데기 3",
      amount: "일평균 100kg",
    },
    {
      location: "부산 영도구 남항동",
      company: "HJ 중공업",
      title: "메추리알 껍데기 3",
      amount: "일평균 100kg",
    },
    {
      location: "부산 영도구 남항동",
      company: "HJ 중공업",
      title: "메추리알 껍데기 3",
      amount: "일평균 100kg",
    },
    {
      location: "부산 영도구 남항동",
      company: "HJ 중공업",
      title: "메추리알 껍데기 3",
      amount: "일평균 100kg",
    },
    {
      location: "부산 영도구 남항동",
      company: "HJ 중공업",
      title: "메추리알 껍데기 3",
      amount: "일평균 100kg",
    },
  ];

  const leftoverInfo = [
    {
      title: "메추리알 껍데기",
      amount: "일평균 100kg",
      price: 300000,
      description:
        "부산물 성분 부산물 명칭 부산물 설명 위니드 위니드 아니 왜 안나와는건가요 나와라 위니드위니드 위니드 위니니니드드드드드드드 부산물 설명 부산물 명칭 부산물 위니드",
    },
    {
      title: "메추리알 껍데기",
      amount: "일평균 100kg",
      price: 300000,
      description:
        "부산물 성분 부산물 명칭 부산물 설명 위니드 위니드 위니드위니드 위니드 위니니니드드드드드드드 부산물 설명 부산물 명칭 부산물 위니드",
    },
    {
      title: "메추리알 껍데기",
      amount: "일평균 100kg",
      price: 300000,
      description:
        "부산물 성분 부산물 명칭 부산물 설명 위니드 위니드 위니드위니드 위니드 위니니니드드드드드드드 부산물 설명 부산물 명칭 부산물 위니드",
    },
    {
      title: "메추리알 껍데기",
      amount: "일평균 100kg",
      price: 300000,
      description:
        "부산물 성분 부산물 명칭 부산물 설명 위니드 위니드 위니드위니드 위니드 위니니니드드드드드드드 부산물 설명 부산물 명칭 부산물 위니드",
    },
  ];

  const resourceInfo = [
    {
      title: "메추리알 껍데기",
      amount: "일평균 100kg",
      description:
        "부산물 성분 부산물 명칭 부산물 설명 위니드 위니드 위니드위니드 위니드 위니니니드드드드드드드 부산물 설명 부산물 명칭 부산물 위니드",
    },
    {
      title: "메추리알 껍데기",
      amount: "일평균 100kg",
      description:
        "부산물 성분 부산물 명칭 부산물 설명 위니드 위니드 위니드위니드 위니드 위니니니드드드드드드드 부산물 설명 부산물 명칭 부산물 위니드",
    },
    {
      title: "메추리알 껍데기",
      amount: "일평균 100kg",
      description:
        "부산물 성분 부산물 명칭 부산물 설명 위니드 위니드 위니드위니드 위니드 위니니니드드드드드드드 부산물 설명 부산물 명칭 부산물 위니드",
    },
  ];

  useEffect(() => {
    if (user?.uniqueId) {
      axios
        .get(`http://localhost:5000/api/user-info/${user.uniqueId}`)
        .then((response) => {
          setCompanyInfo(response.data);
        })
        .catch((error) => {
          console.error("사용자 정보 불러오기 오류:", error);
        });
    }
  }, [user?.uniqueId]);

  return (
    <>
    <Header />
    <div className={styles.container}>
      {/* 회사 이름 & 소개 버튼 */}
      <div className={styles.header}>
        <h2 className={styles.companyName}>
          {companyInfo?.companyName}
        </h2>

      </div>
      <div>
        <p className={styles.userText}>{user?.uniqueId} | 기업 회원</p>
      </div>

      {/* 회사 정보 */}
      <div className={styles.infoGrid}>
        <div className={styles.row}>
          <span className={styles.label}>연락처</span>
          <span className={styles.value}>
            {companyInfo?.contactNumber || "-"}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>팩스</span>
          <span className={styles.value}>{companyInfo?.faxNumber || "-"}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>대표자명</span>
          <span className={styles.value}>
            {companyInfo?.representativeName || "-"}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>주소</span>
          <span className={styles.value}>
            {companyInfo?.companyAddress || "-"}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>업종</span>
          <span className={styles.value}>
            {companyInfo?.industryType || "-"}
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionTitle}>우리 기업과 최근 거래한 기업</p>
        </div>
        {/* <div><CardSmallList cards={favoriteCompanies} /></div> */}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionTitle}>즐겨찾기 등록된 기업</p>
        </div>
        {/* <div><CardSmallList cards={favoriteCompanies} /></div> */}
      </div>

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
        <div>        <CardLeftOverDetailList cards={leftoverInfo} /></div>

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
       <div> <CardResourceDetailList cards={resourceInfo} /></div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Mypage;
