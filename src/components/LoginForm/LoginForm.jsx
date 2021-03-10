import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './LoginForm.css';

function LoginForm() {

  // State to hold the username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Bring in the errors portion of our store
  const errors = useSelector(store => store.errors);

  // Instantiate useDispatch to communicate with our sags
  const dispatch = useDispatch();

  // Instantiat useHistory for navigation
  const history = useHistory();

  // Funtion to handle the submission of username and password.
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form id="log-box" className="formPanel" onSubmit={login}>
      <img id="landing-img" src="https://media.giphy.com/media/xUPGcrr9fl9FVbFBi8/giphy.gif"></img>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <Button variant="info" type="submit" name="submit" value="Log In" onClick={() => history.push('/user')}>Login</Button>
      </div>
    </form>
  );
}

export default LoginForm;
