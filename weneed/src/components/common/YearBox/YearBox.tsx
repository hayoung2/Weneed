import styles from './YearBox.module.scss';
interface YearBoxProps {
  placeholder: string;
 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const YearBox: React.FC<YearBoxProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text" 
      maxLength={4}
      placeholder={placeholder}
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  );
};

export default YearBox;
