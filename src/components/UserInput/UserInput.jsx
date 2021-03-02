import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserInput.css';

function UserInput() {

    // Instantiate to allow dispatching actions
    const dispatch = useDispatch();

    // Capture the value of the editMode prop
    const edit = true;

    // Instantiate to allow navigation
    const history = useHistory();

    // Bring in the user reducer so we have access to the user info
    const user = useSelector(store => store.user);

    // State to hold each infomation field for the user
    const [firstName, setFirstName] = useState(`${user.firstName}`);
    const [lastName, setLastName] = useState(`${user.lastName}`);
    const [phone, setPhone] = useState(`${user.phone}`);
    const [email, setEmail] = useState(`${user.email}`);
    const [id, setId] = useState(user.id);

    // Function that bundles the input data and dispatches the action to update the user info
    const addUser = () => {

        // Error handling so we don't end up with null fields
        if (!firstName || !lastName || !phone || !email) {
            alert('Error! Please fill in all fields.');
            return;
        }

        // Object that conglomorates input to be sent off in the payload
        const newUser = {
            firstName,
            lastName,
            phone,
            email,
            id,
        }

        console.log(`new user is:`, newUser);

        // Action to update user info in the user table
        dispatch({
            type: 'ADD_USER',
            payload: {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                id: id,
            }
        });

        // Clearing the input fields
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');

        window.location.reload();
    }

    if (edit === true) {
        return (
            <>
                <Row>
                    <Col xs={12} md={8} lg={6}>
                        <Card bg="dark" text="white">
                            <Card.Body>
                                <Card.Text>
                                    <table id='update-table'>
                                        <tr>
                                            <td>
                                                <label htmlFor='setFirstName'>First name:</label> 
                                            </td>
                                            <td>
                                                <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor='setLastName'>Last name:</label>
                                            </td>
                                            <td>
                                                <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor='setPhone'>Phone:</label>
                                            </td>
                                            <td>
                                                <input value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor='setEmail'>Email:</label>
                                            </td>
                                            <td>
                                                <input value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                            </td>
                                        </tr>
                                    </table>
                                </Card.Text>
                                <Button variant="primary" size="block" onClick={addUser}>Save</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>First and last name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    <FormControl value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Phone</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    <InputGroup.Prepend>
                        <InputGroup.Text>E-mail</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </InputGroup> */}

                {/* <InputGroup.Prepend>
                    <InputGroup.Text>Phone</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={phone} onChange={(e) => { setPhone(e.target.value) }} />

                <div id='update-input'>
                    <p><label htmlFor='setFirstName'>First name:</label><input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} /></p>
                    <p><label htmlFor='setLastName'>Last name:</label><input value={lastName} onChange={(e) => { setLastName(e.target.value) }} /></p>
                    <p><label htmlFor='setPhone'>Phone:</label><input value={phone} onChange={(e) => { setPhone(e.target.value) }} /></p>
                    <p><label htmlFor='setEmail'>Email:</label><input value={email} onChange={(e) => { setEmail(e.target.value) }} /></p>
                    <Button variant="primary" size="sm" onClick={addUser}>Save</Button>
                </div>  */}

            </>);
    } else {
        return (
            <><h2>EDIT_MODE_FALSE</h2></>
        )
    }

}

export default UserInput;