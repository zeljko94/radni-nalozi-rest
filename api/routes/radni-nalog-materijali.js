const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const RadniNalogMaterijal = require('../models/radni-nalog-izvrsitelj');
const RadniNalog = require('../models/radni-nalog');
const Materijal = require('../models/materijal');

router.get('/', (req, res, next) => {
    RadniNalogMaterijal.find()
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

/*
router.get('/:radniNalogID', (req, res, next) => {
    const radniNalogID = req.params.radniNalogID;
    RadniNalogMaterijal.find({
        radniNalogID: radniNalogID
    })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

router.delete('/:_id',  (req, res, next) => {
    const id = req.params._id;
    res.status(200).json({
        id: id
    });
    RadniNalog.deleteOne({ _id: id })
         .exec()
         .then(product => {
            res.status(200).json({
                message: "Radni nalog deleted!"
            });
         })
         .catch(err => {
             res.status(404).json({
                message: "Radni nalog not found!",
                error: err
             });
         });
});



router.post('/', (req, res, next) => {
    const radniNalogMaterijal = new RadniNalogMaterijal({
        _id: new mongoose.Types.ObjectId(),
        kolicina: req.body.kolicina,
        radniNalogID: req.body.radniNalogID,
        materijalID: req.body.materijalID
    });

    radniNalogMaterijal.save()
        .then(result => {
            res.status(200).json({
                message: "Radni nalog materijal created!",
                radniNalogMaterijal: result
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});


router.delete('/:id', (req, res, next) => {
    RadniNalog.remove({ _id: req.body.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Radni nalog deleted"
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});
*/
module.exports = router;