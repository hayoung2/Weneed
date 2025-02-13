import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TransactionView.module.scss";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";

const statusMessages: { [key: string]: { message: string; colorClass: string } } = {
  "입금 요청": {
    message: "2024년 2월 14일까지 입금 완료 부탁드립니다.\n궁금한 사항이 있으시면 옆의 연락처로 연락주세요.",
    colorClass: styles.paymentRequested,
  },
  "거래 취소": {
    message: "거래가 취소되었습니다.\n궁금한 사항이 있으시면 옆의 연락처로 연락주세요.",
    colorClass: styles.canceled,
  },
  "거래 요청": {
    message: "컨설턴트가 현재 거래 요청 중입니다.\n궁금한 사항이 있으시면 옆의 연락처로 연락주세요.",
    colorClass: styles.requested,
  },
  "거래 완료": {
    message: "거래가 완료되었습니다.\n궁금한 사항이 있으시면 옆의 연락처로 연락주세요.",
    colorClass: styles.completed,
  },
  "거래 확정": {
    message: "거래가 확정되었습니다!\n궁금한 사항이 있으시면 옆의 연락처로 연락주세요.",
    colorClass: styles.confirmed,
  },
};



const TransactionView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transaction, companyInfo } = location.state || {};

  if (!transaction || !companyInfo) {
    return (
      <div className={styles.errorPage}>
        <h2>잘못된 접근입니다.</h2>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* ✅ 거래 상태 배너 */}
        <div className={`${styles.banner} ${statusMessages[transaction.status]?.colorClass}`} style={{width:'100%'}}>
          <div>
          <p>{statusMessages[transaction.status]?.message}</p>
          </div>

          <div className={styles.cardWrapper} >
            <div className={styles.card}>
              <div className={styles.header}>
                <span className={styles.highlight}>위 니 드</span> 
                <span className = {styles.nameInfo}>전담 컨설턴트</span>
              </div>
              <div className={styles.info}>
                <div className={styles.row}>
                  <span className={styles.label}>팩스</span> <span className={styles.value}>02-6495-0180</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>전화번호</span> <span className={styles.value}>02-6495-0180</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>이메일</span> <span className={styles.value}>withweneed@weneed.net</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.containerMainbody}>
      <h1 className={styles.title}>거래 정보서</h1>
      <p className={styles.description}>아래의 정보는 위니드 고객센터에서 중개한 내용을 기반으로 입력되었습니다.</p>

      {/* 거래 예정 시간 및 장소 */}
      <div className={styles.section}>
        <label className={styles.label}>거래 예정 시간</label>
        <div className={styles.timeInputs}>
          <input type="text" defaultValue="2025" className={styles.inputSmall} /> 년
          <input type="text" defaultValue="02" className={styles.inputSmall} /> 월
          <input type="text" defaultValue="14" className={styles.inputSmall} /> 일
          <input type="text" defaultValue="10" className={styles.inputSmall} /> 시
          <input type="text" defaultValue="00" className={styles.inputSmall} /> 분
        </div>

        <label className={styles.label}>거래 장소</label>
        <input type="text" defaultValue="마산역 인근화물승강장" className={styles.input} />
      </div>

      {/* 거래 예정 주소 */}
      <div className={styles.section}>
        <label className={styles.label}>거래 예정 주소</label>
        <input type="text" defaultValue="경상남도 마산로 화물로 531-6" className={styles.input} />
      </div>

      {/* 부산물 정보 */}
      <div className={styles.section}>
        <label className={styles.label}>부산물 명</label>
        <input type="text" defaultValue={transaction.byproductName} className={styles.input} />

        <label className={styles.label}>거래 부산물량 및 단위</label>
        <div className={styles.inlineGroup}>
          <input type="text" defaultValue= {transaction.byproductQuantity}className={styles.inputSmall} />
          <span className={styles.unit}>{transaction.byproductUnit}</span>
        </div>

        <label className={styles.label}>거래 가격</label>
        <div className={styles.inlineGroup}>
          <input type="text" defaultValue={transaction.transactionPrice}className={styles.inputSmall} />
          <span className={styles.unit}>원</span>
        </div>
      </div>

      {/* 계좌 정보 */}
      <div className={styles.section}>
        <label className={styles.label}>거래 계좌번호 및 예금주</label>
        <div className={styles.inlineGroup}>
          <input type="text" defaultValue="국민은행" className={styles.inputSmall} />
          <input type="text" defaultValue="1212-3123-213211" className={styles.input} />
          <button className={styles.button}>통장표</button>
        </div>
      </div>

      {/* 기타 내용 */}
      <div className={styles.section}>
        <label className={styles.label}>기타 내용</label>
        <textarea
          defaultValue={transaction.additionalNotes || "추가 내용 없음"}
          className={styles.textarea}
        />
      </div>
    </div>

    

        <div style={{ borderTop: "1px solid #e0e0e0", margin: "3% 0" }} />

        {/*가장 하단의 회사 정보*/}
        <div className={styles.companyInfoWrappper}>
          <p className={styles.title}>{companyInfo.companyName || "-"}</p>

          <div className={styles.companyInfo}>
            <div className={styles.row}>
              <span className={styles.label2}>대표자명</span>
              <span className={styles.value}> {companyInfo.representativeName || "-"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label2}>주소</span>
              <span className={styles.value}>{companyInfo.companyAddress || "-"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label2}>업종</span>
              <span className={styles.value}>{companyInfo.industryType || "-"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label2}>연락처</span>
              <span className={styles.value}>{companyInfo.contactNumber || "-"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label2}>팩스</span>
              <span className={styles.value}>{companyInfo.faxNumber || "-"}</span>
            </div>
          </div>
          </div>


      
      </div>
      <Footer />
    </>
  );
};

export default TransactionView;
