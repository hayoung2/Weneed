import styles from '@/components/atoms/Toggle/Toggle.module.scss'
import { useAuth } from "@/components/contexts/AuthContext"; 
import { useNavigate } from 'react-router-dom';

interface ToggleSwitchProps {
  checked: boolean;
  style?: React.CSSProperties;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, style, onChange }) => {
  const { user } = useAuth(); 
  const isNotLoggedIn = !user; 
  const isPersonalUser = user?.userType === "개인"; 
  const navigate = useNavigate();
  const handleToggle = () => {
    if (isNotLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }
    if (isPersonalUser) {
      alert("개인 회원에게는 AI 매칭이 제공되지 않습니다."); 
      return;
    }
    onChange(); 
  };

  return (
    <label className={styles.toggleSwitch} style={{ ...style }}>
      <input 
        type="checkbox" 
        checked={isNotLoggedIn || isPersonalUser ? false : checked} 
        onChange={handleToggle} 
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitch;
