import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const Login = ({ username: defaultUsername, password: defaultPassword }) => {
  const [username, setUsername] = useState(defaultUsername || '');
  const [password, setPassword] = useState(defaultPassword || '');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      alert("You have logged in successfully")
    } catch (error) {
      setError('Error logging in: ' + error.message);
      
    }
  };

  return (
    <div className='login'>
      <h2 className='homehd'>Login</h2>
      <div className='frm'>
        <form onSubmit={handleLogin}>
          <div className='mar'>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className='mar'>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className='log2'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
