import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './css/LoginPage.css';
import axios from "axios";


const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailClass, setEmailClass] = useState('email');
    const [passwordClass, setPasswordClass] = useState('password');

    const redirectUser = (event) => {
        event.preventDefault();
        let isValid = true;
        setEmailClass('email');
        setPasswordClass('password');

        if (!email || !email.includes('@') || !email.includes('.')) {
            isValid = false;
            setEmailClass('email required');
        }
        if (!password.trim()) {

            isValid = false;
            setPasswordClass('password required');

        }
        if (isValid) {
            handleLogin();
        } else {
            alert('There is something wrong with your input.');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/student/"+email+"/"+password); 
            if(response.status === 200){// if student profile exists
                navigate('/home');
                localStorage.setItem('user', JSON.stringify(response.data))
            }
        }catch (error){
            handleOrgLogin();
        }
    }
    //function checks if email is associated with an organization instead of a student profile
    const handleOrgLogin = async () => {
        try{
            const response = await axios.get("http://localhost:8080/api/student_org/"+email+"/"+password);
            if(response.status === 200){
                navigate('/home');
            }
        }
        catch(error){
            alert('Account not found, try again.');
            console.error("Error", error);
        }
    }

    const passwordRevealer = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="loginContainer">
            <form onSubmit={redirectUser}>
                <div className="welcomeLogin">
                    <h1>Welcome to<br/>UniConnect!</h1>
                    <br/>
                    <h3>Login or Create an Account now!</h3>
                </div>
                <div id="formfield">
                    <input
                        type="text"
                        name="text"
                        className={emailClass}
                        id="email"
                        size="50"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="text"
                        className={passwordClass}
                        id="password"
                        size="50"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <ul className="flex-inner">
                    <li>
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={passwordRevealer}
                        />
                        <label htmlFor="showPassword">  Show Password</label>
                    </li>
                </ul>
                <button type="submit" className="login">
                    Login
                </button>
            </form>
            <div className="options">
                <button className="forgot" onClick={() => alert("Well, that sucks, doesn't it")}>
                    Forgot your password?
                </button>
                <button className="create" onClick={() => navigate('/create')}>
                    Create An Account
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
