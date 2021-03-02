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

    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS' })
    }, []);

    const user = useSelector(store => store.user);
    console.log('User:', user);

    const updateUser = () => {
        console.log('in updateUser()');
        setEditMode(!editMode);
    }

    const deleteUser = (e) => {
        dispatch({ type: 'DELETE_CUSTOMER', payload: e.target.value })
    }

    return (
        <div id="info-container">
            <div className="info-div">
                <Container>
                    <Row>
                        <Col xs={12} md={8} lg={6}>
                            <Card bg="dark" text="white">
                                <Card.Header><h4>User Information</h4></Card.Header>
                                <Card.Body>
                                    <Card.Title>User ID: {user.id}</Card.Title>
                                    <Card.Text>
                                        <p>Name: {user.lastName}, {user.firstName}</p>
                                        <p>Phone: {user.phone}</p>
                                        <p>Email: {user.email}</p>
                                    </Card.Text>
                                    <Button variant="success" size="block" onClick={updateUser} value={user.id}>Update</Button>
                                    <Button variant="danger" size="block" onClick={deleteUser} value={user.id}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <hr />
                    {(editMode ? <UserInput editMode={editMode} /> : <></>)}
                </Container>
            </div>
        </div>
    );

}

// this allows us to use <App /> in index.js
export default CustomerList;