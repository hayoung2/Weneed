import styles from '@/components/common/EditButton/EditButton.module.scss';

interface EditButtonProps {
  type: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const EditButton: React.FC<EditButtonProps> = ({ type, className, onClick, children,style }) => {
  const buttonClass = className ? `${styles.loginButton} ${className}` : styles.loginButton;
  return (
    <button type={type} className={buttonClass} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default EditButton;