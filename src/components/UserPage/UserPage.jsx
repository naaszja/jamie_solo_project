import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserPage.css';

//Bring in bootstrap components and css
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const jobs = useSelector(store => store.workOrderReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_WORKORDERS' })
  }, []);

  const fetchSingleWorkOrder = (event) => {
    dispatch({ type: 'FETCH_SINGLE_WORKORDER', payload: event.target.value });
    history.push('/workOrder');
  }

  const deleteWorkOrder = (event) => {
    dispatch({ type: 'DELETE_WORKORDER', payload: event.target.value })
    dispatch({ type: 'FETCH_WORKORDERS' })
  }

  // Bring in useHistory for navigation
  const history = useHistory();

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
    <Container>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <p>Access Level: {access} </p>
        <h4>Current Work Orders</h4>
        <hr />
        <Row>
          {jobs.map(job =>
            <Col lg="4" md="6" sm="12" key={job.id}>
              <div className="user-workOrder-div" key={job.id}>
                <Card className="workOrder-card" bg="dark" border="primary" text="white" key={job.id}>
                  <Card.Header>Job id: {job.id}</Card.Header>
                  <Card.Body>
                    <Card.Title>Work Order Status: {(job.completed ? <div className='job-complete'>Complete</div> : <div className="job-not-complete">Not Complete</div>)}</Card.Title>
                    <Card.Text className="workOrder-card-text">
                      <p>Services: {job.services}</p>
                      <p>Estimate: ${job.total_price}</p>
                      <p>Bike id: {job.bike_id}</p>
                    </Card.Text>
                    {(user.accesslvl === 1) ? <Button value={job.id} variant="warning" size="block" onClick={fetchSingleWorkOrder}>Select Job</Button> : <></>}
                    <Button variant="danger" size="block" onClick={deleteWorkOrder}>Delete</Button>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          )}
        </Row>
        <hr />
        <p>{(user.accesslvl === 1) ? <Button variant="warning" onClick={getEquipmentList}>View Equipment List</Button> : <Button onClick={getEquipmentList}>View Equipment List</Button>}</p>
        <p>{(user.accesslvl === 1) ? <Button variant="warning" onClick={getCustomerList}>Personal Information</Button> : <Button onClick={getCustomerList}>Personal Information</Button>}</p>
        <LogOutButton className="btn" />
      </div>
    </Container>

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
