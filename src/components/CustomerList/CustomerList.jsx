import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
//Bring in bootstrap components and css
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerList.css';
import UserInput from '../UserInput/UserInput';

function CustomerList() {

    // Instantiate dispatch so we can communicate with our sagas
    const dispatch = useDispatch();

    // A piece of state to control the conditional rendering of our update user information form
    const [editMode, setEditMode] = useState(false);

    // useEffect will fetch the user information upon page load
    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS' })
    }, []);

    // Bring in the user portion of our store
    const user = useSelector(store => store.user);

    // Log for debugging
    console.log('User:', user);

    // Function to control the state of our state. When true the update form will display, false it will not
    const updateUser = () => {
        setEditMode(!editMode);
    }

    // Function to delete a user from the db by user.id
    const deleteUser = (e) => {
        dispatch({ type: 'DELETE_CUSTOMER', payload: e.target.value })
    }

    return (
        <div id="info-container">
            <div className="info-div">
                <Container>
                    <Row>
                        <Col xs={12} md={8} lg={6}>
                            <Card id="user-card" bg="light" border="dark">
                                <Card.Header><h4>User Information</h4></Card.Header>
                                <Card.Body>
                                    <Card.Title>User ID: {user.id}</Card.Title>
                                    <Card.Text>
                                        <p>Name: {user.lastName}, {user.firstName}</p>
                                        <p>Phone: {user.phone}</p>
                                        <p>Email: {user.email}</p>
                                    </Card.Text>
                                    <Button variant="outline-info" size="block" onClick={updateUser} value={user.id}>Update</Button>
                                    <Button variant="outline-danger" size="block" onClick={deleteUser} value={user.id}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {(editMode ? <><hr /><UserInput /></> : <></>)}
                </Container>
            </div>
        </div>
    );

}

// this allows us to use <App /> in index.js
export default CustomerList;