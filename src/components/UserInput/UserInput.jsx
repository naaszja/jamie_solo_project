import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserInput.css';

function UserInput() {

    const dispatch = useDispatch();
    const store = useSelector(store => store);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState(store.user.id);

    const addUser = () => {

           if (!firstName || !lastName || !phone || !email) {
            alert('Error! Please fill in all fields.');
            return;
        }

        const newUser = {
            firstName,
            lastName,
            phone,
            email,
            id,
        }

        console.log(`new user is:`, newUser);

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
        
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
    }


    return (
        <div id='customer-input'>
            <h3>Customer Information</h3> 
            <p><label htmlFor='setFirstName'>First name:</label><input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} /></p>
            <p><label htmlFor='setLastName'>Last name:</label><input value={lastName} onChange={(e) => { setLastName(e.target.value) }} /></p>
            <p><label htmlFor='setPhone'>Phone:</label><input value={phone} onChange={(e) => { setPhone(e.target.value) }} /></p>
            <p><label htmlFor='setEmail'>Email:</label><input value={email} onChange={(e) => { setEmail(e.target.value) }} /></p>
            <Button variant="outline-primary" size="sm" onClick={addUser}>Add Customer Info</Button>
        </div>
    );
}

export default UserInput;

