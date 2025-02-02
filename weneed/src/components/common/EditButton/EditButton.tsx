import styles from '@/components/common/EditButton/EditButton.module.scss';

interface EditButtonProps {
  type: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const EditButton: React.FC<EditButtonProps> = ({ type, className, onClick, children }) => {
  const buttonClass = className ? `${styles.loginButton} ${className}` : styles.loginButton;
  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default EditButton;