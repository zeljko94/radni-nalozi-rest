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

router.patch('/open/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Obavijest.update({ _id: id }, { $set:  updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Message set as read!"
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.delete('/drop',  (req, res, next) => {
    Obavijest.deleteMany()
        .then(result => {
            res.status(200).json("OK");
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});


module.exports = router;