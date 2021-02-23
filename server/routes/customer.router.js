const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "person" ORDER BY "firstName" ASC;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error fetching customers:', error);
        });
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const newCustomer = req.body;
    console.log(newCustomer);
    const queryText = `INSERT INTO "person" ("firstName", "lastName", "phone", "email", "user_id")
    VALUES ($1, $2, $3, $4, $5)`;
    debugger;
    pool.query(queryText, [newCustomer.firstName, newCustomer.lastName, newCustomer.phone, newCustomer.email, newCustomer.user_id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error adding new customer', error);
            res.sendStatus(500);
        })
});

module.exports = router;
