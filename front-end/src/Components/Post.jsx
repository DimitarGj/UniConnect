import {React, useState} from 'react';
import './css/Post.css';
import blankProfile from './public/images/Blank-Profile.jpg';


const Post = ( {postContent, userProfile } ) => {
  const [liked, setLiked] = useState(false); 

  const toggleLike = () => {
    setLiked(!liked);
  };

  const formatTime = (dateTimeString) => {
    const now = new Date();
    const postDate = new Date(dateTimeString);
    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1 && now.getDate() - postDate.getDate() === 1) {
      return `Yesterday ${formatAMPM(postDate)}`;
    } else if (diffDays < 1) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours >= 1) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      } else {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes > 1) {
          return `${diffMinutes} minutes ago`;
        } else {
          return `Just Now`;
        }
      }
    } else {
      return `${formatAMPM(postDate)} ${postDate.getMonth() + 1}/${postDate.getDate()}/${postDate.getFullYear()}`;
    }
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };
  

  return (
    <div className="postItem">
        <div className="postHeader">
            <img src={blankProfile} alt="Profile" className="profilePic" />
            <span className="postName">
              {userProfile.firstName} {userProfile.lastName}
            </span>
            <br/>
        </div>
        
        <div className="timeStamp">{formatTime(postContent.createdAt)}</div>  
        <div className="postContentDiv">
            <p className='postContentP'>{postContent.content}</p>
        </div>
        
    </div>
  );
};

export default Post;