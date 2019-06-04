const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Kompanija = require('../models/kompanija');


router.get('/', (req, res, next) => {
    Kompanija.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.delete('/:_id', (req, res, next) => {
    const id = req.params._id;
    Kompanija.deleteOne({ _id: id })
         .exec()
         .then(product => {
            res.status(200).json({
                message: "Kompanija obrisana!"
            });
         })
         .catch(err => {
             res.status(404).json({
                message: "Kompanija not found!",
                error: err
             });
         });
});



router.post('/', (req, res, next) => {
    const kompanija = new Kompanija({
        _id: new mongoose.Types.ObjectId(),
        naziv: req.body.naziv,
        popust: req.body.popust
    });

    kompanija.save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});


router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Kompanija.update({ _id: id }, { $set:  updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});


router.delete('/:id', (req, res, next) => {
    Kompanija.remove({ _id: req.body.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Kompanija obrisana!"
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

module.exports = router;