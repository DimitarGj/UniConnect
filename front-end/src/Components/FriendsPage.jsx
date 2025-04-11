import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './css/FriendsPage.css';
import axios from 'axios';
import HeaderNavBar from './HeaderNavBar.jsx';
import blankProfile from './public/images/Blank-Profile.jpg';

const FriendsPage = ( {userProfile} ) => {
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);

    const user = localStorage.getItem('user');
    const userData = user ? JSON.parse(user) : null;

    useEffect(() => {
        const CountFollowers = async () => {
          try{
            const response = await axios.get('http://localhost:8080/api/student/followers/'+userData.id);
            setFriends(response.data);
          }catch(error){
            console.error('Error fetching followers', error);
          }
        };
    
        CountFollowers();
      }, []); 


    return (
        <div className="friendsPageContainer">
            <HeaderNavBar />
            <div className="friendsPage">
                <h1>Followers</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Profile Picture</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {friends.map(friend => (
                            <tr key={friend.id}>
                                <td><img src={blankProfile} alt={friend.firstName}  className="profilePicFriendsPage"/></td>
                                <td>{friend.firstName} {friend.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default FriendsPage;