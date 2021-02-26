const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// POST route
router.post('/:id', rejectUnauthenticated, (req, res) => {
    const newCheckIn = req.body;
    console.log('newCheckIn is: ', newCheckIn);
    debugger;
    const queryText = `INSERT INTO "services" ("front_tire", "rear_tire", "tubes", "frame", "der_hanger", "bottom_bracket", "headset", "seatpost", "fork", "chain", "cassette/fw", "chainring", "cables/housing", "shifters/derailleurs", "rims", "spokes", "hubs", "brake_calipers", "brake_levers", "brake_pads/rotors", "estimate", "bike_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22);`;
    console.log(queryText);
    pool.query(queryText, [newCheckIn.frontTire, newCheckIn.rearTire, newCheckIn.tubes, newCheckIn.frame, newCheckIn.derHanger, newCheckIn.bottomBracket, newCheckIn.headset, newCheckIn.seatpost, newCheckIn.fork, newCheckIn.chain, newCheckIn.cassette, newCheckIn.chainring, newCheckIn.cablesHouse, newCheckIn.shifterDerailleur, newCheckIn.rims, newCheckIn.spokes, newCheckIn.hubs, newCheckIn.brakeCaliper, newCheckIn.brakeLever, newCheckIn.brakePads, newCheckIn.estimate,  newCheckIn.bikeId])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error adding new Equipment', error);
            res.sendStatus(500);
        })
});

// // Delete rout
// router.delete('/:id', rejectUnauthenticated, (req, res) => {
//     const idToDelete = req.params.id;
//     const queryText = `DELETE FROM "equipment" WHERE "id" = $1;`;
//     pool.query(queryText, [idToDelete])
//         .then((result) => {
//             console.log('Equipment deleted successfully!');
//             res.sendStatus(204);
//         }).catch((error) => {
//             console.log('Error deleting equipment', error);
//             res.sendStatus(500);
//         })
// });

module.exports = router;
