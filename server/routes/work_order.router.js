const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "work_orders" ORDER BY "id" ASC;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch ((error) => { 
            console.log('Error fetching work orders:', error);
        });
});

// GET route
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const jobId = req.params.id;
    const queryText = `SELECT * FROM "work_orders" WHERE "id" = $1;`;
    pool.query(queryText, [jobId])
        .then((result) => {
            console.log('returning job with id of:', jobId);
            res.send(result.rows);
        }).catch ((error) => { 
            console.log('Error fetching work orders:', error);
        });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
