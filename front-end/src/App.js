import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import ClubOrStudentProfilePage from './Components/ClubOrStudentProfilePage';
import SignUpFirst from './Components/SignUpFirst';
import CreateOrganizationPage from './Components/CreateOrganizationPage';
import ProfilePage from './Components/ProfilePage';
import DiscussionPage from './Components/DiscussionPage';
import CreatePostPage from './Components/CreatePostPage';
import LargeCalendar from './Components/LargeCalendar';
import EditProfilePage from './Components/EditProfilePage';
import VisitProfile from './Components/VisitProfile';
import FriendsPage from './Components/FriendsPage';
import FollowingPage from './Components/FollowingPage';


const App = () => {
  const [discussionThreads, setDiscussionThreads] = useState([
    {
      id: 1,
      class: "CS426",
      title: "Grading Thread",
      description: "This is the thread where the course staff will post grade histograms...",
      category: "Grade Thread",
      replies: [
        { text: "Thanks for the update!", user: "Emily Clark", replies: [] },
      ],
      answers: [
        { 
          text: "OK", 
          user: "Mark Cuban", 
          replies: [
            { text: "Exactly my thoughts!", user: "John Doe" }
          ] 
        },
        { text: "sounds good", user: "Joe Goldberg", replies: [] },
        { text: "I don't care", user: "Peter Griffin", replies: [] }
      ]
    },
    {
      id: 2,
      class: "CS426",
      title: "Homework Discussion",
      description: "Let's discuss the homework problems here...",
      category: "Homework Thread",
      replies: [],
      answers: []
    },
    {
      id: 3,
      class: "CS426",
      title: "Project Ideas",
      description: "Share your project ideas and collaborate...",
      category: "Project Thread",
      replies: [],
      answers: []
    },
  ]);

  const userProfile = {
    name: "John Doe",
    coverPhoto: "https://i.imgur.com/9xNiWeI.jpg",
    profilePicture: "https://i.imgur.com/9xNiWeI.jpg",
    posts: [
      "Here is my first post!",
      "Here's my second post!",
      "Here's my last ever post!"
    ], 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/home" element={<HomePage userProfile={userProfile}/>} />
        <Route path="/create" element={<ClubOrStudentProfilePage />} />
        <Route path="/student-signup" element={<SignUpFirst />} />
        <Route path="/create-organization" element={<CreateOrganizationPage />} />
        <Route path="/profile-page" element={<ProfilePage userProfile={userProfile}/>} />
        <Route path="/discussion-page" element={<DiscussionPage discussionThreads={discussionThreads} setDiscussionThreads={setDiscussionThreads} />} />
        <Route path="/edit-profile-page" element={<EditProfilePage userProfile={userProfile}/>} />
        <Route path="/create-post" element={<CreatePostPage userProfile={userProfile}/>} />
        <Route path="/calendar" element={<LargeCalendar userProfile={userProfile}/>} />
        <Route path="/VisitProfile" element={<VisitProfile userProfile={userProfile}/>} />
        <Route path="/friends-page" element={<FriendsPage userProfile={userProfile}/>} />
        <Route path="/following-page" element={<FollowingPage userProfile={userProfile}/>} />
      </Routes>
    </Router>
  );
};

export default App;
