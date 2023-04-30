import React, { useState } from 'react';
import axios from 'axios';

const AddPostForm = () => {
  const [caption, setCaption] = useState('');
  const [expression, setExpression] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('expression', expression);
    formData.append('photo', photo);
    try {
      const res = await axios.post('/paf/addpost', formData);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create a new post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="caption">Caption:</label>
          <input type="text" id="caption" name="caption" value={caption} onChange={handleCaptionChange} />
        </div>
        <div>
          <label htmlFor="expression">Expression:</label>
          <input type="text" id="expression" name="expression" value={expression} onChange={handleExpressionChange} />
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" name="photo" onChange={handlePhotoChange} />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default AddPostForm;
