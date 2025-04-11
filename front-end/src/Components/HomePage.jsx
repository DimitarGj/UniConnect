import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/HomePage.css';
import HeaderNavBar from './HeaderNavBar.jsx';
import Post from './Post.jsx';
import MiniCalendar from './MiniCalendar.jsx';

const Home = () => <h2>Welcome to the Home Page!</h2>;
const Profile = () => <h2>This is the Profile Page!</h2>;
const Friends = () => <h2>Check out your Friends here!</h2>;
const Messages = () => <h2>Your Messages are here!</h2>;
const Discussions = () => <h2>Join interesting Discussions!</h2>;
const Calendar = () => <h2>Stay updated with the Calendar!</h2>;
const Recommendations = () => <h2>Explore Recommendations!</h2>;

const HomePage = ( {userProfile} ) => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState([]);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;

  useEffect(() => {
    const CountFollowing = async () => {
      try{
        const response = await axios.get('http://localhost:8080/api/student/following/'+userData.id);
        console.log(response.data);
        setFriends(response.data);
      }catch(error){
        console.error('Error fetching followers', error);
      }
    };


    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts/');
        const postsByFriends = response.data.filter(post => friends.some(friend => friend.id === post.student.id));
        // const postsByMe = response.data.filter(post => friends.some(post.student.id === userData.id))
        // const allPosts = [...postsByFriends, ...postsByMe];
        setPosts(response.data); 
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };


    CountFollowing();
    fetchPosts();
  }, []); 

  

  // useEffect(()=>{

  //   const print = () => {
  //     const postsByFriends = [];
  
  //     for (const post of posts) {
  //       if (friends.some(friend => friend.id === post.student.id)) {
  //         postsByFriends.push(post);
  //       }

  //       if (userData.id === post.student.id) {
  //         postsByFriends.push(post);
  //       }
  //     }
  
  //     console.log(posts);
  //     setPosts(postsByFriends);
  //   };

  //   print();
  // },[friends, posts]);

  return (
    <div className="homePageContainer">
      <HeaderNavBar />
      <div className="homePage">
        <div className="Sidebar-Left">
          <label onClick={() => navigate('/home')} title="Home">Home</label>
          <label onClick={() => navigate('/profile-page')} title="Profile">Profile</label>
          <label onClick={() => navigate('/discussion-page')} title="Discussions">Discussions</label>
          <label onClick={() => navigate('/calendar')} title="Calendar">Calendar</label>
          <MiniCalendar />
        </div>
        
        <div className="posts">
          <div className="createPosts">
              <button type="button" className="createPostButton" onClick={() => navigate('/create-post')}>
                + Post
              </button>
          </div>
          {posts.filter(post => friends.some(friend => friend.id === post.student.id || post.student.id === userData.id)).map((post) => (
            <div key={post.id} className="post">
              <Post postContent={post} userProfile={post.student} />
            </div>
          ))}
        </div>

        <div className="Sidebar-Right">
          <label onClick={() => navigate('/friends-page')} title="Friends">Followers</label>
          <label onClick={() => navigate('/following-page')} title="Recommendations">Following</label>
        </div>
      </div>
    </div>
  );
};

export default HomePage;