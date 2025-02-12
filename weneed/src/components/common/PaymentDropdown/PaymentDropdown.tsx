import { useState } from "react";
import styles from "./PaymentDropdown.module.scss";
import arrowDownIcon from "@/assets/icons/arrowdown.svg"; 

const units = ["선불 계좌 이체", "후불 계좌 이체", "현금",];

interface PaymentDropdownProps {
  value: string;
  onChange: (unit: string) => void;
}

const UnitDropdown: React.FC<PaymentDropdownProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("선불 계좌 이체"); // 기본값 "단위"

  const handleSelect = (unit: string) => {
    setSelectedPayment(unit);
    onChange(unit);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={`${styles.selected} ${isOpen ? styles.focused : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedPayment}
        <img
          src={arrowDownIcon}
          className={isOpen ? styles.arrowUp : styles.arrowDown}
          alt="Dropdown Arrow"
        />
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {units.map((unit) => (
            <li key={unit} onClick={() => handleSelect(unit)}>
              {unit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UnitDropdown;
