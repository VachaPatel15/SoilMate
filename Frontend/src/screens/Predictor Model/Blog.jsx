// Blog.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/Blog.css'; // Import the CSS file for styling
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";

const Blog = () => {
  const router = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the Flask backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/fetch-updates');
        const data = await response.json();
        setPosts(data.data); // Assuming the data is stored under the 'data' key
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-container">
        <Navbar menu={router.pathname} />
      <h1>Agriculture Updates</h1>
      {posts.map((post, index) => (
        <div key={index} className="blog-post">
          <h2 className="blog-title">{post.title}</h2>
          <p className="blog-description">{post.description}</p>
          <a href={post.link} target="_blank" rel="noopener noreferrer" className="blog-link">
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default Blog;
