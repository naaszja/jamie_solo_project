import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './LoginPage.css';

//Form to allow use to enter login credentials
function LoginPage() {
  const history = useHistory();

  return (
    <div className="login-div">
      <LoginForm />
      <center>
        <Button id="reg-btn" variant="light"
          onClick={() => {
            history.push('/registration')
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
