const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const RadniNalogIzvrsitelj = require('../models/radni-nalog-izvrsitelj');
const RadniNalog = require('../models/radni-nalog');
const User = require('../models/user');


router.get('/:radniNalogID', (req, res, next) => {
    const radniNalogID = req.params.radniNalogID;
    RadniNalogIzvrsitelj.find({
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

router.delete('/:_id', /*checkAuth,*/ (req, res, next) => {
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
    const radniNalogIzvrsitelj = new RadniNalogIzvrsitelj({
        _id: new mongoose.Types.ObjectId(),
        radniNalogID: req.body.radniNalogID,
        korisnikID: req.body.korisnikID
    });

    radniNalogIzvrsitelj.save()
        .then(result => {
            res.status(200).json({
                message: "Radni nalog izvrsitelj created!",
                radniNalogIzvrsitelj: result
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

module.exports = router;