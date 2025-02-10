import React, { useState } from "react";
import styles from "./RegisterByproduct.module.scss";
import InputBox from "@/components/common/InputBox/InputBox";
import UnitBigDropdown from "@/components/common/UnitDropdown/UnitBigDropdown";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import FormButton from "@/components/common/FormButton/FormButton";

const RegisterByproduct: React.FC = () => {
  const [formData, setFormData] = useState({
    byproductName: "",
    byproductAmount: "",
    byproductPrice: "",
  });
  const [selectedUnit, setSelectedUnit] = useState("");

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.formTitle}>공급 가능한 부산물 등록하기</h2>
        <p className={styles.formSubtitle}>
          회사에서 공급 가능한 부산물 자원을 입력해주세요.
        </p>
        <div className={styles.inputGroup}>
          <InputBox
            type="text"
            placeholder="부산물 자원 이름"
            value={formData.byproductName}
            onChange={(e) => handleChange("byproductName", e.target.value)}
          />
          <InputBox
            type="text"
            placeholder="부산물량(단위 없이 입력해주세요.)"
            value={formData.byproductAmount}
            onChange={(e) => handleChange("byproductName", e.target.value)}
          />
          <UnitBigDropdown value={selectedUnit} onChange={setSelectedUnit} />

          <InputBox
            type="text"
            placeholder="총 판매 가격"
            value={formData.byproductPrice}
            onChange={(e) => handleChange("byproductPrice", e.target.value)}
          />
          <textarea
            className={styles.textarea}
            placeholder="부산물 성분 분석(자세하게 적을수록 정확한 매칭이 가능합니다.)"
          />
        </div>
        <p className={styles.bottomText}>
          등록한 정보는 마이페이지에서 확인할 수 있어요.
        </p>
        <FormButton type="submit" className={styles.formButton}>
          공급 가능한 부산물 자원 등록하기
        </FormButton>
      </div>
      <Footer />
    </>
  );
};

export default RegisterByproduct;
