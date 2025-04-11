import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/SignUpFirst.css';


const SignUpFirst = () => {
  const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [pfpError, setPfpError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  let navigate = useNavigate();
  let sent = false;

  //used to store the profile data that will be stored in MySQL
  const [postData, setPostData] = useState({
    dob: '9999-12-31',
    email: '',
    password: '',
    firstName: '',
    lastName:'',
    major: '',
    minor: '',
    pfp:''
  });


  //handles using enter
  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.code === "Enter" && !disableSubmit) {
        event.preventDefault();
        document.getElementById('next').click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }; 
  }, [disableSubmit]);


  const handlePfpSelect = (input) => {
    const picture = input.target.files[0];
    if (picture) {
      const pictureExtension = picture.name.split('.').pop().toLowerCase();
      switch(pictureExtension){
        case 'jpg':
        case 'jpeg':
        case 'png':
          setPfpError('');
          setDisableSubmit(false);
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
            const previewImage = document.getElementById('previewImage');
            if(previewImage) {
              previewImage.style.display = 'block';
            }
          };
          reader.readAsDataURL(picture);
          // setPostData((prevData)=>({
          //   ...prevData,
          //   pfp:input.target.value}));
          break;
        default:
          setPfpError('Invalid file type. Please select a .jpg, .jpeg, or .png file');
          setDisableSubmit(true);
          const previewImage = document.getElementById('previewImage');
          if (previewImage){
            previewImage.style.display = 'none';
          }
          break;
      }
    }
  }

  const addCourse = () => {
    // Create a new input element
    const newInput = document.createElement('input');
  
    // Set attriabutes for the input (ex., type, className, placeholder, etc.)
    newInput.type = 'text';
    newInput.className = 'course';
    newInput.placeholder = 'Course';
  
    // Get the container where you want to append the new input
    const inputContainer = document.getElementById('inputContainer');
  
    // Append the new input to the container
    inputContainer.appendChild(newInput);
  };
  
  const removeCourse = () => {
    const inputContainer = document.getElementById('inputContainer');
    if (inputContainer.childNodes.length > 1) {
      const last = inputContainer.lastElementChild;
      inputContainer.removeChild(last);
    }
  };



  const showTab = (n) => {
    const x = document.getElementsByClassName('tab');

    if(x && x[n]){
      for(let i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
      }

      x[n].style.display = 'block';

      if (x[n].id === 'pfp') {
        x[n].style.display = 'flex';
        x[n].style.justifyContent = 'center';
        x[n].style.alignItems = 'center';
        x[n].style.flexDirection = 'column';
      }

      if (n === x.length - 1) {
        document.getElementById('next').innerHTML = 'Submit';
      } else {
        document.getElementById('next').innerHTML = 'Next';
      }

      fixStep(n);
    };
}
// function added to handle the POST request
  const handleProfileCreate = () =>{
    try{
      const response = axios.post("http://localhost:8080/api/student", JSON.stringify(postData),{ 
        headers:{
          'Content-Type': 'application/json',
        },
    });
    }
    catch(error){
      console.log(error);
    }
  }
  // added setPostData here, set it to the current values before the form is submitted
  // handleProfileCreate sends the postData
  // the user is then directed to the home page
  // const handleSubmit = () => {
  //   if (!disableSubmit && currentTab === 4) {
  //     handleProfileCreate();
  //     navigate('/home');
  //   }
  // }

  const handleSubmit = () => {
    if (currentTab === 4) {
      try {
        if(sent===false){
          handleProfileCreate(); // Wait for the POST request to complete
          sent = true;
        }
        navigate('/');
      } catch (error) {
        console.error('Error handling profile creation:', error);
      }
    }
  };


  // useEffect(() => {
  //   handleProfileCreate();
  // }, [postData])


  const nextPrev = (n) => {
    const x = document.getElementsByClassName('tab');

    if (n === 1 && !validateForm()) {
      return false;
    }

    if (currentTab === 0 && !checkPasswordMatch()) {
      return false;
    }

    x[currentTab].style.display = 'none';
    setCurrentTab((currTab) => {
      const newTab = currTab + n;
      if (newTab >= x.length){
        handleSubmit();
      } else {
        x[currTab].style.display = 'none';
        showTab(newTab);
      }
      return newTab;
    });
  };

  const validateForm = () => {
    let x, y, i, valid = true;
    x = document.getElementsByClassName('tab');
    y = x[currentTab].getElementsByTagName('input');
    const z = x[currentTab].getElementsByTagName('select');

    if (z.length !== 0 && z[0].value === null) {
      z[0].classList.add('required');
    }

    for (i = 0; i < y.length; i++) {
      if (y[i].value === '' && y[i].type !== 'file' && y[i].id !== 'minor') {
        y[i].classList.add('required');
        valid = false;
      }
    }

    if (valid) {
      document.getElementsByClassName('step')[currentTab].className += ' finish';
    }

    return valid;
  };

  const fixStep = (n) => {
    const x = document.getElementsByClassName('step');

    for (let i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(' active', '');
    }

    x[n].className += ' active';
  };

  const checkPasswordMatch = () => {
    const password1 = document.getElementById('password').value;
    const password2 = document.getElementById('confirm-password').value;

    if (password1 !== password2) {
      setPasswordMatchMessage('Passwords do not match');
      document.getElementById('password').classList.add('required');
      document.getElementById('confirm-password').classList.add('required');
      return false;
    } else {
      setPasswordMatchMessage('');
      document.getElementById('password').classList.remove('required');
      document.getElementById('confirm-password').classList.remove('required');
      return true;
    }
  };

  useEffect(() => {
    showTab(currentTab);
  }, [currentTab]);

  // function handlePfp(e){
  //   setPostData((prevData)=>({
  //     ...prevData,
  //     pfp:e.target.value}));
  // }
  function handleEmail(e){
    setPostData((prevData)=>({
      ...prevData,
      email:e.target.value}));  
  }

  function handlePass(e){
    setPostData((prevData)=>({
      ...prevData,
      password:e.target.value}));  
  }

  function handleFname(e){
    setPostData((prevData)=>({
      ...prevData,
      firstName:e.target.value}));
  }

  function handleLname(e){
    setPostData((prevData)=>({
      ...prevData,
      lastName:e.target.value}));  
  }

  function handleBday(e){
    setPostData((prevData)=>({
      ...prevData,
      dob:e.target.value}));  
  }

  function handleMajor(e){
    setPostData((prevData)=>({
      ...prevData,
      major:e.target.value}));
  }

  function handleMinor(e){
    setPostData((prevData)=>({
      ...prevData,
      minor:e.target.value}));  
  }


  return (
    <div>
      <div className="container">
        <form id="register" onSubmit={(e) => e.preventDefault()}>
            <div className="welcome">
                <h1>Create Student Profile</h1>
            </div>
            <div className="tab" id="formfields">
                <input type="text" name="text" className="email" id="email" size="50" placeholder="Email" onChange={handleEmail}/>
                <input type="password" name="text" className="password" id="password" size="50" placeholder="Password" onChange={handlePass} />
                <input type="password" name="text" className="password" id="confirm-password" size="50" placeholder="Confirm Password" />
                {passwordMatchMessage && <span id="error" className="error">{passwordMatchMessage}</span>}

            </div>
            <div className="tab" id="tab2">
                <label htmlFor="first-name">First Name:</label>
                <input type="text" name="text" className="name" id="first-name" size="50" placeholder="First Name" onChange={handleFname} />
                <label htmlFor="last-name">Last Name:</label>
                <input type="text" name="text" className="name" id="last-name" size="50" placeholder="Last Name" onChange={handleLname} />
                
                <label htmlFor="gender">Gender:</label>
                <select name="gender" id="gender" >
                <option value="Please Select" disabled defaultValue>Please Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other/Prefer to not answer</option>
                </select>
                <label htmlFor="birthday">Date of birth:</label>
                <input type="date" id="birthday" name="birthday" onChange={handleBday} />
            </div>
            <div className="tab">
                <label htmlFor="major">Major:</label>
                <input type="text" name="major" id="major" placeholder="Major" onChange={handleMajor} />
                <label htmlFor="minor">Minor:</label>
                <input type="text" name="minor" id="minor" placeholder="Minor" onChange={handleMinor}/>
            </div>
            <div className="tab">
                <h3>Current Courses</h3>
                <div id="inputContainer">
                <input type="text" className="course" placeholder="Course" />
                </div>
                <div className="buttonrow" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                <button type="button" className="courseButton" id="removeCourse" onClick={removeCourse}>- Remove</button>
                <button type="button" className="courseButton" id="addCourse" onClick={addCourse}>+ Add</button>
                </div>
            </div>
            <div className="tab" id="pfp" style={{ textAlign: 'center' }}>
                <h3>Upload Profile Picture</h3>
                <img id="previewImage" src={imagePreviewUrl} alt="Preview" style={{ display: 'none', textAlign: 'center' }} />
                <input type="file" id="filename" onChange={handlePfpSelect}/>
                {pfpError && <span id="error" className="error">{pfpError}</span>}
            </div>
            
            <div className="bRow" style={{ overflow: 'auto' }}>
                <button type="button" id="next" onClick={() => nextPrev(1)} disabled={disableSubmit}>Next</button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <span className="step"></span>
                <span className="step"></span>
                <span className="step"></span>
                <span className="step"></span>
                <span className="step"></span>
            </div>
          </form>

      </div>
    </div>
  );
};

export default SignUpFirst;
