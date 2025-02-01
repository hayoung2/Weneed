import styles from './MonthBox.module.scss';

interface MonthBoxProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MonthBox: React.FC<MonthBoxProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      maxLength={2}
      placeholder={placeholder}
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  );
};

export default MonthBox;
