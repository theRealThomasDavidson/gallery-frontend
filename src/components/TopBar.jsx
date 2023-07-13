
import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function TopBar() {
  const isLoggedIn = document.cookie.includes('jwt');
  const navigate = useNavigate();

  const handleNewUserClick = () => {
    navigate('/new-user');
  };
  const handleHomeClick = () => {
    const errorMessage = 'This is an error message from TopBar';
    navigate('/');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleAccountClick = () => {
    navigate('/account');
  };



  return (
 <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <p className="navbar-brand me-auto" onClick={handleHomeClick}>
            Home
          </p>
          <h1 className="navbar-title">ThomasDavidson.gallery</h1>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item me-3">
                  <button className="btn btn-outline-primary" onClick={handleAccountClick}>Account</button>
                </li>
                <li className="nav-item me-3">
                  <LogoutButton />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-3">
                  <button className="btn btn-outline-primary" onClick={handleLoginClick}>Login</button>
                </li>  
                <li className="nav-item me-3">
                  <button className="btn btn-outline-success" onClick={handleNewUserClick}>New User</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="navbar-spacer" />
    </>
  );
}

export default TopBar;