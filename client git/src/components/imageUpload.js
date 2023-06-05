import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      axios
        .post('http://localhost:3001/upload/image', formData)
        .then((response) => {
          console.log('Image uploaded successfully:', response.data);
          // Handle the response as needed
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          // Handle the error as needed
        });
    } else {
      console.log('No image selected');
    }
  };

  return (
    <div className='uploading'>
      <h1 className='homehd'>Upload your images here</h1>
      <div className='viewdiv'>      
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      </div>
    </div>
  );
};

export default ImageUpload;
