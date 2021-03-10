const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET admin route
router.get('/', rejectUnauthenticated, (req, res) => {

    console.log(req.user);

    // set the sql query based on the users 'accesslvl'. An admin will have an accesslvl of 1 and
    // all entries in the table will be returned. A customer will have and accesslvl of 0 and will only
    // have entries that reference their id returned
    if (req.user.accesslvl === 1) {
        const queryText = `SELECT * FROM "equipment" ORDER BY "id" ASC;`;
        console.log(queryText);
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error fetching equipment GET route:', error);
            });
    } else if (req.user.accesslvl === 0) {
        const queryText = `SELECT * FROM "equipment" WHERE "user_id" = $1 ORDER BY "id" ASC;`;
        console.log(queryText);
        pool.query(queryText, [req.user.id])
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error fetching equipment GET route:', error);
            });
    }

});

// POST route allows a user to enter a new entry to the equipment table by entering a 
// make, a model, and a year.
router.post('/', rejectUnauthenticated, (req, res) => {
    const newEquipment = req.body;
    console.log(newEquipment);
    const queryText = `INSERT INTO "equipment" ("make", "model", "year", "user_id")
    VALUES ($1, $2, $3, $4)`;
    pool.query(queryText, [newEquipment.make, newEquipment.model, newEquipment.year, newEquipment.user_id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error adding new Equipment', error);
            res.sendStatus(500);
        })
});

// Delete route removes an entry from the equipment table.
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const idToDelete = req.params.id;
    const queryText = `DELETE FROM "equipment" WHERE "id" = $1;`;
    pool.query(queryText, [idToDelete])
        .then((result) => {
            console.log('Equipment deleted successfully!');
            res.sendStatus(204);
        }).catch((error) => {
            console.log('Error deleting equipment', error);
            res.sendStatus(500);
        })
});

module.exports = router;
