import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
//Bring in bootstrap components and css
// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerList.css';
import UserInput from '../UserInput/UserInput';

function CustomerList() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS' })
    }, []);

    const customers = useSelector(store => store.customerReducer);
    console.log('Customers:', customers);

    const deleteCustomer = (e) => {
        dispatch({ type: 'DELETE_CUSTOMER', payload: e.target.value })
    }

    return (
        <div className='customer-list'>
            <UserInput />
            {/* {customers.map( customer =>
                <div className="customer-div" key={customer.id}>
                    <p>Customer ID: {customer.id}</p>
                    <p>Name: {customer.lastName}, {customer.firstName}</p>
                    <p>Phone: {customer.phone}</p>
                    <p>Email: {customer.email}</p>
                    <Button size="sm" variant="danger" value={customer.id} onClick={deleteCustomer}>Delete Customer</Button>
                    <hr/>
                </div>
            )} */}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default CustomerList;