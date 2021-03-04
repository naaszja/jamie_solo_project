import React from 'react';
import { useDispatch } from 'react-redux';
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LogOutButton.css';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button id="user-log-btn" variant="light"
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
