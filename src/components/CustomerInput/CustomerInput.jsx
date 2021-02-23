import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerInput.css';

function CustomerInput() {

    const dispatch = useDispatch();
    const store = useSelector(store => store);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const addCustomer = () => {

           if (!firstName || !lastName || !phone || !email) {
            alert('Error! Please fill in all fields.');
            return;
        }

        const newCustomer = {
            firstName,
            lastName,
            phone,
            email,
        }

        console.log(`new customer is:`, newCustomer);

        dispatch({
            type: 'ADD_CUSTOMER',
            payload: {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                user_id: store.user.id,
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
            <p><label htmlFor='setFirstName'>First name:</label><input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
            <label htmlFor='setLastName'>Last name:</label><input value={lastName} onChange={(e) => { setLastName(e.target.value) }} /></p>
            <p><label htmlFor='setPhone'>Phone:</label><input value={phone} onChange={(e) => { setPhone(e.target.value) }} />
           <label htmlFor='setEmail'>Email:</label><input value={email} onChange={(e) => { setEmail(e.target.value) }} /></p>
            <Button variant="outline-primary" size="sm" onClick={addCustomer}>Add Customer</Button>
        </div>
    );
}

export default CustomerInput;

