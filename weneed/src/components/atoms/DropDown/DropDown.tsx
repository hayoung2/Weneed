import React from 'react'
import styles from './Dropdown.module.scss'

interface DropDownProps {
  isOpen: boolean
  selected: string
  options: string[]
  toggleDropdown: () => void
  handleOptionClick: (option: string) => void
  className?: string;
}

const DropDown: React.FC<DropDownProps> = ({
  isOpen,
  selected,
  options,
  toggleDropdown,
  handleOptionClick,
  className,
}) => {
  return (
    <div className={`${styles.dropdownContainer} ${className || ''}`}>
      <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`} onClick={toggleDropdown}>
        <div className={`${styles.selectedOption} ${selected ? styles.active : ''}`}>
          {selected}
        </div>
        {isOpen && (
          <div className={styles.optionsContainer}>
            {options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${selected === option ? styles.selected : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleOptionClick(option)
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DropDown;
