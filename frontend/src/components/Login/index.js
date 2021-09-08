import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
// import api from "../../services/api.js";
import "../Login/Login.scss";
require("dotenv").config();

const Login = () => {
  const [isLoggedIn, setIsLogedIn] = useState(false);
  let history = useHistory();

  const onLoginSuccess = async (res) => {
    setIsLogedIn(true);
    console.log("[Login Success] currentUser:", res.profileObj);
    localStorage.setItem("email", res.profileObj.email);
    localStorage.setItem(
      "nombre",
      res.profileObj.givenName + " " + res.profileObj.familyName
    );
    // codigo bdd
    history.push("/lists");
  };

  const onLoginFailure = (res) => {
    console.log("[Login failed] res:", res);
  };

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        // cambiar aqui
        <button
          className="google-login-btn"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Login with Google
        </button>
      )}
      buttonText="Login"
      isSignedIn={true}
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Login;
