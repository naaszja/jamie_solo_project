import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_EQUIPMENT', payload: user })
    }, []);

    const serviceHistory = (event) => {
        console.log('in serviceHistory() with an id of:', event.target.value);
    }

    const deleteEquipment = (event) => {
        console.log('In deleteEquipment() with an id of:', event.target.value);
        dispatch({ type: 'DELETE_EQUIPMENT', payload: event.target.value })
    }

    return (
        <div className='equipment-list'>
            <EquipmentInput />
            <h1>BIKES!</h1>
            {bikes.map(bike =>
                <div className="bike-div" key={bike.id}>
                    Bike id: {bike.id} | Make: {bike.make} | Model: {bike.model} | Year: {bike.year} <Button variant="primary" size="sm" onClick={serviceHistory} value={bike.id}>Service History</Button> {(user.accesslvl > 0) ? <Button variant="danger" size="sm" onClick={deleteEquipment} value={bike.id}>Delete</Button> : <></>}
                    <hr />
                </div>
            )}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default EquipmentList;