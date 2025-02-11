import React, { useState } from "react";
import axios from "axios";
import styles from "./RegisterResource.module.scss";
import InputBox from "@/components/common/InputBox/InputBox";
import UnitBigDropdown from "@/components/common/UnitDropdown/UnitBigDropdown";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import EditButton from "@/components/common/EditButton/EditButton";
import { useAuth } from "@/components/contexts/AuthContext"; 
import { useNavigate } from 'react-router-dom';

const RegisterResource: React.FC = () => {
  const { user } = useAuth(); 
  const [formData, setFormData] = useState({
    neededByproductName: "", 
    neededByproductAmount: "",
    neededByproductUnit: "",
    uniqueId: user?.uniqueId || "", 
  });
  const navigate = useNavigate();
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.neededByproductName || !formData.neededByproductAmount || !formData.neededByproductUnit) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/needed-byproduct", formData);
      alert("필요 자원이 성공적으로 등록되었습니다.");
      navigate('/')
    } catch (error) {
      console.error("필요 자원 등록 오류:", error);
      alert("필요 자원 등록에 실패했습니다.");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.formTitle}>필요 자원 등록하기</h2>
        <p className={styles.formSubtitle}>회사에서 필요한 자원을 입력해주세요.</p>
        <div className={styles.inputGroup}>
          <InputBox
            type="text"
            placeholder="자원 이름"
            value={formData.neededByproductName}
            onChange={(e) => handleChange("neededByproductName", e.target.value)}
          />

          <InputBox
            type="text"
            placeholder="부산물량(단위 없이 입력해주세요.)"
            value={formData.neededByproductAmount}
            onChange={(e) => handleChange("neededByproductAmount", e.target.value)}
          />

          <UnitBigDropdown
            value={formData.neededByproductUnit}
            onChange={(unit) => handleChange("neededByproductUnit", unit)}
          />

          <textarea
            className={styles.textarea}
            placeholder="사용 용도"
            onChange={(e) => handleChange("usage", e.target.value)}
          />
        </div>

        <p className={styles.bottomText}>등록한 정보는 마이페이지에서 확인할 수 있어요.</p>
        <EditButton type="submit" className={styles.formButton} onClick={handleSubmit}>
          필요한 자원 등록하기
        </EditButton>
      </div>
      <Footer />
    </>
  );
};

export default RegisterResource;
