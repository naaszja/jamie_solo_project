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

function EquipmentList() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_EQUIPMENT' })
    }, []);

    const bikes = useSelector(store => store.equipmentReducer);
    debugger;
    console.log('Bikes:', bikes);

    return (
        <div className='equipment-list'>
            <h1>BIKES!</h1>
            {bikes.map( bike =>
                <div key={bike.id}>
                    <h4>bike id: {bike.id}</h4>
                    <h4>Make:<p>{bike.make}</p></h4>
                    <h4>Model: {bike.model}</h4>
                    <h4>Year: {bike.year}</h4>
                    <br/> <br/>
                </div>
            )}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default EquipmentList;