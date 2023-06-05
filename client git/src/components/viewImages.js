import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css'

const ViewImages = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {fetchImages();
 }, []);

  const fetchImages = () => {
    axios
      .get('http://localhost:3001/images/all')
      .then((response) => {
        const filteredImages = response.data.filter(isImageAvailable);
        setImages(filteredImages);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  };

  const isImageAvailable = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
    });
  };

  return (
    <div className='view'>
      <h2 className='homehd'>Uploaded Images</h2>
      <div className='viewdiv'>
      {images.length > 0 ? (
        <table border={2}>
          <thead>
            <tr>
              <th>Image Name</th>
              <th>Image URL</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {images.map((imageUrl, index) => (
              <tr key={index}>
                <td>Image {index + 1}</td>
                <td>{imageUrl}</td>
                <td>
                  <img src={imageUrl} alt={`Image ${index}`} style={{ width: '200px', height: '200px' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No images found</p>
      )}
      </div>
    </div>
  );
};

export default ViewImages;
