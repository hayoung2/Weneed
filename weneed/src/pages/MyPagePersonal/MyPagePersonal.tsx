import styles from '@/pages/MyPagePersonal/MyPagePersonal.module.scss';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import CardSmallList from '@/components/common/CardList/CardSmallList/CardSmallList'

const favoriteCompanies = [
  { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 1", amount: "일평균 100kg" },
  { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 2", amount: "일평균 100kg" },
  { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" },
  { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" },
  { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" },
  { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" },
  { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" },
  { location: "부산 영도구 남항동", company: "HJ 중공업", title: "메추리알 껍데기 3", amount: "일평균 100kg" }
];

export const MyPagePersonal = () => {
  return (
    <>
      <Header />
      <div className={styles.myPagePersonal}>
        <h2 className={styles.title}>개인이름</h2>
        <p className={styles.subtitle}>고유번호 | 개인 회원</p>

        <h3 className={styles.sectionTitle}>즐겨찾기 등록된 기업</h3>
        <CardSmallList cards={favoriteCompanies} />
      </div>
      <Footer />
    </>
  );
};

export default MyPagePersonal;