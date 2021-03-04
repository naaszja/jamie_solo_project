import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './LoginPage.css';


function LoginPage() {
  const history = useHistory();

  return (
    <div className="login-div">
      <img id="landing-img" src="https://cdn2.apstatic.com/photos/mtb/93874_smallMed_1554167190.jpg"></img>
      <LoginForm />
      <center>
        <Button id="reg-btn" variant="light"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
