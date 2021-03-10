import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css';

function RegisterPage() {

  // Instantiate useHistory for navigation purposes
  const history = useHistory();

  return (
    <div className="reg-div">
      <img id="landing-img" src="https://cdn2.apstatic.com/photos/mtb/93874_smallMed_1554167190.jpg"></img>
      <RegisterForm />
      <center>
        <Button id="log-btn" variant="light"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
