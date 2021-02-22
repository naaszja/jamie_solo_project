import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//Bring in bootstrap components and css
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function WorkOrderList() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_WORKORDERS' })
    }, []);

    const jobs = useSelector(store => store.workOrderReducer);
    console.log('should be a job or two', jobs);
    debugger;

    return (
        <div >
            <h1>Work Orders</h1>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default WorkOrderList;