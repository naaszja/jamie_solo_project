import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function LandingPage() {

  // Set the heading dispaly purposes only
  const [heading, setHeading] = useState('Welcome');

  // Instantiate useHistory for navigation purposes
  const history = useHistory();

  // Instantiate useDispatch to fetch the current customers information
  const dispatch = useDispatch();

  // Bring in the store so we can access the user information
  const store = useSelector(store => store);

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="row">
          <div className="grid-col order-md-1 col-md-8">
            <p>
              INTRO
          </p>

            <p>
              MEAT
          </p>

            <p>
              CONCLUSION
          </p>
          </div>
          <div className="grid-col order-md-2 col-xs-12 col-md-4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <Button onClick={onLogin}>
                Login
            </Button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
