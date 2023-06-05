import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
const Home = () => {
  return (
    <div className='home'>
      <h1 className="homehd">Welcome to Photo collection App</h1>
      <Link to="/login">
        <button className='log'>Login</button>
      </Link>
      <Link to="/register">
        <button className='reg'>Register</button>
      </Link>
    </div>
  );
};

export default Home;
