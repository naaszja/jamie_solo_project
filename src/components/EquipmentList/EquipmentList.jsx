import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EquipmentList.css';
//Bring in bootstrap components and css
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EquipmentInput from '../EquipmentInput/EquipmentInput';

function EquipmentList() {

    // Bring in the 'user' and 'equipment' portions of our store
    const user = useSelector(store => store.user);
    const bikes = useSelector(store => store.equipmentReducer);

    // Instantiate use history for navigation
    const history = useHistory();

    // Instantiate useDispatch to communicate with sagas
    const dispatch = useDispatch();

    // useEffect 
    useEffect(() => {
        dispatch({ type: 'FETCH_EQUIPMENT', payload: user })
    }, []);

    // Function to navigate to the check-in page with a specific equipment_id
    const checkIn = (event) => {
        console.log('Job id:', event.target.value);
        history.push(`/checkin/${event.target.value}`);
    }

    // Function to delete a piece of equipment from the db by id
    const deleteEquipment = (event) => {
        console.log('In deleteEquipment() with an id of:', event.target.value);
        dispatch({ type: 'DELETE_EQUIPMENT', payload: event.target.value })
    }

    return (
        <>
            <div className='equipment-list'>
                <Row>
                    {bikes.map(bike =>
                        <Col lg="4" sm="6" xs="10" key={bike.id}>
                            <div className="user-workOrder-div" >
                                <Card className="equipment-cards" bg="light" border="dark" key={bike.id}>
                                    <Card.Header><h4>Bike id: {bike.id}</h4></Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <p className="bike-p">Make: {bike.make}</p>
                                            <p className="bike-p">Model: {bike.model}</p>
                                            <p className="bike-p">Year: {bike.year}</p>
                                            <p className="bike-p">Owner: {(user.id === bike.user_id) ? <>You Own This Bike</> : <>User #{bike.user_id}</>}</p>
                                        </Card.Text>
                                        <div className="cntrl-div">
                                            {(bike.user_id === user.id ) ? <Button variant="outline-info" size="block" onClick={checkIn} value={bike.id}>Check-In</Button> : <></>}
                                            <Button variant="outline-danger" size="block" onClick={deleteEquipment} value={bike.id}>Delete</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>)}
                </Row>
            </div>
            <div className='equipment-input'>
                <EquipmentInput />
            </div>
        </>
    );
}

// this allows us to use <App /> in index.js
export default EquipmentList;