import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
const Postlogin = () => {
  return (
    <div className='home'>
      <h1 className="homehd">Hi.. You have just logged in...</h1>
      <div className='mar'>
      <Link to="/viewImages">
        Click here to view all your uploaded images
      </Link>
      </div>
      <div className='mar'>
      <Link to="/imageUpload">
        Click here to upload another Image
      </Link>
      </div>
    </div>
  );
};

export default Postlogin;
