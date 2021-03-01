const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route
router.get('/', rejectUnauthenticated, (req, res) => {

    if (req.user.accesslvl === 1) {
        const queryText = `SELECT * FROM "work_orders" ORDER BY "id" ASC;`;
        pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error fetching work orders:', error);
        });
    } else if (req.user.accesslvl === 0) {
        const queryText = `SELECT * FROM "work_orders" WHERE "id" = $1 ORDER BY "id" ASC;`;
        pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error fetching work orders:', error);
        });
    }
});

// GET route
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const jobId = req.params.id;
    const queryText = `SELECT * FROM "work_orders" WHERE "id" = $1;`;
    pool.query(queryText, [jobId])
        .then((result) => {
            console.log('returning job with id of:', jobId);
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error fetching work orders:', error);
        });
});

// POST route
router.post('/', rejectUnauthenticated, (req, res) => {
    const newWorkOrder = req.body;
    console.log('New work order is:', newWorkOrder);

    const queryText = `INSERT INTO "work_orders" ("services", "total_price", "user_id", "bike_id")
    VALUES ($1, $2, $3, $4);`;
    console.log(queryText);

    pool.query(queryText, [newWorkOrder.services, newWorkOrder.total_price, newWorkOrder.user_id, newWorkOrder.bike_id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error adding new Equipment', error);
            res.sendStatus(500);
        })
});

module.exports = router;
