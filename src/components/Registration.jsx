import React, { useState } from 'react';
import { REGISTER_REQUEST } from "./AuthUrls.js";
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const is_valid_email = (email) => {
    const emailRegex = /^[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*(\.[a-z]+)$/i;
    return emailRegex.test(email);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (!is_valid_email(email)) {
      setErrorMessage('Invalid email');
      return;
    }
    // Create the payload
    const payload = {
      username,
      password,
      email,
    };

    // Make the POST request
    fetch(REGISTER_REQUEST.url, {
      method: REGISTER_REQUEST.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Registration successful', data);
        navigate("/login")
        // Perform any additional actions upon successful registration
      })
      .catch((error) => {
        console.error('Registration failed', error);
        // Handle any errors that occur during registration
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="form-group form-pad">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control form-width"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          
        />
      </div>
      <div className="form-group form-pad">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control form-width"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary form-pad">Register</button>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </form>
  );
}

export default RegistrationForm;
