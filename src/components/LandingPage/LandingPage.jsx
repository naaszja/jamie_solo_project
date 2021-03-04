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
      <div className="grid">
        <div className="row">
        {/* <div className="grid-col order-md-1 col-md-8"> */}
          <div className="grid-col col-xs-10">
          <h1 id="welcome-h1">Welcome!</h1>
          <img id="landing-img" src="https://cdn2.apstatic.com/photos/mtb/93874_smallMed_1554167190.jpg"></img>
            <RegisterForm />
            <center>
              <h4>Already a Member?</h4>
              <Button id="land-log-btn" variant="light" onClick={onLogin}>
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
