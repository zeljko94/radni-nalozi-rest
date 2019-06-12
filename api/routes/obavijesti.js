const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Obavijest = require('../models/obavijest');


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Obavijest.find({ korisnikID: id })
        .exec()
        .then(obavijesti => {
            res.status(200).json(obavijesti);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


module.exports = router;