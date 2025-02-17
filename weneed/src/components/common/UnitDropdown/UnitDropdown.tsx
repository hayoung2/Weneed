import { useState } from "react";
import styles from "./UnitDropdown.module.scss";
import arrowDownIcon from "@/assets/icons/arrowdown.svg"; 

const units = ["단위", "kg", "t", "L"];

interface UnitDropdownProps {
  value: string;
  onChange: (unit: string) => void;
}

const UnitDropdown: React.FC<UnitDropdownProps> = ({  onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string>("단위"); // 기본값 "단위"

  const handleSelect = (unit: string) => {
    setSelectedUnit(unit);
    onChange(unit);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={`${styles.selected} ${isOpen ? styles.focused : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedUnit}
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
