import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './RegisterForm.css';

function RegisterForm() {

  // State to hole username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Bring in errors reducer from our store
  const errors = useSelector((store) => store.errors);

  // Instantiate useDispatch to communicate with our sagas
  const dispatch = useDispatch();

  // Function to handle the submission of a new users information
  const registerUser = (event) => {
    event.preventDefault();

    // Dispatch our new users info to have a new entry created in the db
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form id='reg-box' className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
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
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <Button variant="info" name="submit" value="Register" onClick={registerUser}>Register</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
