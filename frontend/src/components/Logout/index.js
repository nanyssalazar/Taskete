import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import "../Logout/Logout.scss";
require("dotenv").config();

const Logout = () => {
  const [isLoggedIn, setIsLogedIn] = useState(false);
  let history = useHistory();

  const onLogoutSuccess = () => {
    setIsLogedIn(false);
    console.log("[Logout Success] currentUser:");
    localStorage.removeItem("email");
    localStorage.removeItem("nombre");
    alert("Has cerrado sesión.");
    history.push("/");
  };

  return (
    <div>
      <GoogleLogout
        clientId={process.env.GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <button
            className="google-logout-btn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Log out
          </button>
        )}
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
};

export default Logout;
