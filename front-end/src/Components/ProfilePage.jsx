import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ProfilePage.css';
import axios from 'axios';
import HeaderNavBar from './HeaderNavBar.jsx';
import Post from './Post.jsx';
import blankProfile from './public/images/Blank-Profile.jpg';
import defaultCover from'./public/images/default-cover.jpg';

const ProfilePage = ( {userProfile} ) => {
  const navigate = useNavigate();

  const goToEditProfilePage = () => {
    navigate('/edit-profile-page');
  }
  const goToFriendsPage = () => {
    navigate('/friends-page');
  }
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;

  const [posts, setPosts] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts/'+userData.id);
        setPosts(response.data); 
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const CountFollowers = async () => {
      try{
        const response = await axios.get('http://localhost:8080/api/student/followers/'+userData.id);
        console.log(response.data.length)
        setFollowersCount(response.data.length);
      }catch(error){
        console.error('Error fetching followers', error);
      }
    };

    const CountFollowing = async () => {
      try{
        const response = await axios.get('http://localhost:8080/api/student/following/'+userData.id);
        console.log(response.data.length)
        setFollowingCount(response.data.length);
      }catch(error){
        console.error('Error fetching followers', error);
      }
    };
    
    fetchPosts();
    CountFollowers();
    CountFollowing();
  }, []); 
  return (
    <div className="profilePageContainer">
      <HeaderNavBar />
      <div className="profileContentContainer">
        <div className="coverPhoto">
          <img src={defaultCover} alt="coverPhoto"/>
        </div>
        <div className="profileInfo">
          <img src={blankProfile} alt="Profile" className="profilePicture"/>
          <h1>{userData.firstName} {userData.lastName}</h1>
        </div>
        <div className="followerInfo">
          <span><strong>Followers:</strong> {followersCount}</span>
          <span><strong>Following:</strong> {followingCount}</span>
        </div>
        <div className="editProfileButton">
          <button onClick={goToEditProfilePage}>Edit</button>
        </div>
        {/* <div className="navigationTabs">
          <button>Posts</button>
          <button onClick={goToFriendsPage}>Friends</button>
        </div> */}
        <div className="postsSection">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <Post postContent={post} userProfile={post.student} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;