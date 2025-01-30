import styles from './Login.module.scss'

export const LoginPage = () => {
  return(
    <div className={styles.loginContainer}>
      <h2 className={styles.title}
      style={{ fontSize: '28px', fontWeight: '700' }}
      >로그인</h2>
      <div className = {styles.loginWrapper}>
        <form className={styles.loginForm}>
          <input type="text" placeholder="고유번호" className={styles.input} />
          <input type="password" placeholder="비밀번호" className={styles.input} />
          <div className={styles.links}>
          <span 
            onClick={() => window.open('https://example.com/find-number', '_blank')}
          >
            고유번호 찾기</span>
          |
          <span 
            onClick={() => window.open('https://example.com/find-password', '_blank')}
          >
            비밀번호 찾기</span>
          </div>
          <button
            type="submit"
            className={styles.loginButton}
            style={
              { backgroundColor: 'var(--point-color)' }}
          >
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