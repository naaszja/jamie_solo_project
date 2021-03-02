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

    const user = useSelector(store => store.user);
    const bikes = useSelector(store => store.equipmentReducer);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_EQUIPMENT', payload: user })
    }, []);

    const checkIn = (event) => {
        history.push(`/checkin/${event.target.value}`);
    }

    const deleteEquipment = (event) => {
        console.log('In deleteEquipment() with an id of:', event.target.value);
        dispatch({ type: 'DELETE_EQUIPMENT', payload: event.target.value })
    }

    return (
        <>
            <div className='equipment-list'>
                <Row>
                    {bikes.map(bike =>
                        <Col lg="4" md="6" sm="12" key={bike.id}>
                            <div className="user-workOrder-div" >
                                <Card className="equipment-cards" bg="dark" border="primary" text="white" key={bike.id}>
                                    <Card.Header><h4>Bike id: {bike.id}</h4></Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <p className="bike-p">Make: {bike.make}</p>
                                            <p className="bike-p">Model: {bike.model}</p>
                                            <p className="bike-p">Year: {bike.year}</p>
                                        </Card.Text>
                                        <div className="cntrl-div">
                                            <Button variant="primary" size="block" onClick={checkIn} value={bike.id}>Check-In</Button>
                                            <Button variant="danger" size="block" onClick={deleteEquipment} value={bike.id}>Delete</Button>
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