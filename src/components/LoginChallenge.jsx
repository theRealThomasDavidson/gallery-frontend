import React, { useState } from 'react';
import bcrypt from "bcryptjs";
import sha3 from 'js-sha3';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

import { useNavigate } from 'react-router-dom';
import { LOGIN_REQUEST_CHALLENGE, LOGIN_REQUEST_ANSWER } from './AuthUrls';

function LoginChallengeForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const encoder = new TextEncoder();
  const hexToBase64 = (hexStr) => {
    let base64 = "";
    for(let i = 0; i < hexStr.length; i++) {
      base64 += !(i - 1 & 1) ? String.fromCharCode(parseInt(hexStr.substring(i - 1, i + 1), 16)) : ""
    }
    return btoa(base64);
   }
  const setPass = (password, salt, nonce) => {
    const b_hashed_password = bcrypt.hashSync(password, salt);
    const encoded_concat = encoder.encode(b_hashed_password + nonce);
    const sn_hashed_password = sha3.sha3_512(encoded_concat);
    return hexToBase64(sn_hashed_password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    fetch(LOGIN_REQUEST_CHALLENGE.url, {
      method: LOGIN_REQUEST_CHALLENGE.method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies in the request
      body: JSON.stringify({ username }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Challenge request failed');
        }
        return response.json();
      })
      .then((challengeResponse) => {
        // Process the challenge response, retrieve salt and nonce
        const salt = challengeResponse.salt;
        const nonce = challengeResponse.nonce;
  
        // Generate password hash based on salt and nonce
        const hashedPassword = setPass(password, salt, nonce);
  
        // Prepare answer request data
        const answerData = {
          "password": hashedPassword,
        };
  
        // Send answer request
        return fetch(LOGIN_REQUEST_ANSWER.url, {
          method: LOGIN_REQUEST_ANSWER.method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies in the request
          body: JSON.stringify(answerData),
        });
      })
      .then((answerResponse) => {
        if (!answerResponse.ok) {
          throw new Error('Answer request failed');
        }
        return answerResponse.json();
      })
      .then((answerResult) => {
        // Handle the successful login response
        document.cookie = `jwt=Bearer ${answerResult.jwt}`;
        navigate("/account");
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
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

export default LoginChallengeForm;