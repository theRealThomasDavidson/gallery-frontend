import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { LOGIN_REQUEST } from './AuthUrls';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const payload = {
      username,
      password,
    };

    fetch(LOGIN_REQUEST.url, {
      method: LOGIN_REQUEST.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        document.cookie = `jwt=Bearer ${data.jwt}`;
        navigate("/account")

        // Handle JWT response as needed
      })
      .catch((error) => {
        console.error('Login failed', error);
        // Handle login error
      });

    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group form-pad">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          className="form-control form-width"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group form-pad">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-control form-width"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary form-pad">
        Login
      </button>
    </form>
  );
}

export default LoginForm;