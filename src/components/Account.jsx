import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VERIFY_REQUEST } from './AuthUrls';
import useInitialEffect from '../hooks/useInitialEffect';

function AccountPage() {
  const [cont, setCont] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useInitialEffect(() => {
    const handleNavigate = () => {
      navigate('/');
    };

    const fetchUserInformation = async () => {
      try {
        const jwtCookie = document.cookie
          .split('; ')
          .find((cookie) => cookie.startsWith('jwt='))
          .replace('jwt=', '');

        if (jwtCookie) {
          const response = await fetch(VERIFY_REQUEST.url, {
            method: VERIFY_REQUEST.method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: jwtCookie,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
          } else if (response.status === 401 || response.status === 422) {
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            handleNavigate();
          } else {
            console.error('Failed to fetch user information:', response.statusText);
          }
        } else {
          console.error('JWT token not found in the cookie.');
        }
      } catch (error) {
        console.error('Failed to fetch user information', error);
        handleNavigate();
      }
    };
    if (cont){
        setCont(false);
        fetchUserInformation();
    };
  }, []); // Empty dependency array

  return (
    <div>
      <h1>Hello, {username}!</h1>
      <p>We are happy to see you again.</p>
    </div>
  );
}

export default AccountPage;
