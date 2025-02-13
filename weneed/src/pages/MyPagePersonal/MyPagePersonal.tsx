import styles from '@/pages/MyPagePersonal/MyPagePersonal.module.scss';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import { useAuth } from "@/components/contexts/AuthContext";


export const MyPagePersonal = () => {
  
const { user } = useAuth();

  return (
    <>
      <Header />
      <div className={styles.myPagePersonal}>
        <h2 className={styles.title}>{user?.companyName}</h2>
        <p className={styles.subtitle}>{user?.uniqueId} | 개인 회원</p>
      </div>
      <Footer />
    </>
  );
};

export default MyPagePersonal;
