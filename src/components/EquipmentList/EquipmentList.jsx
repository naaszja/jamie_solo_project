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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_EQUIPMENT' })
    }, []);

    const bikes = useSelector(store => store.equipmentReducer);
    console.log('Bikes:', bikes);

    const serviceHistory = () => {
        console.log('in serviceHistory()');
    }
    return (
        <div className='equipment-list'>
            <EquipmentInput/>
            <h1>BIKES!</h1>
            {bikes.map( bike =>
                <div className="bike-div" key={bike.id}>
                    <p>bike id: {bike.id}</p>
                    <p>Make:{bike.make} | Model: {bike.model} | Year: {bike.year} | <Button variant="dark" size="sm" onClick={serviceHistory}>Service History</Button></p>
                    <hr/>
                </div>
            )}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default EquipmentList;