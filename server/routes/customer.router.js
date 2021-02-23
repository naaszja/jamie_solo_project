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
        }).catch ((error) => { 
            console.log('Error fetching customers:', error);
        });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
