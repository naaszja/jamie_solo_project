import React from 'react';
import { QRCode } from 'react-qr-svg';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QR.css'

function QR() {

    const params = useParams();

    // Instantiate useHistory for navigation purposes
    const history = useHistory();

    // Bring in the store to access user, equipment, and work order information
    const user = useSelector(store => store.user);
    const id = params.id;
    
    const workOrderURL = `https://nameless-tor-68673.herokuapp.com/#/workOrder/${id}`

    return (
        <div className='root'>
            <h1 >Scan this QR to view work order</h1>
            <div className='qrcode'>
                <QRCode
                    level="Q"
                    style={{ width: 256 }}
                    value={`${workOrderURL}`}
                />
            </div>
            <p id="qr-btn"><Button variant="primary" onClick={() => history.push('/user')}>Close QR Code</Button></p>
        </div>
    );
}

export default QR;