import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EquipmentInput.css';

function EquipmentInput() {

    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const equipments = useSelector(store => store.equipmentReducer);

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');

    const addEquipment = () => {

        if (!make || !model || !year) {
            alert('Error! Please fill in all fields.');
            return;
        }

        const newEquipment = {
            make,
            model,
            year,
            user_id: store.user.id,
        }

        console.log(`new equipment is:`, newEquipment);

        dispatch({
            type: 'ADD_EQUIPMENT',
            payload: newEquipment,
        });

        setMake('');
        setModel('');
        setYear('');
    }


    return (
        <div id='customer-input'>
            <h3>To enter a new bike, please fill in the fields below.</h3>
            <br/>
            <label htmlFor='setMake'>Make:</label><input value={make} onChange={(e) => { setMake(e.target.value) }} />
            <label htmlFor='setModel'>Model:</label><input value={model} onChange={(e) => { setModel(e.target.value) }} />
            <label htmlFor='setYear'>Year:</label><input value={year} onChange={(e) => { setYear(e.target.value) }} />
            <Button variant="outline-primary" size="sm" onClick={addEquipment}>Add Equipment</Button>
        </div>
    );
}

export default EquipmentInput;

