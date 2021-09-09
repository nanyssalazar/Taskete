import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// import api from "../../services/api.js";
import '../Login/Login.scss';
import api from '../../services/api.js';
require('dotenv').config();

const Login = () => {
  const [isLoggedIn, setIsLogedIn] = useState(false);
  let history = useHistory();

  const onLoginSuccess = async (res) => {
    setIsLogedIn(true);
    console.log('[Login Success] currentUser:', res.profileObj);
    localStorage.setItem('givenName', res.profileObj.givenName);
    localStorage.setItem('familyName', res.profileObj.familyName);
    localStorage.setItem('email', res.profileObj.email);
    localStorage.setItem('googleId', res.profileObj.googleId);
    localStorage.setItem('imageUrl', res.profileObj.imageUrl);
    localStorage.setItem('name', res.profileObj.name);
    checkUser();
    // codigo bdd
    history.push('/lists');
  };

  const onLoginFailure = (res) => {
    console.log('[Login failed] res:', res);
  };

  const checkUser = () => {
    console.log('here');
    api
      .post('/users', {
        givenName: localStorage.getItem('givenName'),
        familyName: localStorage.getItem('familyName'),
        email: localStorage.getItem('email'),
        googleId: localStorage.getItem('googleId'),
        imageUrl: localStorage.getItem('imageUrl'),
        name: localStorage.getItem('name'),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        // cambiar aqui
        <button
          className='google-login-btn'
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}>
          Login with Google
        </button>
      )}
      buttonText='Login'
      isSignedIn={true}
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Login;
