const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "user" ORDER BY "lastName" ASC;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error fetching customers:', error);
        });
});

// GET and store the information for the current customer
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "user" WHERE "user_id" = $1`;
    pool.query(queryText, [req.params.user_id])
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
    const queryText = `UPDATE "user" SET "firstName" = $1, "lastName" = $2, "phone" = $3, "email" = $4
    WHERE "id" = $5;`;
    pool.query(queryText, [newCustomer.firstName, newCustomer.lastName, newCustomer.phone, newCustomer.email, newCustomer.id])
        .then((result) => {
            console.log('in the .then for our post route');
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error adding new customer', error);
            res.sendStatus(500);
        })
});

// DELETE Route
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
