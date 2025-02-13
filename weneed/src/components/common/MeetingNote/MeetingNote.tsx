import { useState } from "react";
import styles from "./MeetingNote.module.scss";
import YearBox from "@/components/common/YearBox/YearBox";
import MonthBox from "@/components/common/MonthBox/MonthBox";
import InputBox from "@/components/common/InputBox/InputBox";
import UnitDropdown from "@/components/common/UnitDropdown/UnitDropdown";
import PaymentDropdown from "@/components/common/PaymentDropdown/PaymentDropdown";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import EditButton from "../EditButton/EditButton";
import TransactionButton from "../TransactionButton/TransactionButton";
import { useAuth } from "@/components/contexts/AuthContext";
import axios from "axios";

interface MeetingNoteProps {
  title: string;
  representative: string;
  address: string;
  businessType: string;
  contact: string;
  fax: string;
  mode?: "default" | "view" | "edit";
}

const MeetingNote: React.FC<MeetingNoteProps> = ({
  title,
  representative,
  address,
  businessType,
  contact,
  fax,
  mode = "default",
}) => {
 
  const { user } = useAuth();


  const [callDateTime, setCallDateTime] = useState<string[]>(["", "", "", "", ""]); // YYYY-MM-DD HH:mm
  const [transactionDateTime, setTransactionDateTime] = useState<string[]>(["", "", "", "", ""]);

  // 📌 담당자 관련 상태값
  const [callHandlerName, setCallHandlerName] = useState<string>("");
  const [recordHandlerName, setRecordHandlerName] = useState<string>("");

  // 📌 거래 정보 관련 상태값
  const [transactionLocation, setTransactionLocation] = useState<string>("");
  const [transactionLocation2, setTransactionLocation2] = useState<string>("");
  const [byproductName, setByproductName] = useState<string>("");
  const [byproductAmount, setByproductAmount] = useState<string>("");
  const [byproductUnit, setByproductUnit] = useState<string>("kg");
  const [transactionPrice, setTransactionPrice] = useState<string>("");
  const [transactionMethod, setTransactionMethod] = useState<string>("");

  // 📌 거래 계좌 정보 관련 상태값
  const [bankName, setBankName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountHolderName, setAccountHolderName] = useState<string>("");

  // 📌 기타 사항
  const [transactionNotes, setTransactionNotes] = useState<string>("");

  // 거래일지 제출 함수
  const handleSubmit = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const data = {
      uniqueId: user.uniqueId,
      contactNumber: contact,
      callDate: `${callDateTime[0]}-${callDateTime[1]}-${callDateTime[2]} ${callDateTime[3]}:${callDateTime[4]}`,
      callHandler: callHandlerName,
      recordHandler: recordHandlerName,
      transactionDate: `${transactionDateTime[0]}-${transactionDateTime[1]}-${transactionDateTime[2]} ${transactionDateTime[3]}:${transactionDateTime[4]}`,
      transactionLocation,
      byproductName,
      byproductQuantity: parseFloat(byproductAmount),
      byproductUnit,
      transactionPrice: parseInt(transactionPrice, 10),
      transactionMethod,
      bank: bankName,
      accountNumber,
      depositorName: accountHolderName,
      additionalNotes: transactionNotes,
    };

    try {
      const response = await axios.post("http://43.201.160.49:5000/api/transaction-log", data);
      alert("거래일지가 성공적으로 저장되었습니다.");
      console.log("거래일지 저장 성공:", response.data);
    } catch (error) {
      console.error("거래일지 저장 오류:", error);
      alert("거래일지 저장 중 오류가 발생했습니다.");
    }
  };
  const handleCallDateChange = (index: number, value: string) => {
    const updatedDateTime = [...callDateTime]; // 기존 배열을 복사
    updatedDateTime[index] = value; // 해당 인덱스의 값 변경
    setCallDateTime(updatedDateTime); // 변경된 배열을 업데이트
  };
  const handleTransactionDateChange = (index: number, value: string) => {
    const updatedDateTime = [...transactionDateTime]; // 기존 배열 복사
    updatedDateTime[index] = value; // 특정 인덱스 값 변경
    setTransactionDateTime(updatedDateTime); // 변경된 배열 업데이트
  };
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        <div
          className={`${styles.infoContainer} ${mode === "view" ? styles.viewMode : ""}`}
        >
          <div className={styles.infoBox}>
            <div
              className={`${styles.infoBox1} ${mode === "view" ? styles.viewModeBox : ""}`}
            >
              <div>
                <span>연락처</span>
              </div>
              <div>
                <p>{contact}</p>
              </div>
            </div>
            <div
              className={`${styles.infoBox1} ${mode === "view" ? styles.viewModeBox : ""}`}
            >
              <div>
                <span>팩스</span>
              </div>
              <div>
                <p>{fax}</p>
              </div>
            </div>
            <div
              className={`${styles.infoBox1} ${mode === "view" ? styles.viewModeBox : ""}`}
            >
              <div>
                <span>대표자명</span>
              </div>
              <div>
                <p>{representative}</p>
              </div>
            </div>
            <div
              className={`${styles.infoBox1} ${mode === "view" ? styles.viewModeBox : ""}`}
            >
              <div>
                <span>주소</span>
              </div>
              <div>
                <p>{address}</p>
              </div>
            </div>
            <div
              className={`${styles.infoBox1} ${mode === "view" ? styles.viewModeBox : ""}`}
            >
              <div>
                <span>업종</span>
              </div>
              <div>
                <p>{businessType}</p>
              </div>
            </div>
          </div>

          {mode === "view" && (
            <div className={styles.transactionBox}>
              <p>거래가 완료되면 버튼을 눌러주세요!</p>
              <TransactionButton status="예정" />
            </div>
          )}
        </div>

        <div className={styles.line}></div>

        <p className={styles.mainText}>위니드 거래일지</p>
        <p className={styles.subText}>
          협의 내용을 바탕으로 아래의 정보들을 입력해주세요.
        </p>

        <div className={styles.inputGroup}>
          <div className={styles.inputBox}>
            <p className={styles.label}>통화일시</p>
            <div className={styles.dateInput}>
              <YearBox
                placeholder="YYYY"
                value={callDateTime[0]}
                onChange={(e) => handleCallDateChange(0, e.target.value)}
              />
              <p className={styles.dateText}>년</p>
              <MonthBox
                placeholder="MM"
                value={callDateTime[1]}
                onChange={(e) =>handleCallDateChange(1, e.target.value)}
              />
              <p className={styles.dateText}>월</p>
              <MonthBox
                placeholder="DD"
                value={callDateTime[2]}
                onChange={(e) =>handleCallDateChange(2, e.target.value)}
              />
              <p className={styles.dateText} style={{ marginRight: "5%" }}>
                일
              </p>

              <MonthBox
                placeholder="HH"
                value={callDateTime[3]}
                onChange={(e) => handleCallDateChange(3, e.target.value)}
              />
              <p className={styles.dateText}>시</p>
              <MonthBox
                placeholder="mm"
                value={callDateTime[4]}
                onChange={(e) => handleCallDateChange(4, e.target.value)}
              />
              <p className={styles.dateText}>분</p>
            </div>
          </div>

          <div className={styles.personInputBox}>
            <div className={styles.inputBox} style={{ paddingRight: "8%" }}>
              <p className={styles.label}>통화 담당자</p>
              <div className={styles.personInput} style={{ paddingTop: "3%" }}>
                <InputBox
                  type="text"
                  placeholder="통화 담당자 이름을 입력하세요."
                  value={callHandlerName}
                  onChange={(e) =>
                    setCallHandlerName(e.target.value)
                  }
                />
              </div>
            </div>

            <div className={styles.inputBox}>
              <p className={styles.label}>기록 담당자</p>
              <div className={styles.personInput} style={{ paddingTop: "3%" }}>
                <InputBox
                  type="text"
                  placeholder="기록 담당자 이름을 입력하세요."
                  value={recordHandlerName}
                  onChange={(e) =>
                    setRecordHandlerName( e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputBox}>
            <p className={styles.label}>거래 예정 시간</p>
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
            <p className={styles.label} style={{ paddingRight: "8%" }}>
              거래 예정 장소
            </p>
            <div className={styles.personInput}>
              <InputBox
                type="text"
                placeholder="거래가 진행될 장소를 입력해주세요."
                value={transactionLocation}
                onChange={(e) =>
                  setTransactionLocation(e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputBox}>
            <p className={styles.label1}>거래 예정 주소</p>
            <div style={{ paddingRight: "3%" }}>
              <InputBox
                type="text"
                placeholder="거래가 진행될 주소를 입력해주세요."
                value={transactionLocation2}
                onChange={(e) =>
                  setTransactionLocation2(e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.inputGroup} style={{ gap: "5%" }}>
          <div className={styles.inputBox}>
            <p className={styles.label}>거래 부산물 명</p>
            <div className={styles.unitContainer}>
              <InputBox
                type="text"
                placeholder="거래할 부산물 이름을 입력해주세요."
                value={byproductName}
                onChange={(e) =>
                  setByproductName(e.target.value)
                }
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
                onChange={(e) =>
                  setByproductAmount(e.target.value)
                }
              />

              <div className={styles.dropdownWrapper}>
                <UnitDropdown value={byproductUnit} onChange={setByproductUnit} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.inputGroup} style={{ gap: "5%" }}>
          <div className={styles.inputBox}>
            <p className={styles.label}>거래 가격</p>
            <div className={styles.inputBoxs}>
              <InputBox
                type="text"
                placeholder="거래 가격을 입력해주세요."
                value={transactionPrice}
                onChange={(e) =>
                  setTransactionPrice(e.target.value)
                }
              />
              <p className={styles.dateText} style={{ marginRight: "5%" }}>
                원
              </p>
            </div>
          </div>

          <div className={styles.inputBox} style={{ marginBottom: "5%" }}>
            <p className={styles.label}>거래 방식</p>
            <div className={styles.dropdownWrapper}>
              <PaymentDropdown
                value={transactionMethod}
                onChange={setTransactionMethod}
              />
            </div>
          </div>

          <div className={styles.inputBox1}>
            <p className={styles.label}>거래 계좌번호 및 예금주</p>
            <div className={styles.inputBoxs} style={{ gap: "1%" }}>
              <InputBox
                type="text"
                placeholder="거래 은행"
                value={bankName}
                onChange={(e) =>
                  setBankName(e.target.value)
                }
              />
              <InputBox
                type="text"
                placeholder="거래 대금을 입금할 계좌를 입력해주세요."
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(e.target.value)
                }
              />
              <InputBox
                type="text"
                placeholder="예금주"
                value={accountHolderName}
                onChange={(e) =>
                  setAccountHolderName(e.target.value)
                }
              />
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

        <div className={styles.terms}>
          <input type="checkbox" />
          <p className={styles.termsNotice}>
            더 나은 위니드의 거래 문화를 위해 작성한 협의 내용은 꼭 지켜주세요
          </p>
        </div>
        <div className={styles.editbutton}>
          {mode === "edit" ? (
            <EditButton type="submit" onClick={handleSubmit}>
              거래 일지 수정 완료하기
            </EditButton>
          ) : (
            <EditButton type="submit" onClick={handleSubmit}>
              거래 일지 작성 완료하기
            </EditButton>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MeetingNote;
