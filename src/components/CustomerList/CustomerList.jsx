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

    const user = useSelector(store => store.user);
    console.log('User:', user);

    const deleteCustomer = (e) => {
        dispatch({ type: 'DELETE_CUSTOMER', payload: e.target.value })
    }

    return (
        <div className='user-list'>
            <div className="user-div" key={user.id}>
                <h3>Customer Information</h3>
                <p>Customer ID: {user.id}</p>
                <p>Name: {user.lastName}, {user.firstName}</p>
                <p>Phone: {user.phone}</p>
                <p>Email: {user.email}</p>
                <Button size="sm" variant="danger" value={user.id} onClick={deleteCustomer}>Delete Customer</Button>
                <hr />
            </div>
            <><h3>Update Information</h3><br /><UserInput /></>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default CustomerList;