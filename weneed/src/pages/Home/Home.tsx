import React from 'react';
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>🚀 모든 페이지로 이동</h1>
      <div className="button-grid">
        <Link to="/signup"><button>회원가입</button></Link>
        <Link to="/login"><button>로그인</button></Link>
      </div>
    </div>
  );
};

export default Home;
