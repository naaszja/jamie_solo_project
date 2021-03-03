import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//Bring in bootstrap components and css
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function WorkOrder() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(store => store.user);
    const job = useSelector(store => store.singleWorkOrderReducer);
    console.log(`Job is :`, job);

    dispatch({ type: 'FETCH_SINGLE_WORKORDER', payload: params.id });

    const completeWorkOrder = (e) => {
        console.log('in complete work order function');
        alert('Work order completed successfully.')

        const details = {
            tech_id: user.id,
            job_id: e.target.value,
        }
        dispatch({ type: 'COMPLETE_WORKORDER', payload: details });
        dispatch({ type: 'FETCH_WORKORDERS' });

        history.push('/user')
    }

    return (
        <div className='workOrder'>
            <div className="workOrder-div" key={job.id}>
                <p> Job id: {job.id}</p>
                <hr />
                <p>Services:</p>
                <p>{job.services}</p>
                <hr />
                <p>Estimate: ${job.total_price}</p>
                <hr />
                <p>Bike id: {job.bike_id}</p>
                <hr />
                <p><Button variant="warning" size="sm" onClick={completeWorkOrder} value={job.id}>Complete Job</Button></p>
                <hr />
            </div>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default WorkOrder;