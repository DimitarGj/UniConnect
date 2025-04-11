import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/ProfilePage.css';
import axios from 'axios';
import HeaderNavBar from './HeaderNavBar.jsx';
import Post from './Post.jsx';
import blankProfile from './public/images/Blank-Profile.jpg';
import defaultCover from'./public/images/default-cover.jpg';

const VisitProfile = () => {
  const navigate = useNavigate();
  const state = useLocation();

  const userProfile = state.state.userProfile;//the user we are visiting


  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;//the user in session
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [followerList, setFollowerList] = useState([]);

  if(userProfile.id==userData.id){
    navigate('/profile-page');
  }

  const [posts, setPosts] = useState([]);

  const CountFollowers = async () => {
    try{
      const response = await axios.get('http://localhost:8080/api/student/followers/'+userProfile.id);
      setFollowersCount(response.data.length);
      setFollowerList(response.data);

    }catch(error){
      console.error('Error fetching followers', error);
    }
  };

  const CountFollowing = async () => {
    try{
      const response = await axios.get('http://localhost:8080/api/student/following/'+userProfile.id);
      setFollowingCount(response.data.length);
    }catch(error){
      console.error('Error fetching followers', error);
    }
  };

  const isFollowingProfile =() =>{
    const userId = userData.id;
    const profileId = userProfile.id;

    console.log(followerList) 

    const found = followerList.find(item => item.id === userId)

    if(found){
      document.getElementById('followButton').innerHTML = 'Unfollow';
    }else{
      document.getElementById('followButton').innerHTML = 'Follow';
    }

  }

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts/'+userProfile.id);
        setPosts(response.data); 
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

  
    CountFollowers();
    CountFollowing();
    fetchPosts();


  }, [userProfile]); 

  useEffect(()=>{
    
    isFollowingProfile();

  },[followerList]);

  const handleFollow= () =>{
    
    if (document.getElementById('followButton').innerHTML === 'Follow'){
      try{
          const response = axios.post('http://localhost:8080/api/student/'+userProfile.id+'/'+userData.id,{ 
            headers:{
              'Content-Type': 'application/json',
            }
        });
        document.getElementById('followButton').innerHTML = 'Unfollow';
      }catch(error){
        console.error('Error following:', error);
      }

    }else{
      try{
      const response = axios.delete('http://localhost:8080/api/student/'+userProfile.id+'/'+userData.id,{ 
        headers:{
          'Content-Type': 'application/json',
        }
        });
        document.getElementById('followButton').innerHTML = 'Follow';
      }catch(error){
        console.error('Error unfollowing:', error);
      }
    }

    CountFollowers();
    CountFollowing();
    isFollowingProfile();

  }


  return (
    <div className="profilePageContainer">
      <HeaderNavBar />
      <div className="profileContentContainer">
        <div className="coverPhoto">
          <img src={defaultCover} alt="coverPhoto"/>
        </div>
        <div className="profileInfo">
          <img src={blankProfile} alt="Profile" className="profilePicture"/>
          <h1>{userProfile.firstName} {userProfile.lastName}</h1>
        </div>
        <div className="followerInfo">
          <span><strong>Followers:</strong> {followersCount}</span>
          <span><strong>Following:</strong> {followingCount}</span>
        </div>
        <div className="navigationTabs">
        <div className="followButton">
          <button id = "followButton" onClick={handleFollow}>Follow</button>
        </div>
          {/* <button>Posts</button>
          <button>About</button>
          <button>Friends</button> */}
        </div>
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

export default VisitProfile;