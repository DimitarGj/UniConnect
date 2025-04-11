import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './css/EditProfilePage.css';
import HeaderNavBar from './HeaderNavBar.jsx';
import blankProfile from './public/images/Blank-Profile.jpg';
import defaultCover from'./public/images/default-cover.jpg';
import axios from 'axios';


const EditProfilePage = ( {userProfile} ) => {
  const navigate = useNavigate();

  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;//the user in session
  
  const [name, setName] = useState(userData.firstName + " " + userData.lastName);

  

  const goBackToProfilePage = async() => {
    const [firstName, ...lastNameArray] = name.split(' ');
    const lastName = lastNameArray.join(' ');

    userData.firstName = firstName;
    userData.lastName = lastName;

    const response = await axios.put('http://localhost:8080/api/student/', userData,{ 
          headers:{
            'Content-Type': 'application/json',
          }
        });
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/profile-page');
  }

  const changeCoverPhoto = (input) => {
    const picture = input.target.files[0];
    userProfile.coverPhoto = picture;
  }

  const changeProfilePic = (input) => {
    const picture = input.target.files[0];
    userProfile.profilePicture = picture;
  }

  return (
    <div className="editProfilePageContainer">
      <HeaderNavBar />
      <div className="editProfileContentContainer">
        <div className="editCoverPhoto">
          <img src={defaultCover} alt="coverPhoto"/>
        </div>
        <div className="editCoverPhotoButton">
          <input type="file" id="coverPhotoFileName" className="coverPhotoButton" onChange={changeCoverPhoto}/>
        </div>
        <div className="editProfileInfo">
          <img src={blankProfile} alt="Profile" className="profilePicture"/>
          <div className="editProfilePicButton">
            <input type="file" id="profilePictureFilename" className="profilePicButton" onChange={changeProfilePic}/>
          </div>
           <input type="text" id="userProfileName" className="userProfileName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="doneProfileButton">
          <button onClick={goBackToProfilePage}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;