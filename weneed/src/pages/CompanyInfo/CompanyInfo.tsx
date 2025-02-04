import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CompanyInfo.module.scss";
import InputBox from "@/components/common/InputBox/InputBox";
import EditButton from "@/components/common/EditButton/EditButton";
import Header from "@/components/common/Header/Header";
import step1Icon from "@/assets/images/step1.svg";
import step2Icon from "@/assets/images/step2.svg";
import step3Icon from "@/assets/images/step3.svg";
import axios from "axios";

interface CompanyInfoPageProps {
  companyName: string;
  businessNumber: string;
  representative: string;
  step: number;
  onSkip: () => void | Promise<void>;
}

const CompanyInfo: React.FC<CompanyInfoPageProps> = ({
                                                       companyName,
                                                       businessNumber,
                                                       representative,
                                                       step,
                                                       onSkip,
                                                     }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(step);
  const [formData, setFormData] = useState({
    companyName: "",
    businessNumber: "",
    representative: "",
    industry: "",
    address: "",
    phone: "",
    website: "",
    email: "",
    description: "",
    additionalInfo: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      companyName,
      businessNumber,
      representative,
    }));
  }, [companyName, businessNumber, representative]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0); // 다음 단계로 넘어갈 때 화면 최상단으로 이동
    } else {
      saveCompanyInfo(); // 마지막 단계에서 데이터 저장
    }
  };

  const saveCompanyInfo = async () => {
    try {
      await axios.post('http://localhost:5000/api/company-info', {
        ...formData,
        companyName,
        businessNumber,
        representative,
      });
      alert('회사 정보가 저장되었습니다.');
      navigate('/success'); // 성공 페이지로 이동 (예시)
    } catch (error) {
      console.error('회사 정보 저장 실패:', error);
      alert('정보 저장에 실패했습니다.');
    }
  };

  return (
      <div>
        <Header />
        <div className={styles.container}>
          <h1 className={styles.title}>위니드를 이용하기 위한 기본단계에요.</h1>
          <p className={styles.subtitle}>각 단계는 건너뛰기가 가능해요.</p>

          <div className={styles.steps}>
            {[1, 2, 3].map((stepNumber) => (
                <div
                    key={stepNumber}
                    className={`${styles.step} ${currentStep === stepNumber ? styles.activeStep : styles.inactiveStep}`}
                >
                  <div className={styles.stepCircle}>
                    <img
                        src={
                          stepNumber === 1 ? step1Icon
                              : stepNumber === 2 ? step2Icon
                                  : step3Icon
                        }
                        className={currentStep === stepNumber ? styles.activeIcon : styles.inactiveIcon}
                    />
                  </div>
                  <p className={styles.stepLabel}>
                    {stepNumber === 1 ? "회사소개 작성하기"
                        : stepNumber === 2 ? "공급 가능한 부산물 선택하기"
                            : "필요한 자원 선택하기"}
                  </p>
                </div>
            ))}
          </div>

          <div className={styles.formContainer}>
            {currentStep === 1 && (
                <>
                  <h2 className={styles.formTitle}>회사소개 작성하기</h2>
                  <p className={styles.formSubtitle}>
                    위니드 서비스 이용을 위해 정확하게 작성해주세요.
                  </p>
                  <div className={styles.inputGroup}>
                    <InputBox
                        type="text"
                        placeholder="회사명"
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                    />
                    <InputBox
                        type="text"
                        placeholder="사업자등록번호"
                        value={formData.businessNumber}
                        onChange={(e) => handleChange("businessNumber", e.target.value)}
                    />
                    <InputBox
                        type="text"
                        placeholder="대표자명"
                        value={formData.representative}
                        onChange={(e) => handleChange("representative", e.target.value)}
                    />
                    <InputBox
                        type="text"
                        placeholder="산업분류"
                        value={formData.industry}
                        onChange={(e) => handleChange("industry", e.target.value)}
                    />
                    <InputBox
                        type="text"
                        placeholder="주소"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                    />
                    <InputBox
                        type="text"
                        placeholder="전화번호"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    <InputBox
                        type="text"
                        placeholder="웹사이트"
                        value={formData.website}
                        onChange={(e) => handleChange("website", e.target.value)}
                    />
                    <InputBox
                        type="text"
                        placeholder="이메일"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <InputBox
                        type="text"
                        placeholder="회사 설명"
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                    <InputBox
                        type="text"
                        placeholder="추가 정보"
                        value={formData.additionalInfo}
                        onChange={(e) => handleChange("additionalInfo", e.target.value)}
                    />
                  </div>
                </>
            )}

            {currentStep === 2 && (
                <>
                  <h2 className={styles.formTitle}>공급 가능한 부산물 선택하기</h2>
                  <p className={styles.formSubtitle}>
                    공급 가능한 부산물을 입력해주세요.
                  </p>
                  {/* 공급 가능한 부산물 입력 필드 추가 */}
                </>
            )}

            {currentStep === 3 && (
                <>
                  <h2 className={styles.formTitle}>필요한 자원 선택하기</h2>
                  <p className={styles.formSubtitle}>필요한 자원을 선택해주세요.</p>
                  {/* 필요한 자원 입력 필드 추가 */}
                </>
            )}

            <div className={styles.buttonContainer}>
              <EditButton
                  type="button"
                  className={styles.loginButton}
                  onClick={handleNextStep}
              >
                {currentStep === 3 ? "완료" : "다음 단계 넘어가기"}
              </EditButton>
              <p className={styles.skipButton} onClick={onSkip}>
                건너뛰기
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CompanyInfo;
