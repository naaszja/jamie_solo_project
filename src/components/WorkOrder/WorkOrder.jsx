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
import './WorkOrder.css';

function WorkOrder() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(store => store.user);
    const job = useSelector(store => store.singleWorkOrderReducer);
    console.log(`Job is :`, job);

    useEffect(() => {
        dispatch({ type: 'FETCH_SINGLE_WORKORDER', payload: params.id });
    }, []);

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

    // if (job.completed) {
    //     status = 'Complete'
    // } else if (!job.completed) {
    //     status = 'Not Complete'
    // }

    return (
        <Container>
            <h4>User: {user.username}</h4>
            <hr />
            <Row>
                <Col lg="4" md="6" sm="10" xs="12" >
                    <Card className="workOrder-card" bg="light" border="dark" text="black" key={job.id}>
                        <Card.Header>Job id: {job.id}</Card.Header>
                        <Card.Body>
                            {/* <Card.Title>Status: <span id="single-status">{status}</span></Card.Title> */}
                            <Card.Text className="workOrder-card-text">
                                <p>Services:</p>
                                <p>- {job.services}</p>
                                <p>Estimate: ${job.total_price}</p>
                                <p>Bike id: {job.bike_id}</p>
                            </Card.Text>
                            <p><Button id="complete-job-btn" variant="secondary" size="block" onClick={completeWorkOrder} value={job.id}>Complete</Button></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <hr />
        </Container>
    );
}

// this allows us to use <App /> in index.js
export default WorkOrder;