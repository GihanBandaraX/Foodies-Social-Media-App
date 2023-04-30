import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostStyle/Allpost.css';

const Allpost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get('http://localhost:8080/paf/allpost');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="gallery-container">
      {posts.map((post) => (
        <div key={post._id} className="gallery-item">
          <img src={`data:image/jpeg;base64,${post.photo}`} alt={post.caption} />
          <div className="gallery-caption">
            <h3>{post.caption}</h3>
            <p>{post.expression}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allpost;
