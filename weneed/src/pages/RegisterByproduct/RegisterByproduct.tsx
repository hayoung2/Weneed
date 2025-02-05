import React, { useState } from "react";
import styles from "./RegisterByproduct.module.scss";
import InputBox from "@/components/common/InputBox/InputBox";
import UnitBigDropdown from "@/components/common/UnitDropdown/UnitBigDropdown";

const RegisterByproduct: React.FC = () => {
  const [formData, setFormData] = useState({ byproductName: "" });
  const [selectedUnit, setSelectedUnit] = useState("");

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>공급 가능한 부산물 입력하기</h2>
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
        <UnitBigDropdown value={selectedUnit} onChange={setSelectedUnit} />
        <textarea
          className={styles.textarea}
          placeholder="부산물 성분 분석(자세하게 적을수록 정확한 매칭이 가능합니다.)"
        />
      </div>
    </div>
  );
};

export default RegisterByproduct;
