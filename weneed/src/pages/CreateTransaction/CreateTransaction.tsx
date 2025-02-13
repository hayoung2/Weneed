import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CreateTransaction.module.scss";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import EditButton from "@/components/common/EditButton/EditButton";
import YearBox from "@/components/common/YearBox/YearBox";
import MonthBox from "@/components/common/MonthBox/MonthBox";
import InputBox from "@/components/common/InputBox/InputBox";
import UnitDropdown from "@/components/common/UnitDropdown/UnitDropdown";
import { useAuth } from '@/components/contexts/AuthContext';

const API_URL = "http://localhost:5000/api"; // 백엔드 API 주소
const CreateTransaction: React.FC = () => {
    const location = useLocation();
    const company = location.state?.company || null; // ✅ company 정보 받아오기
    const navigate = useNavigate();
    const { user } = useAuth(); // ✅ 현재 로그인한 유저 정보 가져오기
  
    // 상태 관리
    const [transactionDateTime, setTransactionDateTime] = useState<string[]>(["", "", "", "", ""]);
    const [transactionLocation, setTransactionLocation] = useState<string>("");
    const [transactionPrice, setTransactionPrice] = useState<string>("");
    const [byproductName, setByproductName] = useState<string>("");
    const [byproductAmount, setByproductAmount] = useState<string>("");
    const [byproductUnit, setByproductUnit] = useState<string>("kg");
    const [transactionNotes, setTransactionNotes] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
    if (!company) {
      console.error("Error: No company data received!");
      return (
        <>
          <Header />
          <div className={styles.container}>
            <h2 className={styles.title}>거래 예정서 작성</h2>
            <p className={styles.error}>회사 정보를 찾을 수 없습니다.</p>
          </div>
          <Footer />
        </>
      );
    }
  
    // 거래 정보 저장 API 호출
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitting) return; // 중복 요청 방지
      setIsSubmitting(true);
  
      const transactionData = {
        uniqueId: user?.uniqueId, // 로그인한 사용자 ID
        contactNumber: company.contactNumber,
        transactionDate: `${transactionDateTime[0]}-${transactionDateTime[1]}-${transactionDateTime[2]} ${transactionDateTime[3]}:${transactionDateTime[4]}`, // YYYY-MM-DD HH:mm 형식
        byproductName,
        byproductQuantity: parseFloat(byproductAmount),
        byproductUnit,
        transactionPrice: parseInt(transactionPrice, 10),
        additionalNotes: transactionNotes,
        status: "거래 요청",
      };
  
      try {
        const response = await fetch(`${API_URL}/create-transaction`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionData),
        });
  
        const result = await response.json();
        if (result.success) {
          alert("거래 요청이 성공적으로 등록되었습니다.");
          navigate("/mypage"); // ✅ 성공 시 마이페이지로 이동
        } else {
          alert("거래 요청 등록에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("거래 요청 오류:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsSubmitting(false);
      }
    };
  
  const handleTransactionDateChange = (index: number, value: string) => {
    const updatedDateTime = [...transactionDateTime]; // 기존 배열 복사
    updatedDateTime[index] = value; // 특정 인덱스 값 변경
    setTransactionDateTime(updatedDateTime); // 변경된 배열 업데이트
  };


  if (!company) {
    console.error("Error: No company data received!");
    return (
      <>
        <Header />
        <div className={styles.container}>
          <h2 className={styles.title}>거래 예정서 작성</h2>
          <p className={styles.error}>회사 정보를 찾을 수 없습니다.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <p className={styles.title}>{company.companyName}</p>

        {/* 기본정보 */}
        <div className={styles.infoGrid}>
          <div className={styles.row}>
            <span className={styles.label2}>연락처</span>
            <span className={styles.value}>{company.contactNumber}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label2}>팩스</span>
            <span className={styles.value}>{company.faxNumber}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label2}>대표자명</span>
            <span className={styles.value}>{company.representativeName}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label2}>주소</span>
            <span className={styles.value}>{company.companyAddress}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label2}>업종</span>
            <span className={styles.value}>{company.industryType}</span>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #e0e0e0", margin: "20px 0" }} />


        <h2 className={styles.highlightTitle}>거래 예정서 작성</h2>
        <p className={styles.description}>
          거래 예정서를 바탕으로 위니드 고객센터가 원활한 중개를 도와드려요.
        </p>
        
        {/* 폼으로 묶어서 제출 처리 */}
        <form onSubmit={handleSubmit}>
          {/* 거래 일지 작성 */}
          <div className={styles.inputGroup}>
            <div className={styles.inputBox}>
              <p className={styles.label}>거래 희망 시간</p>
              <div className={styles.dateInput}>
                <YearBox
                  placeholder="YYYY"
                  value={transactionDateTime[0]}
                  onChange={(e) => handleTransactionDateChange(0, e.target.value)}
                />
                <p className={styles.dateText}>년</p>
                <MonthBox
                  placeholder="MM"
                  value={transactionDateTime[1]}
                  onChange={(e) => handleTransactionDateChange(1, e.target.value)}
                />
                <p className={styles.dateText}>월</p>
                <MonthBox
                  placeholder="DD"
                  value={transactionDateTime[2]}
                  onChange={(e) => handleTransactionDateChange(2, e.target.value)}
                />
                <p className={styles.dateText} style={{ marginRight: "5%" }}>
                  일
                </p>
                <MonthBox
                  placeholder="HH"
                  value={transactionDateTime[3]}
                  onChange={(e) => handleTransactionDateChange(3, e.target.value)}
                />
                <p className={styles.dateText}>시</p>
                <MonthBox
                  placeholder="mm"
                  value={transactionDateTime[4]}
                  onChange={(e) => handleTransactionDateChange(4, e.target.value)}
                />
                <p className={styles.dateText}>분</p>
              </div>
            </div>

            <div className={styles.inputBox} style={{ paddingLeft: "2%" }}>
              <p className={styles.label3} style={{ paddingRight: "8%" }}>
                거래 희망 장소
              </p>
              <div className={styles.personInput}>
                <InputBox
                  type="text"
                  placeholder="거래를 희망하는 장소를 입력해주세요."
                  value={transactionLocation}
                  onChange={(e) => setTransactionLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* 거래 부산물 정보 */}
          <div className={styles.inputGroup} style={{ gap: "5%" }}>
            <div className={styles.inputBox}>
              <p className={styles.label}>거래 부산물 명</p>
              <div className={styles.unitContainer}>
                <InputBox
                  type="text"
                  placeholder="거래할 부산물 이름을 입력해주세요."
                  value={byproductName}
                  onChange={(e) => setByproductName(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputBox}>
              <p className={styles.label}>거래 부산물량 및 단위</p>
              <div className={styles.unitContainer}>
                <InputBox
                  type="text"
                  placeholder="거래할 부산물량의 숫자를 입력해주세요."
                  value={byproductAmount}
                  onChange={(e) => setByproductAmount(e.target.value)}
                />

                <div className={styles.dropdownWrapper}>
                  <UnitDropdown value={byproductUnit} onChange={setByproductUnit} />
                </div>
              </div>
            </div>

            <div className={styles.inputBox}>
              <p className={styles.label}>거래 가격</p>
              <div className={styles.inputBoxs}>
                <InputBox
                  type="text"
                  placeholder="거래 가격을 입력해주세요."
                  value={transactionPrice}
                  onChange={(e) => setTransactionPrice(e.target.value)}
                />
                <p className={styles.dateText} style={{ marginLeft: "3%" }}>
                  원
                </p>
              </div>
            </div>
          </div>

          <div className={styles.inputBox} style={{ paddingRight: "3%" }}>
          <p className={styles.label1}>기타 내용</p>

          <textarea
            className={styles.textarea}
            placeholder="기타 내용을 입력해주세요."
            value={transactionNotes}
            onChange={(e) => setTransactionNotes(e.target.value)}
          />
        </div>


          {/* 제출 버튼 */}
          <div className={styles.buttonWrapper}>
            <EditButton 
            type="submit"
            onClick={() => navigate("/mypage")}
            >거래 예정서 제출</EditButton>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateTransaction;
