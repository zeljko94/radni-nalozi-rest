const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Klijent = require('../models/klijent');


router.get('/', (req, res, next) => {
    Klijent.find()
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
    Klijent.deleteOne({ _id: id })
         .exec()
         .then(product => {
            res.status(200).json({
                message: "Klijent deleted!"
            });
         })
         .catch(err => {
             res.status(404).json({
                message: "Klijent not found!",
                error: err
             });
         });
});



router.post('/', (req, res, next) => {
    const klijent = new Klijent({
        _id: new mongoose.Types.ObjectId(),
        naziv: req.body.naziv,
        /*
        email: req.body.email,
        tel: req.body.tel,
        mob: req.body.mob,
        adresa: req.body.adresa,
        */
        popust: req.body.popust,
    });

    klijent.save()
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
    Klijent.update({ _id: id }, { $set:  updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

module.exports = router;