import React from "react";
import styles from "./RegisterResource.module.scss";

const RegisterResource: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>회사소개 작성하기</h2>
      <p className={styles.formSubtitle}>
        위니드 서비스 이용을 위해 정확하게 작성해주세요.
      </p>
    </div>
  );
};

export default RegisterResource;
