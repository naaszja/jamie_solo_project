import React from 'react';
import { QRCode } from 'react-qr-svg';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QR.css'

function QR() {

    // Instantiate useParams so we can capture the job id that is passed in via the url
    const params = useParams();

    // Instantiate useHistory for navigation purposes
    const history = useHistory();

    // Bring in the store to access user, equipment, and work order information
    const user = useSelector(store => store.user);
    const id = params.id;

    // URL that will be embedded in the QR code, along with the 'id' added to the end
    const workOrderURL = `https://nameless-tor-68673.herokuapp.com/#/workOrder/${id}`

    return (
        <div className='root'>
            <h1 >Scan this QR to view work order</h1>
            <div className='qrcode'>
                <QRCode
                    level="Q"
                    style={{ width: 256 }}
                    value={`${workOrderURL}`
                        
                        // This was used as a proof of concept that a JSON can be stringified, 
                        // passed to another system, and re-objectified (I may have made that term up)

                        // JSON.stringify({
                        //     userName:"Jamie",
                        //     email:"naaszja@gmail.com",
                        // })
                    }
                />
            </div>
            <p id="qr-btn"><Button variant="primary" onClick={() => history.push('/user')}>Close QR Code</Button></p>
        </div>
    );
}

export default QR;