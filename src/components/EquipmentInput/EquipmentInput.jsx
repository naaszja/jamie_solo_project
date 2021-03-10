import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EquipmentInput.css';

function EquipmentInput() {

    // Instantiate useDispatch to communicate with our sagas
    const dispatch = useDispatch();

    // Bring in our store instance
    const store = useSelector(store => store);

    // State to hold the make, model, and year of the equipment entered by the user
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');

    // Function to handle the equpiment input
    const addEquipment = () => {

        // Validate inputs to make sure all are inputs were used
        if (!make || !model || !year) {
            alert('Error! Please fill in all fields.');
            return;
        }

        // Create a new equipment object containing the user input
        const newEquipment = {
            make,
            model,
            year,
            user_id: store.user.id,
        }

        // Log is for debugging
        console.log(`new equipment is:`, newEquipment);

        // Dispatch our action and payload to created a new equipment entry in the db
        dispatch({
            type: 'ADD_EQUIPMENT',
            payload: newEquipment,
        });

        // Clear the input fields
        setMake('');
        setModel('');
        setYear('');
    }


    return (
        <div id='customer-input'>
            <h4 id="input-text">To enter a new bike, please use the form below.</h4>
            <br />
            <Row>
                <Col xs="10" sm="6" lg="4">
                    <Card id="input-card" bg="light" border="dark">
                        <Card.Body>
                            <Card.Text>
                                <table id='input-table'>
                                    <tr>
                                        <td><label htmlFor='setMake'>Make:</label></td>
                                        <td><input value={make} onChange={(e) => { setMake(e.target.value) }} /></td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor='setModel'>Model:</label></td>
                                        <td><input value={model} onChange={(e) => { setModel(e.target.value) }} /></td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor='setYear'>Year:</label></td>
                                        <td><input value={year} onChange={(e) => { setYear(e.target.value) }} /></td>
                                    </tr>
                                </table>
                            </Card.Text>
                            <Button variant="outline-info" size="block" onClick={addEquipment}>Save</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default EquipmentInput;

