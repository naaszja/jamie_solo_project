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
    } else {
        const queryText = `SELECT * FROM "work_orders" WHERE "user_id" = $1 ORDER BY "id" ASC;`;
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

// PUT route
router.put('/', rejectUnauthenticated, (req, res) => {
    const techId = req.body.tech_id;
    const jobId = req.body.job_id;

    console.log('Tech id is:', techId);
    console.log('Job id is:', jobId);

    const queryText = `UPDATE "work_orders" 
    SET "completed" = $1,
    "completed_on" = CURRENT_TIMESTAMP,
    "completed_by" = $2
    WHERE "id" = $3;`;

    pool.query(queryText, [true, techId, jobId])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error completing work order', error);
            res.sendStatus(500);
        })
});

//DELETE route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const jobId = Number(req.params.id);
    debugger;
    const queryText = `DELETE FROM "work_orders" WHERE "id" = $1;`
    pool.query(queryText, [jobId])
    .then((result) => {
        console.log('Work order deleted successfully!');
        res.sendStatus(204);
    }).catch((error) => {
        console.log('Error deleting work order', error);
        res.sendStatus(500);
    })
})

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
