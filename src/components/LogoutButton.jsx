import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_REQUEST } from './AuthUrls';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const jwtCookie = document.cookie.split('; ').find((cookie) => cookie.startsWith('jwt=')).replace('jwt=', '');

      if (jwtCookie) {
        // logout request with auth token
        const response = await fetch(LOGOUT_REQUEST.url, {
          method: LOGOUT_REQUEST.method,
          headers: {
            'Authorization': jwtCookie,
          },
        });

        if (response.status === 200) {
          // Logout successful, redirect to homepage
          document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          navigate('/');
        } else if (response.status === 401) {
          // Not logged in, handle error accordingly
          console.log('Not logged in');
          navigate('/');
        } else {
          // Other errors, handle error accordingly
          console.log('Error occurred during logout');
        }
      } else {
        console.error('JWT token not found in the cookie.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred during logout', error);
    }
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
