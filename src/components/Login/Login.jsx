import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"
import { useAuth } from "hooks/use-auth";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin, errorMessage, isLoaded } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleLogin(username, password);
    } catch (err) {
      console.log(err)
    }

  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLoaded && <div className="loading-button"><div className="spinner"></div></div>}
        {isLoaded && <button className="buttonlog" type="submit">Log In</button>}
        <p>
          Or <Link className="link" to="/register">register</Link>
        </p>
      </form>
    </div>
  );

};

export default Login;