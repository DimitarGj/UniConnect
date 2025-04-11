import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './css/HeaderNavBar.css';
import blankProfile from './public/images/Blank-Profile.jpg';
import uicLogo from './public/images/UIC-Circle-Logo.png';
import {SearchBar} from './SearchBar';
import { SearchResultsList } from './SearchResultsList';
    
const HeaderNavBar = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    }
    const signOut = () => {
      navigate('/')
    }
    const goToHome = () => {
        navigate('/home');
    }

    const goToProfile = () => {
        navigate('/profile-page');
    }


    const [results, setResults] = useState([]);

    return(
        <nav className="Navigation-Bar">
            <div className="Profile-Picture">
              <img className="headerProfilePic" src={blankProfile} alt="Blank-Profile" onClick={goToProfile} style = {{ cursor: 'pointer'}}/>
              <p className="headerTitle" onClick={goToHome} style = {{ cursor: 'pointer'}}>UniConnect</p>
            </div>
    
            <div className="Search-Bar">
                <SearchBar setResults={setResults}/>
                {results.length > 0 && <SearchResultsList results={results}/>}
            </div>
    
            <div className="Notification-Zone">
            <i className="bi bi-grid" id="grid" onClick={toggleDropdown}></i>
              <img src={uicLogo} alt="UniConnect Logo" className="circleLogo" />
              {showDropdown && (
                  <div className="dropdown-menu">
                      <button onClick={signOut}>
                        <i className="bi bi-box-arrow-right" style={{ marginRight: '2px' }}></i>
                        Sign Out
                        </button>
                  </div>
              )}
            </div>
          </nav>
    );
}

export default HeaderNavBar;