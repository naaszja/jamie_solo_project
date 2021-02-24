const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "equipment" ORDER BY "id" ASC;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error fetching equipment:', error);
        });
});

// POST route
router.post('/', rejectUnauthenticated, (req, res) => {
    const newEquipment = req.body;
    console.log(newEquipment);
    const queryText = `INSERT INTO "equipment" ("make", "model", "year", "user_id")
    VALUES ($1, $2, $3, $4)`;
    debugger;
    pool.query(queryText, [newEquipment.make, newEquipment.model, newEquipment.year, newEquipment.user_id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error adding new Equipment', error);
            res.sendStatus(500);
        })
});

// Delete rout
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
