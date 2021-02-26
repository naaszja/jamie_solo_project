import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

//Bring in bootstrap components and css
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // Bring in useHistory for navigation
  const history = useHistory();

  // Function to navigate to the work orders page
  const getWorkOrders = () => {
    history.push('/workOrders');
  }

  // Function to navigate to the equipment page
  const getEquipmentList = () => {
    history.push('/equipmentList');
  }

  // Function to navigate to the customer information page
  const getCustomerList = () => {
    history.push('/customerList');
  }

  // Set the access setting based on the accesslvl in the DB
const access = ((user.accesslvl === 1) ? "Admin" : "Customer");

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Access Level: {access} </p>
      <h4>Current Work Orders</h4>
      <hr/>
      <p>{(user.accesslvl === 1) ? <Button variant="warning" onClick={getEquipmentList}>View Equipment List</Button> : <Button onClick={getEquipmentList}>View Equipment List</Button>}</p>
      <p>{(user.accesslvl === 1) ? <><Button variant="warning" onClick={getWorkOrders}>View Work Orders</Button></> : <></>}</p>
      <p>{(user.accesslvl === 1) ? <Button variant="warning" onClick={getCustomerList}>Update Personal Information</Button> : <Button onClick={getCustomerList}>View Equipment List</Button>}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
