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

    const equipments = useSelector(store => store.equipmentReducer);

    return (
        <div className='equipment-list'>
            <h1>equipmentS!</h1>
            {equipments.map( equipment =>
                <div key={equipment.id}>
                    <h4>equipment id: {equipment.id}</h4>
                    <h4>Make:<p>{equipment.make}</p></h4>
                    <h4>Model: {equipment.model}</h4>
                    <h4>Year: {equipment.year}</h4>
                    <br/> <br/>
                </div>
            )}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default EquipmentList;