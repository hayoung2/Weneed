import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CompanyInfo.module.scss";
import InputBox from "@/components/common/InputBox/InputBox";
import EditButton from "@/components/common/EditButton/EditButton";
import Header from "@/components/common/Header/Header";
import step1Icon from "@/assets/images/step1.svg";
import step2Icon from "@/assets/images/step2.svg";
import step3Icon from "@/assets/images/step3.svg";
import UnitBigDropdown from "@/components/common/UnitDropdown/UnitBigDropdown";
import Footer from "@/components/common/Footer/Footer";

import { useAuth } from "@/components/contexts/AuthContext";

interface CompanyInfoPageProps {
  companyName: string;
  businessNumber: string;
  representative: string;
  uniqueId: string;
  step: number;
  onSkip: () => void | Promise<void>;
}

const CompanyInfoPage: React.FC<CompanyInfoPageProps> = ({
  companyName,
  businessNumber,
  representative,
  uniqueId,
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
    mainProducts: "",
    revenue: "",
    contactNumber: "",
    faxNumber: "",
    companyAddress: "",
    websiteLink: "",
    availableByproductName: "",
    availableByproductAmount: "",
    availableByproductUnit: "",
    availableByproductAnalysis: "",
    neededByproductName: "",
    neededByproductAmount: "",
    neededByproductUnit: "",
    neededByproductProperty: "",
    uniqueId: "",
  });
  const { user } = useAuth();
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      companyName,
      businessNumber,
      representative,
      uniqueId: user?.uniqueId || "-",
    }));
  }, [companyName, businessNumber, representative, user?.uniqueId]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      submitCompanyInfo();
    }
  };

  const submitCompanyInfo = async () => {
    formData.uniqueId = uniqueId;
    console.log("Submitting company info:", formData);
    setFormData((prev) => ({
      ...prev,
      uniqueId: user?.uniqueId || "-",
    }));
    try {
      const response = await fetch("http://43.201.160.49:5000/api/company-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        alert("저장 완료");
        navigate("/");
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
      }
    } catch (error) {
      console.error("서버 오류:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>위니드를 이용하기 위한 기본단계에요.</h1>
        <p className={styles.subtitle1}>각 단계는 건너뛰기가 가능해요.</p>
        <p className={styles.subtitle2}>
          단, 건너뛸 경우 서비스 이용이 원활하지 않을 수 있습니다.
        </p>
        <div className={styles.steps}>
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`${styles.step} ${currentStep === stepNumber ? styles.activeStep : styles.inactiveStep}`}
            >
              <div className={styles.stepCircle}>
                <img
                  src={
                    stepNumber === 1
                      ? step1Icon
                      : stepNumber === 2
                        ? step2Icon
                        : step3Icon
                  }
                  className={
                    currentStep === stepNumber
                      ? styles.activeIcon
                      : styles.inactiveIcon
                  }
                />
              </div>
              <p className={styles.stepLabel}>
                {stepNumber === 1
                  ? "회사소개 작성하기"
                  : stepNumber === 2
                    ? "공급 가능한 부산물 선택하기"
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
                  onChange={(e) =>
                    handleChange("businessNumber", e.target.value)
                  }
                />
                <InputBox
                  type="text"
                  placeholder="대표자명"
                  value={formData.representative}
                  onChange={(e) =>
                    handleChange("representative", e.target.value)
                  }
                />
                <InputBox
                  type="text"
                  placeholder="산업분류"
                  value={formData.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                />
                <InputBox
                  type="text"
                  placeholder="주요 생산품"
                  value={formData.mainProducts} // 수정된 부분
                  onChange={(e) => handleChange("mainProducts", e.target.value)} // 수정된 부분
                />
                <InputBox
                  type="text"
                  placeholder="매출액"
                  value={formData.revenue}
                  onChange={(e) => handleChange("revenue", e.target.value)}
                />
                <InputBox
                  type="text"
                  placeholder="연락처"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    handleChange("contactNumber", e.target.value)
                  }
                />
                <InputBox
                  type="text"
                  placeholder="팩스"
                  value={formData.faxNumber}
                  onChange={(e) => handleChange("faxNumber", e.target.value)}
                />
                <InputBox
                  type="text"
                  placeholder="회사 주소"
                  value={formData.companyAddress}
                  onChange={(e) =>
                    handleChange("companyAddress", e.target.value)
                  }
                />
                <InputBox
                  type="text"
                  placeholder="홈페이지 링크"
                  value={formData.websiteLink}
                  onChange={(e) => {
                    handleChange("websiteLink", e.target.value);
                    handleChange("uniqueId", user?.uniqueId || "-");
                  }}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2 className={styles.formTitle}>공급 가능한 부산물 입력하기</h2>
              <p className={styles.formSubtitle}>
                회사에서 공급 가능한 부산물 자원을 입력해주세요.
              </p>
              <div className={styles.inputGroup}>
                <InputBox
                  type="text"
                  placeholder="부산물 자원 이름"
                  value={formData.availableByproductName} // 변경된 부분
                  onChange={(e) =>
                    handleChange("availableByproductName", e.target.value)
                  } // 변경된 부분
                />
                <InputBox
                  type="text"
                  placeholder="부산물량(단위 없이 입력해주세요.)"
                  value={formData.availableByproductAmount} // 변경된 부분
                  onChange={(e) =>
                    handleChange("availableByproductAmount", e.target.value)
                  } // 변경된 부분
                />

                <UnitBigDropdown
                  value={formData.availableByproductUnit} // 변경된 부분
                  onChange={(unit) =>
                    handleChange("availableByproductUnit", unit)
                  } // 변경된 부분
                />
                <textarea
                  className={styles.textarea}
                  placeholder="부산물 성분 분석"
                  value={formData.availableByproductAnalysis} // 변경된 부분
                  onChange={(e) =>
                    handleChange("availableByproductAnalysis", e.target.value)
                  } // 변경된 부분
                />
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h2 className={styles.formTitle}>필요한 자원 입력하기</h2>
              <p className={styles.formSubtitle}>
                회사가 필요로 하는 자원을 입력해주세요.
              </p>
              <div className={styles.inputGroup}>
                <InputBox
                  type="text"
                  placeholder="부산물 자원 이름"
                  value={formData.neededByproductName} // 변경된 부분
                  onChange={(e) =>
                    handleChange("neededByproductName", e.target.value)
                  } // 변경된 부분
                />
                <InputBox
                  type="text"
                  placeholder="부산물량(단위 없이 입력해주세요.)"
                  value={formData.neededByproductAmount} // 변경된 부분
                  onChange={(e) =>
                    handleChange("neededByproductAmount", e.target.value)
                  } // 변경된 부분
                />
                <UnitBigDropdown
                  value={formData.neededByproductUnit} // 변경된 부분
                  onChange={(unit) => handleChange("neededByproductUnit", unit)} // 변경된 부분
                />
                <textarea
                  className={styles.textarea}
                  placeholder="사용 용도"
                  value={formData.neededByproductProperty} // 변경된 부분
                  onChange={(e) =>
                    handleChange("neededByproductProperty", e.target.value)
                  } 
                />
              </div>
            </>
          )}

          <div className={styles.buttonContainer}>
            <EditButton
              type="submit"
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
      <Footer />
    </div>
  );
};

export default CompanyInfoPage;
