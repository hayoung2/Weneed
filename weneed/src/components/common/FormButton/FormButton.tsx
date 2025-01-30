import styles from '@/components/common/FormButton/FormButton.module.scss';

interface FormButtonProps {
  type: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({ type, className, onClick, children }) => {
  const buttonClass = className ? `${styles.loginButton} ${className}` : styles.loginButton;
  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default FormButton;