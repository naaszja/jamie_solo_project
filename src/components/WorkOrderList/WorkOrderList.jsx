import React from 'react';
import { useHistory } from 'react-router-dom';
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
    const history = useHistory();
    const user = (store => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_WORKORDERS' })
    }, []);

    const jobs = useSelector(store => store.workOrderReducer);

    const fetchSingleWorkOrder = (event) => {
        dispatch({ type: 'FETCH_SINGLE_WORKORDER', payload: event.target.value});
        history.push('/workOrder');
    }

    return (
        <div className='workOrder-list'>
            <h1>Work Orders</h1>
            {jobs.map(job =>
                <div className="workOrder-div" key={job.id}>
                    Job id: {job.id} | Services: {job.services} | Estimate: {job.total_price} | Bike id: {job.bike_id}
                    <p>{(user.accesslvl === 1) ? <Button  value={job.id} variant="outline-warning" size="sm" onClick={fetchSingleWorkOrder}>Select Job</Button> : <><Button>Delete</Button></>}</p>
                    <hr />
                </div>
            )}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default WorkOrderList;