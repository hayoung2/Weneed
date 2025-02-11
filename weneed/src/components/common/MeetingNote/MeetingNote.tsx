import { useState } from "react";
import styles from "./MeetingNote.module.scss";
import YearBox from "@/components/common/YearBox/YearBox";
import MonthBox from "@/components/common/MonthBox/MonthBox";
import InputBox from "@/components/common/InputBox/InputBox";
import UnitDropdown from "@/components/common/UnitDropdown/UnitDropdown";
import PaymentDropdown from "@/components/common/PaymentDropdown/PaymentDropdown"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import EditButton from "../EditButton/EditButton";
import TransactionButton from "../TransactionButton/TransactionButton";

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
  const [callPersons, setCallPersons] = useState(["", ""]);
  const [callDate, setCallDate] = useState<string[]>(["", "", "", "", ""]);
  const [selectedUnit, setSelectedUnit] = useState<string>("kg");
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const handleDateChange = (index: number, value: string) => {
    const updatedDate = [...callDate];
    updatedDate[index] = value;
    setCallDate(updatedDate);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        <div className={`${styles.infoContainer} ${mode === "view" ? styles.viewMode : ""}`}>
          <div className={styles.infoBox}>
          <div className={`${styles.infoBox1} ${mode === "view" ? styles.viewModeBox : ""}`} ><div><span>연락처</span></div><div><p>{contact}</p></div></div>
            <div className={`${styles.infoBox1} ${mode === "view" ? styles.viewModeBox : ""}`} ><div><span>팩스</span></div><div><p>{fax}</p></div></div>
              <div className={`${styles.infoBox1} ${mode === "view" ? styles.viewModeBox: ""}`} ><div><span>대표자명</span></div><div><p>{representative}</p></div></div>
              <div className={`${styles.infoBox1} ${mode === "view" ? styles.viewModeBox : ""}`} ><div><span>주소</span></div><div><p>{address}</p></div></div>
              <div className={`${styles.infoBox1} ${mode === "view" ? styles.viewModeBox : ""}`} ><div><span>업종</span></div><div><p>{businessType}</p></div></div>
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
                value={callDate[0]}
                onChange={(e) => handleDateChange(0, e.target.value)}
              />
              <p className={styles.dateText}>년</p>
              <MonthBox
                placeholder="MM"
                value={callDate[1]}
                onChange={(e) => handleDateChange(1, e.target.value)}
              />
              <p className={styles.dateText}>월</p>
              <MonthBox
                placeholder="DD"
                value={callDate[2]}
                onChange={(e) => handleDateChange(2, e.target.value)}
              />
              <p className={styles.dateText} style={{ marginRight: "5%" }}>
                일
              </p>

              <MonthBox
                placeholder="HH"
                value={callDate[3]}
                onChange={(e) => handleDateChange(3, e.target.value)}
              />
              <p className={styles.dateText}>시</p>
              <MonthBox
                placeholder="mm"
                value={callDate[4]}
                onChange={(e) => handleDateChange(4, e.target.value)}
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
                  value={callPersons[0]}
                  onChange={(e) =>
                    setCallPersons([e.target.value, callPersons[1]])
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
                  value={callPersons[1]}
                  onChange={(e) =>
                    setCallPersons([callPersons[0], e.target.value])
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
                value={callDate[0]}
                onChange={(e) => handleDateChange(0, e.target.value)}
              />
              <p className={styles.dateText}>년</p>
              <MonthBox
                placeholder="MM"
                value={callDate[1]}
                onChange={(e) => handleDateChange(1, e.target.value)}
              />
              <p className={styles.dateText}>월</p>
              <MonthBox
                placeholder="DD"
                value={callDate[2]}
                onChange={(e) => handleDateChange(2, e.target.value)}
              />
              <p className={styles.dateText} style={{ marginRight: "5%" }}>
                일
              </p>

              <MonthBox
                placeholder="HH"
                value={callDate[3]}
                onChange={(e) => handleDateChange(3, e.target.value)}
              />
              <p className={styles.dateText}>시</p>
              <MonthBox
                placeholder="mm"
                value={callDate[4]}
                onChange={(e) => handleDateChange(4, e.target.value)}
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
                value={callPersons[0]}
                onChange={(e) =>
                  setCallPersons([e.target.value, callPersons[1]])
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
                value={callPersons[0]}
                onChange={(e) =>
                  setCallPersons([e.target.value, callPersons[1]])
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
                value={callPersons[0]}
                onChange={(e) =>
                  setCallPersons([e.target.value, callPersons[1]])
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
                value={callPersons[0]}
                onChange={(e) =>
                  setCallPersons([e.target.value, callPersons[1]])
                }
              />

              <div className={styles.dropdownWrapper}>
                <UnitDropdown value={selectedUnit} onChange={setSelectedUnit} />
              </div>
            </div>
          </div>
        </div>

        <div className = {styles.inputGroup} style={{ gap: "5%" }}>
          <div className = {styles.inputBox}>
            <p className={styles.label}>거래 가격</p>
            <div className = {styles.inputBoxs}>
            <InputBox
                type="text"
                placeholder="거래 가격을 입력해주세요."
                value={callPersons[0]}
                onChange={(e) =>
                  setCallPersons([e.target.value, callPersons[1]])
                }
              />
              <p className={styles.dateText} style={{ marginRight: "5%" }}>
                원
              </p>
              </div>
          </div>
          
          <div className = {styles.inputBox} style={{ marginBottom: "5%" }}>
            <p className={styles.label}>거래 방식</p>
            <div className={styles.dropdownWrapper}>
                <PaymentDropdown value={selectedPayment} onChange={setSelectedPayment} />
              </div>
          </div>

          <div className = {styles.inputBox1}>
            <p className={styles.label}>거래 계좌번호 및 예금주</p>
            <div className = {styles.inputBoxs} style={{ gap: "1%" }}>
              <InputBox
                type="text"
                placeholder="거래 은행"
                value={callPersons[0]}
                onChange={(e) =>
                  setCallPersons([e.target.value, callPersons[1]])
                }
              />
              <InputBox
                type="text"
                placeholder="거래 대금을 입금할 계좌를 입력해주세요."
                value={callPersons[0]}
                onChange={(e) =>
                  setCallPersons([e.target.value, callPersons[1]])
                }
              />
              <InputBox
                type="text"
                placeholder="예금주"
                value={callPersons[0]}
                onChange={(e) =>
                  setCallPersons([e.target.value, callPersons[1]])
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
            value={callPersons[0]}
            onChange={(e) => setCallPersons([e.target.value, callPersons[1]])}
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
            <EditButton type="submit">거래 일지 수정 완료하기</EditButton>
          ) : (
            <EditButton type="submit">거래 일지 작성 완료하기</EditButton>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MeetingNote;
