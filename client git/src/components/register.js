import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      username: username,
      password: password,
    };

    axios
      .post('http://localhost:3001/register', newUser)
      .then((response) => {
        console.log('Registration successful');
        alert('Registration successful');
        window.location.href='/';

      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred while registering.');
        }
      });
  };

  return (
    <div className='regist'>
      <h2 className='homehd'>Register</h2>
      <div className='frm'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} required />
        </div>
        <div className='mar'>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required/>
        </div>
        <button type="submit" className='reg'>Register</button>
      </form>
      </div>
      
    </div>
  );
};

export default Register;
