import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [caption, setCaption] = useState('');
  const [expression, setExpression] = useState('');
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get(`http://localhost:8080/paf/post/${id}`);
        setCaption(res.data.caption);
        setExpression(res.data.expression);
        setPhotos(res.data.photos);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPost();
  }, [id]);

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleExpressionChange = (event) => {
    setExpression(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setSelectedPhotos(Array.from(event.target.files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('expression', expression);
      selectedPhotos.forEach((photo) => {
        formData.append('photos', photo);
      });
      await axios.put(`http://localhost:8080/paf/updatepost/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Redirect to Allpost page after successful update
      window.location.href = '/allpost';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="caption">Caption:</label>
          <input type="text" id="caption" value={caption} onChange={handleCaptionChange} />
        </div>
        <div>
          <label htmlFor="expression">Expression:</label>
          <input type="text" id="expression" value={expression} onChange={handleExpressionChange} />
        </div>
        <div>
          <label htmlFor="photos">Photos:</label>
          <input type="file" id="photos" multiple onChange={handlePhotoChange} />
        </div>
        <button type="submit">Update Post</button>
      </form>
    
    </div>
  );
};

export default EditPost;

