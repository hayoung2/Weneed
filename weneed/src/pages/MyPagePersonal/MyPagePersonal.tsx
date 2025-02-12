import styles from '@/pages/MyPagePersonal/MyPagePersonal.module.scss';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import CardSmallList from '@/components/common/CardList/CardSmallList/CardSmallList';
import CardLeftOverDetail from '@/components/common/CardList/CardLeftOverDetail/CardLeftOverDetail';
import { useAuth } from "@/components/contexts/AuthContext";

// const favoriteCompanies = [
//   { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 1", amount: "일평균 100kg" },
//   { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 2", amount: "일평균 100kg" },
//   { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" },
//   { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" },
//   { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" },
//   { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" },
//   { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" },
//   { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" }
// ];
// const leftoverInfo = [
//   { title: "메추리알 껍데기", 
//     amount: "일평균 100kg", 
//     price: 300000, 
//     description: "부산물 성분 부산물 명칭 부산물 설명 위니드 위니드 위니드위니드 위니드 위니니니드드드드드드드 부산물 설명 부산물 명칭 부산물 위니드" }
// ];

export const MyPagePersonal = () => {
  
const { user } = useAuth();

  return (
    <>
      <Header />
      <div className={styles.myPagePersonal}>
        <h2 className={styles.title}>{user?.companyName}</h2>
        <p className={styles.subtitle}>{user?.uniqueId} | 개인 회원</p>

        <h3 className={styles.sectionTitle}>즐겨찾기 등록된 기업</h3>
        {/* <CardSmallList cards={favoriteCompanies} />

        <CardLeftOverDetail {...leftoverInfo[0]} /> */}
      </div>
      <Footer />
    </>
  );
};

export default MyPagePersonal;
