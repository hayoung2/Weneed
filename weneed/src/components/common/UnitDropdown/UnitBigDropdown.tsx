import { useState } from "react";
import styles from "./UnitBigDropdown.module.scss";
import arrowDownIcon from "@/assets/icons/arrowdown.svg";

const units = ["단위", "kg", "t", "L", "㎥", "개", "기타"];

interface UnitBigDropdownProps {
  value: string;
  onChange: (unit: string) => void;
}

const UnitBigDropdown: React.FC<UnitBigDropdownProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string>("단위");

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

export default UnitBigDropdown;
