import React from 'react';
import { QRCode } from 'react-qr-svg';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function QR() {

    const params = useParams();

    // Instantiate useHistory for navigation purposes
    const history = useHistory();

    // Bring in the store to access user, equipment, and work order information
    const user = useSelector(store => store.user);

    console.log('User:', user);
    console.log('Params:', params);
    const id = params.id;

    return (
        <div className='root'>
            <h1 >QRCode with JSON</h1>
            <div className='qrcode'>
                <QRCode
                    level="Q"
                    style={{ width: 256 }}
                    value={`https://nameless-tor-68673.herokuapp.com/#/qr/${id}`
                        
                    //     JSON.stringify({
                    //     id: user.id,
                    //     lastName: user.lastName,
                    //     firstName: user.firstName,
                    //     phone: user.phone,
                    //     email: user.email,
                    // })
                
                }
                />
            </div>
            <Button variant="primary" onClick={() => history.push('/user')}>Close QR Code</Button>
        </div>
    );
}

export default QR;