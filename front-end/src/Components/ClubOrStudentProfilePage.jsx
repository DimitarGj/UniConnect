import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ccs.css'; 

const ClubOrStudentProfilePage = () => {
  const navigate = useNavigate();

  const redirectToStudentSignUp = () => {
    navigate('/student-signup');
  };

  const redirectToCreateOrganization = () => {
    navigate('/create-organization');
  };

  return (
    <div className="ccsContainer">
      <h2>Would you like to create a student or organization profile?</h2>
      <div className="options">
        <button className="student" onClick={redirectToStudentSignUp}>
          Student
        </button>
        <button className="organization" onClick={redirectToCreateOrganization}>
          Organization
        </button>
      </div>
    </div>
  );
};

export default ClubOrStudentProfilePage;
