import React from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { IoLogOut } from 'react-icons/io5';
import '../Logout/Logout.scss';
require('dotenv').config();

const Logout = () => {
  let history = useHistory();

  const onLogoutSuccess = () => {
    console.log('[Logout Success] currentUser:');
    localStorage.clear();
    alert('Has cerrado sesión.');
    history.push('/');
  };

  return (
    <div>
      <GoogleLogout
        clientId={process.env.GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <button
            className='google-logout-btn'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}>
            <IoLogOut />
          </button>
        )}
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
};

export default Logout;
