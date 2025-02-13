import React from 'react';
import logo from "@/assets/icons/logo.svg";
import styles from "@/components/common/Header/Header.module.scss";
import { useAuth } from '@/components/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    if (user?.userType === "개인") {
      alert("❌ 개인 회원은 마이페이지에 접근할 수 없습니다.");
      return;
    }
    navigate("/mypage");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href='/'><img src={logo} alt="Logo" width={150} height={35} className={styles.img} /></a>
      </div>
      <div className={styles.menu}>
        <a href='/search'> <p className={styles.boldText}>검색 & <span>AI 매칭</span></p></a>
        <a href='/introduction'><p className={styles.boldText}>with 위니드</p></a>

        {user ? (
          <>
            <p className={styles.basicText} onClick={() => { logout(); navigate('/'); }}>
              로그아웃
            </p>
            <button className={styles.mypageButton}onClick={handleMyPageClick}>
              마이페이지
            </button>
          </>
        ) : (
          <>
            <a href='/login'><p className={styles.basicText}>로그인</p></a>
            <a href='/signup'><p className={styles.basicText}>회원가입</p></a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
