import React, { useState } from "react";
import styles from "./RegisterResource.module.scss";
import InputBox from "@/components/common/InputBox/InputBox";
import UnitBigDropdown from "@/components/common/UnitDropdown/UnitBigDropdown";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import EditButton from "@/components/common/EditButton/EditButton";

const RegisterResource: React.FC = () => {
    const [formData, setFormData] = useState({ 
      resourceName: "", 
      resourceAmount: "" 
    });
  const [selectedUnit, setSelectedUnit] = useState("");

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.formTitle}>필요 자원 등록하기</h2>
        <p className={styles.formSubtitle}>
          회사에서 필요한 자원을 입력해주세요.
        </p>
        <div className={styles.inputGroup}>
          <InputBox
            type="text"
            placeholder="자원 이름"
            value={formData.resourceName}
            onChange={(e) => handleChange("byproductName", e.target.value)}
          />
       
       <InputBox
            type="text"
            placeholder="부산물량(단위 없이 입력해주세요.)"
            value={formData.resourceAmount}
            onChange={(e) => handleChange("byproductName", e.target.value)}
          />
          <UnitBigDropdown 
          value={selectedUnit} onChange={setSelectedUnit} />
             <textarea
            className={styles.textarea}
            placeholder="사용 용도"
          />
        </div>
        <p className={styles.bottomText}>
          등록한 정보는 마이페이지에서 확인할 수 있어요.
        </p>
        <EditButton type="submit" className={styles.formButton}>
          필요한 자원 등록하기
        </EditButton>
      </div>
      <Footer />
    </>
  );
};

export default RegisterResource;
