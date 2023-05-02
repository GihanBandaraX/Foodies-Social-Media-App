import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:8080/paf/allpost');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.caption}</h3>
          <p>{post.expression}</p>
          <img src={`data:image/jpeg;base64,${post.photo}`} alt={post.caption} />
        </div>
      ))}
    </div>
  );
};

export default PostList;

