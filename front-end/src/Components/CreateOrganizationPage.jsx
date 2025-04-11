import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/CreateOrganizationPage.css';
import axios from "axios";


const CreateOrganizationPage = () => {
  const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
  const [emailDistinctMessage, setEmailDistinctMessage] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [pfpError, setPfpError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  let navigate = useNavigate();

  const [email, set_email] = useState('')
  const [pass, set_pass] = useState('')
  const [org_name, set_org_name] = useState('')
  const [org_abrv, set_org_abrv] = useState('')
  const [org_cat, set_org_cat] = useState('')
  const [pres_fname, set_pres_fname] = useState('')
  const [pres_lname, set_pres_lname] = useState('')
  const [pres_email, set_pres_email] = useState('')
  const [tres_fname, set_tres_fname] = useState('')
  const [tres_lname, set_tres_lname] = useState('')
  const [tres_email, set_tres_email] = useState('')
  let sent = false;

  //handles using enter
  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.code === "Enter" && !disableSubmit) {
        event.preventDefault();
        document.getElementById('Next').click();
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

  const add = () => {
    // Create a new input element
    const newInput = document.createElement('input');
  
    // Set attriabutes for the input (ex., type, className, placeholder, etc.)
    newInput.type = 'url';
  
    // Get the container where you want to append the new input
    const inputContainer = document.getElementById('inputContainer');
  
    // Append the new input to the container
    inputContainer.appendChild(newInput);
  };
  
  const remove = () => {
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
        document.getElementById('Next').innerHTML = 'Submit';
      } else {
        document.getElementById('Next').innerHTML = 'Next';
      }

      fixStep(n);
    };
  }

  const handleSubmit = () => {
    if (!disableSubmit && currentTab === 4) {
      navigate('/home');
      if(sent===false){
        sent = true;
        saveOrg();
      }
    }
  }

  // const checkEmail = async () => {
  //   let pass = true;
  //   try{
  //       const response = await axios.get("http://localhost:8080/api/student_org/"+email);
  //       if (response.status === 200) {
  //         pass = false;
  //       } 
  //   } catch (error) {
  //     pass =  true;
  //   }
  //   return pass;
  // }

  const nextPrev = (n) => {
    const x = document.getElementsByClassName('tab');

    if (n === 1 && !validateForm()) {
      return false;
    }
    if (currentTab === 0 && !checkPasswordMatch()) {
      return false;
    }

    if (currentTab === 3 && !checkEmailDistinct()) {
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

    if (z.length !== 0 && (z[0].value === null || z[0].value === '') ) {
      z[0].classList.add('required');
    }else if(z.length !== 0 && !(z[0].value === null || z[0].value === '')){
      z[0].classList.remove('required');
    }

    for (i = 0; i < y.length; i++) {
      if (y[i].value === '' && y[i].type !== 'file' && y[i].id !== 'minor' && y[i].id !== 'abrv' && y[i].id !== 'homepage') {
        y[i].classList.add('required');
        valid = false;
      }else {
        y[i].classList.remove('required');
      }
    }

    //valid = checkEmail();

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

  const checkEmailDistinct = () => {
    const presE = document.getElementById('pres_email').value;
    const tresE = document.getElementById('tres_email').value;
    if (presE.trim() === tresE.trim()) {
      setEmailDistinctMessage('Emails must not match');
      document.getElementById('pres_email').classList.add('required');
      document.getElementById('tres_email').classList.add('required');
      return false;
    } else {
      setEmailDistinctMessage('');
      document.getElementById('pres_email').classList.remove('required');
      document.getElementById('tres_email').classList.remove('required');
      return true;
    }
  };

  const checkPasswordMatch = () => {
    const password1 = document.getElementById('password').value;
    const password2 = document.getElementById('confirm-password').value;
    if (password1 !== password2) {
      setPasswordMatchMessage('Passwords do not match');
      return false;
    } else {
      setPasswordMatchMessage('');
      return true;
    }
  };

  useEffect(() => {
    showTab(currentTab);
  }, [currentTab]);

  function saveOrg(){
    
    const org = {email, pass, org_name, org_abrv, org_cat, pres_fname, pres_lname, pres_email, tres_fname, tres_lname, tres_email}
    console.log(org)
    try {
      axios.post("http://localhost:8080/api/student_org", org, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log(response.data);
        // Navigate to another page or perform any other actions upon successful response
      }).catch((error) => {
        console.error('Error:', error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function HandleEmail(e){
    set_email(e.target.value)
  }

  function HandlePass(e){
    set_pass(e.target.value) 
  }

  function HandleOrgName(e){
    set_org_name(e.target.value)
  }

  function HandleOrgAbrv(e){
    set_org_abrv(e.target.value)
  }

  function HandleOrgCat(e){
    set_org_cat(e.target.value)  
  }

  function HandlePresF(e){
    set_pres_fname(e.target.value)
  }

  function HandlePresL(e){
    set_pres_lname(e.target.value)
  }

  function HandlePresE(e){
    set_pres_email(e.target.value)
  }

  function HandleTresF(e){
    set_tres_fname(e.target.value)
  }

  function HandleTresL(e){
    set_tres_lname(e.target.value)
  }

  function HandleTresE(e){
    set_tres_email(e.target.value)
  }

  return (
    <div>
      <div className="createOrganizationContainer">
        <form id="register" onSubmit={(e) => e.preventDefault()}>
            <div className="welcome">
                <h1> Create Student <br/>Organization </h1>
            </div>
            <div className="tab" id="formfields">
                <input type="text" name="text" className="email" id="email" size="50" placeholder="Email" onChange={HandleEmail}/>
                <input type="password" name="text" className="password" id="password" size="50" placeholder="Password" />
                <input type="password" name="text" className="password" id="confirm-password" size="50" placeholder="Confirm Password" onChange={HandlePass}/>
                {passwordMatchMessage && <span id="error" className="error">{passwordMatchMessage}</span>}
            </div>
            <div className="tab">
                <input type="text" name="text" className="Org_Name" id="org_name" size="50" placeholder="Organization Name" onChange={HandleOrgName}/>
                <input type="text" name="text" className="Abrv" id="abrv" size="50" placeholder="Abbreviation" onChange={HandleOrgAbrv}/>
                <select name="Org-Cat" id="org_cat" onChange={HandleOrgCat}> 
                    <option value="" disabled selected>Select Organization Category</option>
                    <option value="acad_group">Academic Group & Honor Societies</option> 
                    <option value="stud_aff">UIC Student Affairs</option> 
                    <option value="comm_service">Community Service Agency</option> 
                    <option value="lead_org">Leadership Organization</option> 
                    <option value="uni_act">University Activities</option>
                    <option value="cult_group">Cultural Group</option>
                    <option value="lit_perf">Literature And Performance Arts Group</option>
                    <option value="pre_prof">Pre-Professional Group</option>  
                    <option value="rel">Religious Group</option>
                    <option value="sport">Sports Club</option>
                    <option value="frat_sor">Fraternity/Sorority</option>        
                </select>
            </div>
            <div className="tab">
                <textarea id="general_description" name="general_description" rows="4" placeholder="General Description"></textarea>
                <div className="word-count" id="general_description_count">0/700 characters</div>

                <textarea id="mission_statement" name="mission_statement" rows="4" placeholder="Mission Statement"></textarea>
                <div className="word-count" id="mission_statement_count">0/700 characters</div>

                <textarea id="goals" name="goals" rows="4" placeholder="Goals"></textarea>
                <div className="word-count" id="goals_count">0/700 characters</div>

                <textarea id="membership_benefits" name="membership_benefits" rows="4" placeholder="Membership Benefits"></textarea>
                <div className="word-count" id="membership_benefits_count">0/700 characters</div>
            </div>

            <div className="tab">
                <label htmlFor="pres_name" className="title_label">President:</label>
                <input type="text" name="text" className="pres_name" id="pres_name" size="50" placeholder="First Name" onChange={HandlePresF}/>
                <input type="text" name="text" className="pres_name" id="pres_name" size="50" placeholder="Last Name" onChange={HandlePresL}/>
                <input type="text" name="text" className="pres_name" id="pres_email" size="50" placeholder="E-Mail" onChange={HandlePresE}/>

                <label htmlFor="pres_name" className="title_label">Treasurer:</label>
                <input type="text" name="text" className="tres_name" id="tres_name" size="50" placeholder="First Name" onChange={HandleTresF}/>
                <input type="text" name="text" className="tres_name" id="tres_name" size="50" placeholder="Last Name" onChange={HandleTresL}/>
                <input type="text" name="text" className="tres_name" id="tres_email" size="50" placeholder="E-Mail" onChange={HandleTresE}/>
                {emailDistinctMessage && <span id="error" className="error">{emailDistinctMessage}</span>}

            </div>

            <div className="tab" id = "pfp" style = {{textAlign: 'center'}}>
                <h3>Upload Profile Picture</h3>
                <img id="previewImage" src={imagePreviewUrl} alt="Preview" style={{display: 'none', textAlign: 'center', alignItems: 'center'}}/>
                <input type = "file" id = "filename" onChange={handlePfpSelect}/>
                {pfpError && <span id="error" className="error">{pfpError}</span>}
                <br/>
                <br/>
                <label htmlFor="link" id="social">Social Links</label>
                <div id = "inputContainer" style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <input type="url" className = "link" id="homepage" name="homepage"/>    
                </div>        
                <div className="buttonrow" style = {{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <button type = "button" className = "courseButton" id = "removeCourse" onClick={remove}>- Remove</button>
                    <button type = "button" className = "courseButton" id = "addCourse" onClick={add}>+ Add</button>
                </div>

            </div>

            <button type="Button" className="Next" id = "Next" onClick={() => nextPrev(1)} disabled={disableSubmit}>Next</button> 

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

export default CreateOrganizationPage;
