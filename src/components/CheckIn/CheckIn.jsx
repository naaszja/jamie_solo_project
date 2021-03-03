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
        <div id='checkIn-div'>
            <h1>Let's Talk About Your Bike</h1>
            <div id='radios-div'>
                <h3 id='score-out'>Current Score: {sum}/40 -- {(sum / 40) * 100}%</h3>
                <hr />
                <p>Front Tire</p>
                <input className='radio-good' name='front_tire' value={frontTire} type="radio" onClick={() => setFrontTire(2)} />
                <label className='radio-good' htmlFor='front_tire'> Looking Good</label>
                <input className='radio-maintenance' name='front_tire' value={frontTire} type="radio" onClick={() => setFrontTire(1)} />
                <label className='radio-maintenance' htmlFor='front_tire'> Balding</label>
                <input className='radio-replace' name='front_tire' value={frontTire} type="radio" onClick={() => setFrontTire(0)} />
                <label className='radio-replace' htmlFor='front_tire'> Skid Marks</label>
                <hr />
                <p>Rear Tire</p>
                <input className='radio-good' name='rear_tire' value={rearTire} type="radio" onClick={() => setRearTire(2)} />
                <label className='radio-good' htmlFor='rear_tire'> Looking Good</label>
                <input className='radio-maintenance' name='rear_tire' value={rearTire} type="radio" onClick={() => setRearTire(1)} />
                <label className='radio-maintenance' htmlFor='rear_tire'> Balding</label>
                <input className='radio-replace' name='rear_tire' value={rearTire} type="radio" onClick={() => setRearTire(0)} />
                <label className='radio-replace' htmlFor='rear_tire'> Skid Marks</label>
                <hr />
                <p>Tubes</p>
                <input className='radio-good' name='tubes' value={tubes} type="radio" onClick={() => setTubes(2)} />
                <label className='radio-good' htmlFor='tubes'> Like Pillows</label>
                <input className='radio-maintenance' name='tubes' value={tubes} type="radio" onClick={() => setTubes(1)} />
                <label className='radio-maintenance' htmlFor='tubes'> A Little Leaky</label>
                <input className='radio-replace' name='tubes' value={tubes} type="radio" onClick={() => setTubes(0)} />
                <label className='radio-replace' htmlFor='tubes'> 'Sploded</label>
                <hr />
                <p>Frame</p>
                <input className='radio-good' name='frame' value={frame} type="radio" onClick={() => setFrame(2)} />
                <label className='radio-good' htmlFor='frame'> Still Shiny</label>
                <input className='radio-maintenance' name='frame' value={frame} type="radio" onClick={() => setFrame(1)} />
                <label className='radio-maintenance' htmlFor='frame'> Banged up a litte</label>
                <input className='radio-replace' name='frame' value={frame} type="radio" onClick={() => setFrame(0)} />
                <label className='radio-replace' htmlFor='frame'> Too Many Pieces</label>
                <hr />
                <p>Derailleur Hanger</p>
                <input className='radio-good' name='der_hanger' value={derHanger} type="radio" onClick={() => setDerHanger(2)} />
                <label className='radio-good' htmlFor='der_hanger'> Straight as an Arrow</label>
                <input className='radio-maintenance' name='der_hanger' value={derHanger} type="radio" onClick={() => setDerHanger(1)} />
                <label className='radio-maintenance' htmlFor='der_hanger'> A little Bendy</label>
                <input className='radio-replace' name='der_hanger' value={derHanger} type="radio" onClick={() => setDerHanger(0)} />
                <label className='radio-replace' htmlFor='der_hanger'> Snapped!</label>
                <hr />
                <p>Bottom Bracket</p>
                <input className='radio-good' name='bb' value={bottomBracket} type="radio" value={bottomBracket} onClick={() => setBottomBracket(2)} />
                <label className='radio-good' htmlFor='bb'> Smooth</label>
                <input className='radio-maintenance' name='bb' value={bottomBracket} type="radio" value={bottomBracket} onClick={() => setBottomBracket(1)} />
                <label className='radio-maintenance' htmlFor='bb'> Grind-y</label>
                <input className='radio-replace' name='bb' value={bottomBracket} type="radio" value={bottomBracket} onClick={() => setBottomBracket(0)} />
                <label className='radio-replace' htmlFor='bb'> Can't Pedal</label>
                <hr />
                <p>Headset</p>
                <input className='radio-good' name='headset' value={headset} type="radio" onClick={() => setHeadset(2)} />
                <label className='radio-good' htmlFor='headset'> Buttery</label>
                <input className='radio-maintenance' name='headset' value={headset} type="radio" onClick={() => setHeadset(1)} />
                <label className='radio-maintenance' htmlFor='headset'> Groovy</label>
                <input className='radio-replace' name='headset' value={headset} type="radio" onClick={() => setHeadset(0)} />
                <label className='radio-replace' htmlFor='headset'> Hard to Steer</label>
                <hr />
                <p>Seatpost</p>
                <input className='radio-good' name='seatpost' value={seatpost} type="radio" onClick={() => setSeatpost(2)} />
                <label className='radio-good' htmlFor='seatpost'> No Lube Needed</label>
                <input className='radio-maintenance' name='seatpost' value={seatpost} type="radio" onClick={() => setSeatpost(1)} />
                <label className='radio-maintenance' htmlFor='seatpost'> A Bit Rusty</label>
                <input className='radio-replace' name='seatpost' value={seatpost} type="radio" onClick={() => setSeatpost(0)} />
                <label className='radio-replace' htmlFor='seatpost'> That Thing Moves?</label>
                <hr />
                <p>Fork</p>
                <input className='radio-good' name='fork' type="radio" value={fork} onClick={() => setFork(2)} />
                <label className='radio-good' htmlFor='fork'> Ready for Dinner</label>
                <input className='radio-maintenance' name='fork' type="radio" value={fork} onClick={() => setFork(1)} />
                <label className='radio-maintenance' htmlFor='fork'> A Little Sticky</label>
                <input className='radio-replace' name='fork' type="radio" value={fork} onClick={() => setFork(0)} />
                <label className='radio-replace' htmlFor='fork'> Locked-up</label>
                <hr />
                <p>Chain</p>
                <input className='radio-good' name='chain' type="radio" value={chain} onClick={() => setChain(2)} />
                <label className='radio-good' htmlFor='chain'> Platinum</label>
                <input className='radio-maintenance' name='chain' type="radio" value={chain} onClick={() => setChain(1)} />
                <label className='radio-maintenance' htmlFor='chain'> Sterling Silver</label>
                <input className='radio-replace' name='chain' type="radio" value={chain} onClick={() => setChain(0)} />
                <label className='radio-replace' htmlFor='chain'> Fool's Gold</label>
                <hr />
                <p>Cassette/Freewheel</p>
                <input className='radio-good' name='cassette/fw' type="radio" value={cassette} onClick={() => setCassette(2)} />
                <label className='radio-good' htmlFor='cassette/fw'> Humming Beautifully</label>
                <input className='radio-maintenance' name='cassette/fw' type="radio" value={cassette} onClick={() => setCassette(1)} />
                <label className='radio-maintenance' htmlFor='cassette/fw'> Not-So-Free Freewheeling</label>
                <input className='radio-replace' name='cassette/fw' type="radio" value={cassette} onClick={() => setCassette(0)} />
                <label className='radio-replace' htmlFor='cassette/fw'> Non-Fixie Fixie</label>
                <hr />
                <p>Chainring</p>
                <input className='radio-good' name='chainring' type="radio" value={chainring} onClick={() => setChainring(2)} />
                <label className='radio-good' htmlFor='chainring'> Shiny, Beautiful Teeth</label>
                <input className='radio-maintenance' name='chainring' type="radio" value={chainring} onClick={() => setChainring(1)} />
                <label className='radio-maintenance' htmlFor='chainring'> Snaggle Teeth (1 or 2 broken/bent)</label>
                <input className='radio-replace' name='chainring' type="radio" value={chainring} onClick={() => setChainring(0)} />
                <label className='radio-replace' htmlFor='chainring'> Meth Teeth</label>
                <hr />
                <p>Cables/Housing</p>
                <input className='radio-good' name='cable/housing' type="radio" value={cablesHouse} onClick={() => setCablesHouse(2)} />
                <label className='radio-good' htmlFor='cable/housing'> Fresh and Clean</label>
                <input className='radio-maintenance' name='cable/housing' type="radio" value={cablesHouse} onClick={() => setCablesHouse(1)} />
                <label className='radio-maintenance' htmlFor='cable/housing'> Weathered/Dirty</label>
                <input className='radio-replace' name='cable/housing' type="radio" value={cablesHouse} onClick={() => setCablesHouse(0)} />
                <label className='radio-replace' htmlFor='cable/housing'> Cracked/Broken/Rusty</label>
                <hr />
                <p>Shifters/Derailleurs</p>
                <input className='radio-good' name='shifter/der' type="radio" value={shifterDerailleur} onClick={() => setShifterDerailleur(2)} />
                <label className='radio-good' htmlFor='shifter/der'> Like a Sports Car</label>
                <input className='radio-maintenance' name='shifter/der' type="radio" value={shifterDerailleur} onClick={() => setShifterDerailleur(1)} />
                <label className='radio-maintenance' htmlFor='shifter/der'> Behaves, Usually</label>
                <input className='radio-replace' name='shifter/der' type="radio" value={shifterDerailleur} onClick={() => setShifterDerailleur(0)} />
                <label className='radio-replace' htmlFor='shifter/der'> Does What It Wants
            </label>
                <hr />
                <p>Rims</p>
                <input className='radio-good' name='rims' type="radio" value={rims} onClick={() => setRims(2)} />
                <label className='radio-good' htmlFor='rims'> Beautifully Round</label>
                <input className='radio-maintenance' name='rims' type="radio" value={rims} onClick={() => setRims(1)} />
                <label className='radio-maintenance' htmlFor='rims'> Slightly Lumpy</label>
                <input className='radio-replace' name='rims' type="radio" value={rims} onClick={() => setRims(0)} />
                <label className='radio-replace' htmlFor='rims'> Not Round</label>
                <hr />
                <p>Spokes</p>
                <input className='radio-good' name='spokes' type="radio" value={spokes} onClick={() => setSpokes(2)} />
                <label className='radio-good' htmlFor='spokes'> Strands of Silk</label>
                <input className='radio-maintenance' name='spokes' type="radio" value={spokes} onClick={() => setSpokes(1)} />
                <label className='radio-maintenance' htmlFor='spokes'> Swizzle Stick (or 1)</label>
                <input className='radio-replace' name='spokes' type="radio" value={spokes} onClick={() => setSpokes(0)} />
                <label className='radio-replace' htmlFor='spokes'> Broken Spaghetti</label>
                <hr />
                <p>Hubs</p>
                <input className='radio-good' name='hubs' type="radio" value={hubs} onClick={() => setHubs(2)} />
                <label className='radio-good' htmlFor='hubs'> Smooth Rolling</label>
                <input className='radio-maintenance' name='hubs' type="radio" value={hubs} onClick={() => setHubs(1)} />
                <label className='radio-maintenance' htmlFor='hubs'> Crunchy Roll</label>
                <input className='radio-replace' name='hubs' type="radio" value={hubs} onClick={() => setHubs(0)} />
                <label className='radio-replace' htmlFor='hubs'> Going Nowhere</label>
                <hr />
                <p>Brake Calipers</p>
                <input className='radio-good' name='brake-caliper' type="radio" value={brakeCaliper} onClick={() => setBrakeCaliper(2)} />
                <label className='radio-good' htmlFor='brake-caliper'> Clean, Quiet, Moves Well</label>
                <input className='radio-maintenance' name='brake-caliper' type="radio" value={brakeCaliper} onClick={() => setBrakeCaliper(1)} />
                <label className='radio-maintenance' htmlFor='brake-caliper'> Hard Pull/Noisy</label>
                <input className='radio-replace' name='brake-caliper' type="radio" value={brakeCaliper} onClick={() => setBrakeCaliper(0)} />
                <label className='radio-replace' htmlFor='brake-caliper'> I Use My Foot</label>
                <hr />
                <p>Brake Levers</p>
                <input className='radio-good' name='brake-lever' type="radio" value={brakeLever} onClick={() => setBrakeLever(2)} />
                <label className='radio-good' htmlFor='brake-lever'> Smooth, Easy Pull</label>
                <input className='radio-maintenance' name='brake-lever' type="radio" value={brakeLever} onClick={() => setBrakeLever(1)} />
                <label className='radio-maintenance' htmlFor='brake-lever'> Chunky but Funky</label>
                <input className='radio-replace' name='brake-lever' type="radio" value={brakeLever} onClick={() => setBrakeLever(0)} />
                <label className='radio-replace' htmlFor='brake-lever'> Doesn't Move/Do Anything</label>
                <hr />
                <p>Brake Pads/Rotors</p>
                <input className='radio-good' name='tubes' type="radio" value={brakePads} onClick={() => setBrakePads(2)} />
                <label className='radio-good' htmlFor='tubes'> Little/No Wear</label>
                <input className='radio-maintenance' name='tubes' type="radio" value={brakePads} onClick={() => setBrakePads(1)} />
                <label className='radio-maintenance' htmlFor='tubes'> Extra Shiny/Dirty</label>
                <input className='radio-replace' name='tubes' type="radio" value={brakePads} onClick={() => setBrakePads(0)} />
                <label className='radio-replace' htmlFor='tubes'> No Help At All</label>
                <hr />
                <Button variant="outline-primary" onClick={submitCheckIn}>Submit Check-In</Button>
            </div>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default CheckIn;