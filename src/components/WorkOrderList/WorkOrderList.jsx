import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WorkOrderList.css';
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

    return (
        <div className='workOrder-list'>
            <h1>Work Orders</h1>
            {jobs.map(job =>
                <div className="workOrder-div" key={job.id}>
                    <h4>Job id: {job.id}</h4>
                    <h4>Services:<p>{job.services}</p></h4>
                    <h4>Estimate: {job.total_price}</h4>
                    <h4>Bike id: {job.bike_id}</h4>
                    <hr/>
                </div>
            )}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default WorkOrderList;