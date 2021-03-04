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
    history.push(`/workOrder/${event.target.value}`);
  }

  const deleteWorkOrder = (event) => {
    console.log('Job id:', event.target.value);
    dispatch({ type: 'DELETE_WORKORDER', payload: event.target.value });
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

  // Funtion to show the QR code containing user, bike, and workorder information
const showQR = (event) => {
  console.log('Job id:', event.target.value)
  dispatch({ type: 'FETCH_SINGLE_WORKORDER', payload: event.target.value });
  history.push(`/qr/${event.target.value}`);
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
        {(jobs.length > 0) ?
          <Row>
            {jobs.map(job =>
              <Col lg="4" md="6" sm="12" key={job.id}>
                <div className="user-workOrder-div" key={job.id}>
                  <Card className="workOrder-card" bg="light" border="dark" text="black" key={job.id}>
                    <Card.Header>Job id: {job.id}</Card.Header>
                    <Card.Body>
                      <Card.Title>Work Order Status: {(job.completed ? <div className='job-complete'>Complete</div> : <div className="job-not-complete">Not Complete</div>)}</Card.Title>
                      <Card.Text className="workOrder-card-text">
                        <p>Services: {job.services}</p>
                        <p>Estimate: ${job.total_price}</p>
                        <p>Bike id: {job.bike_id}</p>
                      </Card.Text>
                      {(user.accesslvl === 1) ? <Button id="select-job-btn" variant="light" value={job.id} size="block" onClick={fetchSingleWorkOrder}>Select Job</Button> : <Button variant="outline-primary" className="cust-btns" onClick={showQR} size="block" value={job.id}>Check-In QR</Button>}
                      <Button id="delete-job-btn" variant="danger" size="block" onClick={deleteWorkOrder} value={job.id}>Delete</Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            )}
          </Row> : <em><p>(No Work Orders to Display)</p></em>}
        <hr />
        <p>{(user.accesslvl === 1) ? <Button variant="secondary" onClick={getEquipmentList}>View Equipment List</Button> : <Button className="cust-btns" variant="outline-primary" onClick={getEquipmentList}>View Equipment List</Button>}</p>
        <p>{(user.accesslvl === 1) ? <Button variant="secondary" onClick={getCustomerList}>Personal Information</Button> : <Button className="cust-btns" variant="outline-primary" onClick={getCustomerList}>Personal Information</Button>}</p>
        <LogOutButton className="btn" />
      </div>
    </Container>

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
