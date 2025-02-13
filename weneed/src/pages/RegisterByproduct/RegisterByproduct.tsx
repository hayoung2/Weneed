import React, { useState } from "react";
import axios from "axios";
import styles from "./RegisterByproduct.module.scss";
import InputBox from "@/components/common/InputBox/InputBox";
import UnitBigDropdown from "@/components/common/UnitDropdown/UnitBigDropdown";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import FormButton from "@/components/common/FormButton/FormButton";
import { useAuth } from "@/components/contexts/AuthContext"; 
import { useNavigate } from 'react-router-dom';

const RegisterByproduct: React.FC = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    availableByproductName: "",
    availableByproductAmount: "",
    availableByproductPrice: "",
    availableByproductUnit: "",
    availableByproductAnalysis: "",
    uniqueId: user?.uniqueId || "", 
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.availableByproductName || !formData.availableByproductAmount || !formData.availableByproductUnit || !formData.availableByproductPrice) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
     await axios.post("http://localhost:5000/api/availablebyproduct", formData);
      alert("공급 가능한 부산물이 성공적으로 등록되었습니다.");
      navigate('/'); 
    } catch (error) {
      console.error("공급 가능한 부산물 등록 오류:", error);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };
  // 데이터마다 모델을 만들기 ,interface , 컴포넌트 이름 보자마자 생각하게 만들기, 

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
            value={formData.availableByproductName}
            onChange={(e) => handleChange("availableByproductName", e.target.value)}
          />
          <InputBox
            type="text"
            placeholder="부산물량(단위 없이 입력해주세요.)"
            value={formData.availableByproductAmount}
            onChange={(e) => handleChange("availableByproductAmount", e.target.value)}
          />
          <UnitBigDropdown
            value={formData.availableByproductUnit}
            onChange={(unit) => handleChange("availableByproductUnit", unit)}
          />
          <InputBox
            type="text"
            placeholder="총 판매 가격"
            value={formData.availableByproductPrice}
            onChange={(e) => handleChange("availableByproductPrice", e.target.value)}
          />
          <textarea
            className={styles.textarea}
            placeholder="부산물 성분 분석(자세하게 적을수록 정확한 매칭이 가능합니다.)"
            value={formData.availableByproductAnalysis}
            onChange={(e) => handleChange("availableByproductAnalysis", e.target.value)}
          />
        </div>
        <p className={styles.bottomText}>등록한 정보는 마이페이지에서 확인할 수 있어요.</p>
        <FormButton type="submit" className={styles.formButton} onClick={handleSubmit}>
          공급 가능한 부산물 자원 등록하기
        </FormButton>
      </div>
      <Footer />
    </>
  );
};

export default RegisterByproduct;
