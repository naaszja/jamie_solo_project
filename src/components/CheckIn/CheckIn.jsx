import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
//Bring in bootstrap components and css
// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CheckIn.css';

function CheckIn() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(store => store.user);
    console.log('User:', user);
    console.log('Params:', params);

    // Declare state to hold the 'rating' of each componnet in the check-in form
    const [frontTire, setFrontTire] = useState(0);
    const [rearTire, setRearTire] = useState(0);
    const [tubes, setTubes] = useState(0);
    const [frame, setFrame] = useState(0);
    const [derHanger, setDerHanger] = useState(0);
    const [bottomBracket, setBottomBracket] = useState(0);
    const [headset, setHeadset] = useState(0);
    const [seatpost, setSeatpost] = useState(0);
    const [fork, setFork] = useState(0);
    const [chain, setChain] = useState(0);
    const [cassette, setCassette] = useState(0);
    const [chainring, setChainring] = useState(0);
    const [cablesHouse, setCablesHouse] = useState(0);
    const [shifterDerailleur, setShifterDerailleur] = useState(0);
    const [rims, setRims] = useState(0);
    const [spokes, setSpokes] = useState(0);
    const [hubs, setHubs] = useState(0);
    const [brakeCaliper, setBrakeCaliper] = useState(0);
    const [brakeLever, setBrakeLever] = useState(0);
    const [brakePads, setBrakePads] = useState(0);
    const [bikeId, setBikeId] = useState(params.id);

    const sum = (rearTire + frontTire + tubes + frame + derHanger + bottomBracket + headset + seatpost + fork + chain + cassette + chainring + cablesHouse + shifterDerailleur + rims + spokes + hubs + brakeCaliper + brakeLever + brakePads);

    let estimate = 0;

    if (sum >= 35) {
        estimate = 40;
    } else if (sum < 35 && sum >= 30) {
        estimate = 80;
    } else if (sum < 30 && sum >= 25) {
        estimate = 125;
    } else if (sum < 25 && sum >= 20) {
        estimate = 200;
    } else {
        estimate = 300;
    }

    const submitCheckIn = () => {

        const newCheckIn = {
            frontTire,
            rearTire,
            tubes,
            frame,
            derHanger,
            bottomBracket,
            headset,
            seatpost,
            fork,
            chain,
            cassette,
            chainring,
            cablesHouse,
            shifterDerailleur,
            rims,
            spokes,
            hubs,
            brakeCaliper,
            brakeLever,
            brakePads,
            estimate,
            bikeId,
        }

        dispatch({ type: 'ADD_CHECKIN', payload: newCheckIn })

        const recommendation = {
            basic: 'Basic tune-up',
            comp: 'Comprehensive tune-up',
            overhaul: 'Complete overhaul',
        }

        let newWorkOrder = {};

        if (estimate <= 80) {
            newWorkOrder = {
                services: recommendation.basic,
                total_price: newCheckIn.estimate,
                user_id: user.id,
                bike_id: newCheckIn.bikeId,
            }
        } else if (estimate > 80 && estimate <= 125) {
            newWorkOrder = {
                services: recommendation.comp,
                total_price: newCheckIn.estimate,
                user_id: user.id,
                bike_id: newCheckIn.bikeId,
            }
        } else {
            newWorkOrder = {
                services: recommendation.overhaul,
                total_price: newCheckIn.estimate,
                user_id: user.id,
                bike_id: newCheckIn.bikeId,
            }
        }

        console.log(`New work order:`, newWorkOrder);

        dispatch({ type: 'ADD_WORKORDER', payload: newWorkOrder })

        alert(`Check-in submitted successfully!`);
        window.location.reload;
        history.push('/user')

    }

    return (
            <Row>
                <Col xs="12" md="8">
                <div id='checkIn-div'>
                    <Table id='checkIn-table' hover size="sm">
                        <thead>
                            <tr>
                                <th id='thead-h1'colSpan="4"><h1>What are we working with?</h1></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Front Tire</td>
                                <td><input className='radio-good' name='front_tire' value={frontTire} type="radio" onClick={() => setFrontTire(2)} />
                                    <label className='radio-good' htmlFor='front_tire'> Good</label></td>
                                <td><input className='radio-maintenance' name='front_tire' value={frontTire} type="radio" onClick={() => setFrontTire(1)} />
                                    <label className='radio-maintenance' htmlFor='front_tire'> Preventative</label></td>
                                <td><input className='radio-replace' name='front_tire' value={frontTire} type="radio" onClick={() => setFrontTire(0)} />
                                    <label className='radio-replace' htmlFor='front_tire'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Rear Tire</td>
                                <td><input className='radio-good' name='rear_tire' value={rearTire} type="radio" onClick={() => setRearTire(2)} />
                                    <label className='radio-good' htmlFor='rear_tire'> Good</label></td>
                                <td><input className='radio-maintenance' name='rear_tire' value={rearTire} type="radio" onClick={() => setRearTire(1)} />
                                    <label className='radio-maintenance' htmlFor='rear_tire'> Preventative</label></td>
                                <td><input className='radio-replace' name='rear_tire' value={rearTire} type="radio" onClick={() => setRearTire(0)} />
                                    <label className='radio-replace' htmlFor='rear_tire'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Tubes</td>
                                <td><input className='radio-good' name='tubes' value={tubes} type="radio" onClick={() => setTubes(2)} />
                                    <label className='radio-good' htmlFor='tubes'> Good</label></td>
                                <td><input className='radio-maintenance' name='tubes' value={tubes} type="radio" onClick={() => setTubes(1)} />
                                    <label className='radio-maintenance' htmlFor='tubes'> Preventative</label></td>
                                <td><input className='radio-replace' name='tubes' value={tubes} type="radio" onClick={() => setTubes(0)} />
                                    <label className='radio-replace' htmlFor='tubes'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Frame</td>
                                <td><input className='radio-good' name='frame' value={frame} type="radio" onClick={() => setFrame(2)} />
                                    <label className='radio-good' htmlFor='frame'> Good</label></td>
                                <td><input className='radio-maintenance' name='frame' value={frame} type="radio" onClick={() => setFrame(1)} />
                                    <label className='radio-maintenance' htmlFor='frame'> Preventative</label></td>
                                <td><input className='radio-replace' name='frame' value={frame} type="radio" onClick={() => setFrame(0)} />
                                    <label className='radio-replace' htmlFor='frame'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Derailleur Hanger</td>
                                <td><input className='radio-good' name='der_hanger' value={derHanger} type="radio" onClick={() => setDerHanger(2)} />
                                    <label className='radio-good' htmlFor='der_hanger'> Good</label></td>
                                <td><input className='radio-maintenance' name='der_hanger' value={derHanger} type="radio" onClick={() => setDerHanger(1)} />
                                    <label className='radio-maintenance' htmlFor='der_hanger'> Preventative</label></td>
                                <td><input className='radio-replace' name='der_hanger' value={derHanger} type="radio" onClick={() => setDerHanger(0)} />
                                    <label className='radio-replace' htmlFor='der_hanger'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Bottom Bracket</td>
                                <td><input className='radio-good' name='bb' value={bottomBracket} type="radio" value={bottomBracket} onClick={() => setBottomBracket(2)} />
                                    <label className='radio-good' htmlFor='bb'> Good</label></td>
                                <td><input className='radio-maintenance' name='bb' value={bottomBracket} type="radio" value={bottomBracket} onClick={() => setBottomBracket(1)} />
                                    <label className='radio-maintenance' htmlFor='bb'> Preventative</label></td>
                                <td><input className='radio-replace' name='bb' value={bottomBracket} type="radio" value={bottomBracket} onClick={() => setBottomBracket(0)} />
                                    <label className='radio-replace' htmlFor='bb'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Headset</td>
                                <td><input className='radio-good' name='headset' value={headset} type="radio" onClick={() => setHeadset(2)} />
                                    <label className='radio-good' htmlFor='headset'> Good</label></td>
                                <td><input className='radio-maintenance' name='headset' value={headset} type="radio" onClick={() => setHeadset(1)} />
                                    <label className='radio-maintenance' htmlFor='headset'> Preventative</label></td>
                                <td><input className='radio-replace' name='headset' value={headset} type="radio" onClick={() => setHeadset(0)} />
                                    <label className='radio-replace' htmlFor='headset'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Seatpost</td>
                                <td><input className='radio-good' name='seatpost' value={seatpost} type="radio" onClick={() => setSeatpost(2)} />
                                    <label className='radio-good' htmlFor='seatpost'> Good</label></td>
                                <td><input className='radio-maintenance' name='seatpost' value={seatpost} type="radio" onClick={() => setSeatpost(1)} />
                                    <label className='radio-maintenance' htmlFor='seatpost'> Preventative</label></td>
                                <td><input className='radio-replace' name='seatpost' value={seatpost} type="radio" onClick={() => setSeatpost(0)} />
                                    <label className='radio-replace' htmlFor='seatpost'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Fork</td>
                                <td><input className='radio-good' name='fork' type="radio" value={fork} onClick={() => setFork(2)} />
                                    <label className='radio-good' htmlFor='fork'> Good</label></td>
                                <td><input className='radio-maintenance' name='fork' type="radio" value={fork} onClick={() => setFork(1)} />
                                    <label className='radio-maintenance' htmlFor='fork'> Preventative</label></td>
                                <td><input className='radio-replace' name='fork' type="radio" value={fork} onClick={() => setFork(0)} />
                                    <label className='radio-replace' htmlFor='fork'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Chain</td>
                                <td><input className='radio-good' name='chain' type="radio" value={chain} onClick={() => setChain(2)} />
                                    <label className='radio-good' htmlFor='chain'> Good</label></td>
                                <td><input className='radio-maintenance' name='chain' type="radio" value={chain} onClick={() => setChain(1)} />
                                    <label className='radio-maintenance' htmlFor='chain'> Preventative</label></td>
                                <td><input className='radio-replace' name='chain' type="radio" value={chain} onClick={() => setChain(0)} />
                                    <label className='radio-replace' htmlFor='chain'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Cassette / Freewheel</td>
                                <td><input className='radio-good' name='cassette/fw' type="radio" value={cassette} onClick={() => setCassette(2)} />
                                    <label className='radio-good' htmlFor='cassette/fw'> Good</label></td>
                                <td><input className='radio-maintenance' name='cassette/fw' type="radio" value={cassette} onClick={() => setCassette(1)} />
                                    <label className='radio-maintenance' htmlFor='cassette/fw'> Preventative</label></td>
                                <td><input className='radio-replace' name='cassette/fw' type="radio" value={cassette} onClick={() => setCassette(0)} />
                                    <label className='radio-replace' htmlFor='cassette/fw'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Chainring</td>
                                <td><input className='radio-good' name='chainring' type="radio" value={chainring} onClick={() => setChainring(2)} />
                                    <label className='radio-good' htmlFor='chainring'> Good</label></td>
                                <td><input className='radio-maintenance' name='chainring' type="radio" value={chainring} onClick={() => setChainring(1)} />
                                    <label className='radio-maintenance' htmlFor='chainring'> Preventative</label></td>
                                <td><input className='radio-replace' name='chainring' type="radio" value={chainring} onClick={() => setChainring(0)} />
                                    <label className='radio-replace' htmlFor='chainring'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Cables / Housing</td>
                                <td><input className='radio-good' name='cable/housing' type="radio" value={cablesHouse} onClick={() => setCablesHouse(2)} />
                                    <label className='radio-good' htmlFor='cable/housing'> Good</label></td>
                                <td><input className='radio-maintenance' name='cable/housing' type="radio" value={cablesHouse} onClick={() => setCablesHouse(1)} />
                                    <label className='radio-maintenance' htmlFor='cable/housing'> Preventative</label></td>
                                <td><input className='radio-replace' name='cable/housing' type="radio" value={cablesHouse} onClick={() => setCablesHouse(0)} />
                                    <label className='radio-replace' htmlFor='cable/housing'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Shifters / Derailleurs</td>
                                <td><input className='radio-good' name='shifter/der' type="radio" value={shifterDerailleur} onClick={() => setShifterDerailleur(2)} />
                                    <label className='radio-good' htmlFor='shifter/der'> Good</label></td>
                                <td><input className='radio-maintenance' name='shifter/der' type="radio" value={shifterDerailleur} onClick={() => setShifterDerailleur(1)} />
                                    <label className='radio-maintenance' htmlFor='shifter/der'> Preventative</label></td>
                                <td><input className='radio-replace' name='shifter/der' type="radio" value={shifterDerailleur} onClick={() => setShifterDerailleur(0)} />
                                    <label className='radio-replace' htmlFor='shifter/der'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Rims</td>
                                <td><input className='radio-good' name='rims' type="radio" value={rims} onClick={() => setRims(2)} />
                                    <label className='radio-good' htmlFor='rims'> Good</label></td>
                                <td><input className='radio-maintenance' name='rims' type="radio" value={rims} onClick={() => setRims(1)} />
                                    <label className='radio-maintenance' htmlFor='rims'> Preventative</label></td>
                                <td><input className='radio-replace' name='rims' type="radio" value={rims} onClick={() => setRims(0)} />
                                    <label className='radio-replace' htmlFor='rims'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Spokes</td>
                                <td><input className='radio-good' name='spokes' type="radio" value={spokes} onClick={() => setSpokes(2)} />
                                    <label className='radio-good' htmlFor='spokes'> Good</label></td>
                                <td><input className='radio-maintenance' name='spokes' type="radio" value={spokes} onClick={() => setSpokes(1)} />
                                    <label className='radio-maintenance' htmlFor='spokes'> Preventative</label></td>
                                <td><input className='radio-replace' name='spokes' type="radio" value={spokes} onClick={() => setSpokes(0)} />
                                    <label className='radio-replace' htmlFor='spokes'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Hubs</td>
                                <td><input className='radio-good' name='hubs' type="radio" value={hubs} onClick={() => setHubs(2)} />
                                    <label className='radio-good' htmlFor='hubs'> Good</label></td>
                                <td><input className='radio-maintenance' name='hubs' type="radio" value={hubs} onClick={() => setHubs(1)} />
                                    <label className='radio-maintenance' htmlFor='hubs'> Preventative</label></td>
                                <td><input className='radio-replace' name='hubs' type="radio" value={hubs} onClick={() => setHubs(0)} />
                                    <label className='radio-replace' htmlFor='hubs'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Brake Calipers</td>
                                <td><input className='radio-good' name='brake-caliper' type="radio" value={brakeCaliper} onClick={() => setBrakeCaliper(2)} />
                                    <label className='radio-good' htmlFor='brake-caliper'> Good</label></td>
                                <td><input className='radio-maintenance' name='brake-caliper' type="radio" value={brakeCaliper} onClick={() => setBrakeCaliper(1)} />
                                    <label className='radio-maintenance' htmlFor='brake-caliper'> Preventative</label></td>
                                <td><input className='radio-replace' name='brake-caliper' type="radio" value={brakeCaliper} onClick={() => setBrakeCaliper(0)} />
                                    <label className='radio-replace' htmlFor='brake-caliper'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Brake Levers</td>
                                <td><input className='radio-good' name='brake-lever' type="radio" value={brakeLever} onClick={() => setBrakeLever(2)} />
                                    <label className='radio-good' htmlFor='brake-lever'> Good</label></td>
                                <td><input className='radio-maintenance' name='brake-lever' type="radio" value={brakeLever} onClick={() => setBrakeLever(1)} />
                                    <label className='radio-maintenance' htmlFor='brake-lever'> Preventative</label></td>
                                <td><input className='radio-replace' name='brake-lever' type="radio" value={brakeLever} onClick={() => setBrakeLever(0)} />
                                    <label className='radio-replace' htmlFor='brake-lever'> Replace</label></td>
                            </tr>
                            <tr>
                                <td>Brake Pads / Rotors</td>
                                <td><input className='radio-good' name='tubes' type="radio" value={brakePads} onClick={() => setBrakePads(2)} />
                                    <label className='radio-good' htmlFor='tubes'> Good</label></td>
                                <td><input className='radio-maintenance' name='tubes' type="radio" value={brakePads} onClick={() => setBrakePads(1)} />
                                    <label className='radio-maintenance' htmlFor='tubes'> Preventative</label></td>
                                <td><input className='radio-replace' name='tubes' type="radio" value={brakePads} onClick={() => setBrakePads(0)} />
                                    <label className='radio-replace' htmlFor='tubes'> Replace</label></td>
                            </tr>
                        </tbody>
                    </Table>
                    {/* 'Score' indicicator out of a possible 40 points
                    <h3 id='score-out'>{sum}/40 -- {Math.floor((sum / 40) * 100)}%</h3> */}
                    <Button id="checkin-sub-btn" variant="light" onClick={submitCheckIn}>Submit Check-In</Button>
                    </div>
                </Col>
            </Row>
    );
}

// this allows us to use <App /> in index.js
export default CheckIn;