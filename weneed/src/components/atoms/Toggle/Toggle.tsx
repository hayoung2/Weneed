import styles from '@/components/atoms/Toggle/Toggle.module.scss'

interface ToggleSwitchProps {
  checked: boolean;
  style?: React.CSSProperties;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, style,onChange }) => {
  return (
    <label className={styles.toggleSwitch} style={{...style}}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitch;
