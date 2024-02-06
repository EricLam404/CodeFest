'use client'

// pages/login.js
import React, { useState } from 'react';
import styles from './page.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wholeBox}>
        <h1 className={styles.header}>Login Page</h1>
        <p className={styles.smallText}>Please enter your username and password to create an account and save your work</p>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div>
              <label className={styles.label} htmlFor="username">
                Username:
              </label>
              <input
                className={styles.input}
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="password">
                Password:
              </label>
              <input
                className={styles.input}
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className={styles.button} type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
