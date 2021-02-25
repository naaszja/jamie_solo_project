import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserInput.css';

function UserInput({editMode}) {

    // Instantiate to allow dispatching actions
    const dispatch = useDispatch();

    // Capture the value of the editMode prop
    const edit = editMode;

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

        history.push('/customerList');

    }

    if (edit === true) {
        return (
            <div id='update-input'>
                <p><label htmlFor='setFirstName'>First name:</label><input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    <label htmlFor='setLastName'>Last name:</label><input value={lastName} onChange={(e) => { setLastName(e.target.value) }} /></p>
                <p><label htmlFor='setPhone'>Phone:</label><input value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    <label htmlFor='setEmail'>Email:</label><input value={email} onChange={(e) => { setEmail(e.target.value) }} /></p>
                <Button variant="outline-primary" size="sm" onClick={addUser}>Save Information</Button>
            </div>
        );
    } else {
        return (
            <><h2>EDIT_MODE_FALSE</h2></>
        )
    }

}

export default UserInput;