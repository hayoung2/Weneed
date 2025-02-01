import React, { useState } from 'react';
import styles from '@/pages/SignUp/SignUp.module.scss';
import InputBox from '@/components/common/InputBox/InputBox';
<<<<<<< HEAD
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
=======
import Footer from '@/components/common/Footer/Footer';
>>>>>>> main

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'기업' | '개인'>('기업');
  const [companyName, setCompanyName] = useState('');
  const [ceoName, setCeoName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // 필드 유효성 검사
    if (userType === '기업' && (!companyName || !ceoName || !businessNumber || !email || !password)) {
      return;
    }
    if (userType === '개인' && (!name || !email || !password)) {
      return;
    }
    if (!termsChecked) {
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('*비밀번호가 일치하지 않습니다.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('*비밀번호는 6자리 이상이어야 합니다.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        userType,
        companyName: userType === '기업' ? companyName : undefined,
        representativeName: userType === '기업' ? ceoName : undefined,
        name: userType === '개인' ? name : undefined,
        businessNumber: userType === '기업' ? businessNumber : undefined,
        email,
        password,
      });
      alert(`회원가입이 성공적으로 완료되었습니다! 고유번호: ${response.data.uniqueId}`);
      navigate('/login'); // 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error('회원가입 실패:', error);

      // 중복된 이메일에 대한 처리
      if (error.response && error.response.data.error === '이미 사용 중인 이메일입니다.') {
        setErrorMessage('*이미 사용 중인 이메일입니다.');
      } else {
        setErrorMessage('*회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  const isFormComplete = (userType === '기업'
      ? companyName && ceoName && businessNumber && email && password && confirmPassword
      : name && email && password && confirmPassword) && termsChecked;

  return (
<<<<<<< HEAD
      <div className={styles.signUpContainer}>
        <h2 className={styles.title}>회원가입</h2>
=======
    <div>
    <div className={styles.signUpContainer}>
      <h2 className={styles.title}>회원가입</h2>
>>>>>>> main

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
          {isSubmitted && (!password || password.length < 6) && <p className={styles.errorMessage}>*6자리 이상의 비밀번호를 입력해주세요.</p>}

          <InputBox type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {isSubmitted && password !== confirmPassword && <p className={styles.errorMessage}>*비밀번호가 일치하지 않습니다.</p>}

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

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </form>
      </div>
<<<<<<< HEAD
=======

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

        <div className={styles.termsLinks}>
          <span><a href="https://transparent-pomelo-dd9.notion.site/18c3c563527f802bab78eab5e3b0b835?pvs=4">이용약관</a></span>
          <span><a href="https://transparent-pomelo-dd9.notion.site/18c3c563527f8023a12cfe23897a3757?pvs=4">개인정보처리방침</a></span>
        </div>
        {isSubmitted && !termsChecked && <p className={styles.errorMessage2}>*이용약관 및 개인정보처리방침에 동의해주세요.</p>}

        <button type="submit" className={styles.signUpButton} style={{ backgroundColor: isFormComplete ? '#00B2FF' : '#B0B0B0' }}>
          회원가입
        </button>
      </form>
    </div>
    <Footer />
    </div>
>>>>>>> main
  );
};

export default SignUp;
