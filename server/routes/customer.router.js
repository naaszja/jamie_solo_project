const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route * not currently used in the program. Thill pull all users and all details *
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "user" ORDER BY "lastName" ASC;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error fetching customers:', error);
        });
});

// PUT route allows the user to update personal information. 
router.post('/', rejectUnauthenticated, (req, res) => {
    const newCustomer = req.body;
    console.log(newCustomer);
    const queryText = `UPDATE "user" SET "firstName" = $1, "lastName" = $2, "phone" = $3, "email" = $4
    WHERE "id" = $5;`;
    pool.query(queryText, [newCustomer.firstName, newCustomer.lastName, newCustomer.phone, newCustomer.email, newCustomer.id])
        .then((result) => {
            console.log(`User information updated successfully.`);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error adding new customer', error);
            res.sendStatus(500);
        })
});

// DELETE route deletes the user, all details and any bike, check-in, or work order that references the user.
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params);
    debugger;
    const queryText = `DELETE FROM "user" WHERE id=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(204)
        }).catch((error) => {
            console.log('Error deletting customer!', error);
            res.sendStatus(500);
        })
})

module.exports = router;