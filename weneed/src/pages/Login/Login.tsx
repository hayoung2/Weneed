import styles from '@/pages/Login/Login.module.scss'
import { useState } from 'react';

export const LoginPage = () => {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 방지

    if (!id && !password) {
      setErrorMessage('*고유번호 또는 비밀번호가 일치하지 않습니다. 다시 한번 입력해주세요.');
    } else if (!id) {
      setErrorMessage('*고유번호를 입력해주세요.');
    } else if (!password) {
      setErrorMessage('*비밀번호를 입력해주세요.');
    } else {
      setErrorMessage('');
      // 로그인 처리 로직 추가 가능
    }
  };

  return(
    <div className={styles.loginContainer}>
      <h2 className={styles.title}
      style={{ fontSize: '28px',  fontFamily:'bold' }}
      >로그인</h2>
      <div className = {styles.loginWrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="고유번호"
            className={styles.input}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 로그인 버튼 클릭 후, 입력이 안 된 경우만 에러 메시지를 표시 */}
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          <div className={styles.links}>
            <span onClick={() => window.open('https://example.com/find-number', '_blank')}>
              고유번호 찾기
            </span>
            |
            <span onClick={() => window.open('https://example.com/find-password', '_blank')}>
              비밀번호 찾기
            </span>
          </div>
          <button type="submit" className={styles.loginButton} >
            로그인
          </button>
        </form>
      </div>
      <div className={styles.signupText}>
        아직 위니드 회원이 아니신가요? <a href="#" className={styles.signupLink}>회원가입하기</a>
      </div>
    </div>
  )
}