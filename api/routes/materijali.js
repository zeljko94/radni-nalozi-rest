const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Materijal = require('../models/materijal');


router.get('/', (req, res, next) => {
    Materijal.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.delete('/:_id', /*checkAuth,*/ (req, res, next) => {
    const id = req.params._id;
    res.status(200).json({
        id: id
    });
    Materijal.deleteOne({ _id: id })
         .exec()
         .then(product => {
            res.status(200).json({
                message: "Materijal deleted!"
            });
         })
         .catch(err => {
             res.status(404).json({
                message: "Materijal not found!",
                error: err
             });
         });
});



router.post('/', (req, res, next) => {
    const materijal = new Materijal({
        _id: new mongoose.Types.ObjectId(),
        naziv: req.body.naziv,
        opis: req.body.opis,
        cijena: req.body.cijena
    });

    materijal.save()
        .then(result => {
            res.status(200).json({
                message: "Materijal created!",
                materijal: result
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});


router.delete('/:id', (req, res, next) => {
    Materijal.remove({ _id: req.body.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Materijal deleted"
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

module.exports = router;