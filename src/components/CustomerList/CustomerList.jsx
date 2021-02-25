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

    // Variable to hold status of edit mode
    let editMode = false;

    const updateUser = () => {
        debugger;
        console.log('in updateUser()');
        editMode = true;
    }

    const deleteUser = (e) => {
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
                <Button variant="outline-success" size="sm" value={user.id} onClick={updateUser}>Update Information</Button>
                <Button size="sm" variant="outline-danger" value={user.id} onClick={deleteUser}>Delete Customer</Button>
                <hr />
                <UserInput editMode={editMode}/>
            </div>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default CustomerList;