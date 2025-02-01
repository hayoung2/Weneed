import React from "react";
import styles from "./Footer.module.scss";
import logo from "@/assets/icons/logo.svg";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>

      <div className={styles.left}>
      <img src={logo} alt="Logo" width={100} height={30} className={styles.img} />
        <div className={styles.textGroup}>
          <p className={styles.basicText}>서울시 성동구 뚝섬로1나길5 헤이그라운드</p>
          <p className={styles.basicText}>Email:withweneed@weneed.net  Tel: 02-6495-0180</p>
          <div>
            <a href="https://transparent-pomelo-dd9.notion.site/18c3c563527f802bab78eab5e3b0b835?pvs=4"><p className={styles.secondText}>이용약관</p></a>
            <span><a href="https://transparent-pomelo-dd9.notion.site/18c3c563527f8023a12cfe23897a3757?pvs=4">개인정보처리방침</a></span> 
          <p className={styles.secondText}>@Copyright 2025.weneed. All Rights Reserved.</p></div>
        </div>
      </div>


      <div className={styles.right}>
        <div>
          <p className={styles.title}>With 위니드</p>
          <a href="/introduction"><p className={styles.content}>기업 소개</p></a>
        </div>
        
        <div>
          <p className={styles.title}>필요 자원</p>
          <p className={styles.content}>필요 자원 등록하기</p>
          <p className={styles.content}>탐색하기</p>
        </div>
        
        <div>
          <p className={styles.title}>공급 자원</p>
          <p className={styles.content}>공급 자원 등록하기</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
