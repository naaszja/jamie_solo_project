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

    // Instantiat useParams so parameters can be passed/grabbed through the url
    const params = useParams();

    // Instantiate useDispatch so we can communicate with our sagas
    const dispatch = useDispatch();

    // Instantiate useHistory for navigation 
    const history = useHistory();

    // Bring in our user and single work order reducers
    const user = useSelector(store => store.user);
    const job = useSelector(store => store.singleWorkOrderReducer);

    // Log for debugging purposed
    console.log(`Job is :`, job);

    // useEffect will refresh the page and display the single selected work order
    useEffect(() => {
        dispatch({ type: 'FETCH_SINGLE_WORKORDER', payload: params.id });
    }, []);

    // Function to handle the completing a work order. 
    const completeWorkOrder = (e) => {
        console.log('in complete work order function');
        alert('Work order completed successfully.')

        // Sets the user.id and job.id on the completed job for records purposes
        const details = {
            tech_id: user.id,
            job_id: e.target.value,
        }

        // Dispatches to complete a single job and then refresh the work orders list
        dispatch({ type: 'COMPLETE_WORKORDER', payload: details });
        dispatch({ type: 'FETCH_WORKORDERS' });

        // Navigate the user back to the landing page upon job completion
        history.push('/user')
    }

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