import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/CreatePostPage.css';
import HeaderNavBar from './HeaderNavBar.jsx';

const CreatePostPage = ( {userProfile} ) => {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState('');
  

  const handleSubmit =(e) => {
    e.preventDefault(); 
    const user = localStorage.getItem('user');
    const student = user ? JSON.parse(user) : null;
      try {
        const postReq = {
          content: postContent,
          student: student
        };
        const response = axios.post('http://localhost:8080/api/posts/create', JSON.stringify(postReq),{ 
          headers:{
            'Content-Type': 'application/json',
          }
      });
        //setPosts(response.data); // Update the posts state with fetched posts
      } catch (error) {
        console.error('Error sending post:', error);
      }
    navigate('/home');
    window.location.reload();
    setPostContent('');
  };

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  return (
    <div className="createPostPageContainer">
        <HeaderNavBar />
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
        <textarea
            value={postContent}
            onChange={handleChange}
            placeholder="What's on your mind?"
            rows="4"
        ></textarea>
        <button type="submit">Submit Post</button>
        </form>
    </div>
  );
};

export default CreatePostPage;