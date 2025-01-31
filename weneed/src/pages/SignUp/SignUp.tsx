import React, { useState } from 'react';
import styles from '@/pages/SignUp/SignUp.module.scss';
import InputBox from '@/components/common/InputBox/InputBox';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // react-router-dom에서 useNavigate 훅을 임포트

const SignUp: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [userType, setUserType] = useState<'기업' | '개인'>('기업');
  const [companyName, setCompanyName] = useState('');
  const [ceoName, setCeoName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (userType === '기업' && (!companyName || !ceoName || !businessNumber || !email || !password)) {
      return;
    }
    if (userType === '개인' && (!name || !email || !password)) {
      return;
    }
    if (!termsChecked) {
      return;
    }

    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        userType,
        companyName,
        representativeName: ceoName,
        name,
        businessNumber,
        email,
        password,
      });
      console.log('회원가입 성공:', response.data);
      alert(`회원가입이 성공적으로 완료되었습니다! 고유번호: ${response.data.uniqueId}`); // 고유번호를 alert로 표시
      navigate('/login'); // 로그인 페이지로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
      setErrorMessage('*회원가입 중 오류가 발생했습니다.');
    }
  };

  const isFormComplete =
      (userType === '기업'
          ? companyName && ceoName && businessNumber && email && password
          : name && email && password) && termsChecked;

  return (
      <div className={styles.signUpContainer}>
        <h2 className={styles.title}>회원가입</h2>

        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input type="radio" value="기업" checked={userType === '기업'} onChange={() => setUserType('기업')} />
            <p>기업</p>
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" value="개인" checked={userType === '개인'} onChange={() => setUserType('개인')} />
            <p>개인</p>
          </label>
        </div>

        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          {userType === '기업' && (
              <>
                <InputBox type="text" placeholder="회사명" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                {isSubmitted && !companyName && <p className={styles.errorMessage}>*회사명을 입력해주세요.</p>}

                <InputBox type="text" placeholder="대표자명" value={ceoName} onChange={(e) => setCeoName(e.target.value)} />
                {isSubmitted && !ceoName && <p className={styles.errorMessage}>*대표자명을 입력해주세요.</p>}

                <InputBox type="text" placeholder="사업자등록번호('-'없이 10자리)" value={businessNumber} onChange={(e) => setBusinessNumber(e.target.value)} />
                {isSubmitted && !businessNumber && <p className={styles.errorMessage}>*사업자등록번호를 입력해주세요.</p>}
              </>
          )}

          {userType === '개인' && (
              <>
                <InputBox type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
                {isSubmitted && !name && <p className={styles.errorMessage}>*이름을 입력해주세요.</p>}
              </>
          )}

          <InputBox type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          {isSubmitted && !email && <p className={styles.errorMessage}>*이메일을 입력해주세요.</p>}

          <InputBox type="password" placeholder="비밀번호(6자리이상)" value={password} onChange={(e) => setPassword(e.target.value)} />
          {isSubmitted && !password && <p className={styles.errorMessage}>*6자리 이상의 비밀번호를 입력해주세요.</p>}

          <div className={styles.terms}>
            <input type="checkbox" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />
            <p className={styles.termsNotice}>
              <span>[필수]</span> 이용약관 및 개인정보처리방침에 동의합니다.
            </p>
          </div>

          {isSubmitted && !termsChecked && <p className={styles.errorMessage2}>*이용약관 및 개인정보처리방침에 동의해주세요.</p>}

          <button type="submit" className={styles.signUpButton} style={{ backgroundColor: isFormComplete ? '#00B2FF' : '#B0B0B0' }}>
            회원가입
          </button>
        </form>
      </div>
  );
};

export default SignUp;
