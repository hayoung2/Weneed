import { useState } from 'react';
import styles from '@/pages/Login/Login.module.scss';
import InputBox from '@/components/common/InputBox/InputBox';
import FormButton from '@/components/common/FormButton/FormButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // react-router-dom에서 useNavigate 훅을 임포트
import Footer from '@/components/common/Footer/Footer';

export const LoginPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 새로 고침 방지

    if (!id && !password) {
      setErrorMessage('*고유번호 또는 비밀번호가 일치하지 않습니다. 다시 한번 입력해주세요.');
    } else if (!id) {
      setErrorMessage('*고유번호를 입력해주세요.');
    } else if (!password) {
      setErrorMessage('*비밀번호를 입력해주세요.');
    } else {
      setErrorMessage('');
      try {
        // 로그인 API 호출
        const response = await axios.post('http://localhost:5000/login', {
          uniqueId: id,
          password,
        });
        setToken(response.data.token); // 토큰 상태 업데이트
        alert('로그인 성공!'); // 로그인 성공 시 alert
        navigate('/'); // 메인 페이지로 이동 (원하는 경로로 변경 가능)
      } catch (error) {
        setErrorMessage('*고유번호 또는 비밀번호가 일치하지 않습니다.');
      }
    }
  };

  return (
      <div>
        <div className={styles.loginContainer}>
          <h2 className={styles.title} style={{ fontSize: '28px', fontFamily: 'bold' }}>로그인</h2>
          <div className={styles.loginWrapper}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <InputBox type="text" placeholder="고유번호" value={id} onChange={(e) => setId(e.target.value)} />
              <InputBox type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
              <div className={styles.links}>
                <span onClick={() => window.open('https://example.com/find-number', '_blank')}>고유번호 찾기</span> |
                <span onClick={() => window.open('https://example.com/find-password', '_blank')}>비밀번호 찾기</span>
              </div>
              <FormButton type="submit" className={styles.loginButton}>로그인</FormButton>
            </form>
          </div>
          <div className={styles.signupText}>
            아직 위니드 회원이 아니신가요? <a href="/signup" className={styles.signupLink}>회원가입하기</a>
          </div>
        </div>
        <Footer />
      </div>
  );
};

export default LoginPage;
