import React from 'react';
import { useHistory } from 'react-router-dom';
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

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_SINGLE_WORKORDER', payload})
    }, []);

    const job = useSelector(store => store.singleWorkOrderReducer);
    console.log(job);


    return (
        <div className='workOrder'>
            <h3>SINGLE_WORKORDER_PAGE</h3>
            {/* <h1>Work Orders</h1>
                <div className="workOrder-div" key={job.id}>
                    Job id: {job.id} | Services: {job.services} | Estimate: {job.total_price} | Bike id: {job.bike_id} | <Button variant="outline-warning" size="sm" onClick={() => history.push('/workOrder')}>Select Job</Button>
                    <hr />
                </div> */}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default WorkOrder;