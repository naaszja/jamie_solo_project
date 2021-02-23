import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerList.css';
//Bring in bootstrap components and css
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CustomerList() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS' })
    }, []);

    const customers = useSelector(store => store.customerReducer);
    debugger;
    console.log('Customers:', customers);

    return (
        <div className='customer-list'>
            <h1>CUSTOMER_LIST</h1>
            {/* {bikes.map( bike =>
                <div className="bike-div" key={bike.id}>
                    <h4>bike id: {bike.id}</h4>
                    <h4>Make:<p>{bike.make}</p></h4>
                    <h4>Model: {bike.model}</h4>
                    <h4>Year: {bike.year}</h4>
                    <hr/>
                </div>
            )} */}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default CustomerList;