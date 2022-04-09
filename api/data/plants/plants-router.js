const express = require('express');
const Plant = require('./plants-model');
const { restricted } = require('../middleware/restricted');

const router = express.Router();

router.get('/', restricted, async (req, res, next) => {
    try {
        const data = await Plant.get();
        res.json(data);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', restricted, async (req, res, next) => {
    try {
        const data = await Plant.getById(req.params.id);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;