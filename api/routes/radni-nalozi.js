const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const RadniNalog = require('../models/radni-nalog');
const User = require('../models/user');
const Klijent = require('../models/klijent');


router.get('/', (req, res, next) => {
    RadniNalog.find()
        .populate('kreatorID')
        .populate('klijentID')
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
    const radniNalog = new RadniNalog({
        _id: new mongoose.Types.ObjectId(),
        naziv: req.body.naziv,
        napomena: req.body.napomena,
        datumKreiranja: new Date(),
        planiraniDatumPocetka: req.body.planiraniDatumPocetka,
        planiraniDatumZavrsetka: req.body.planiraniDatumZavrsetka,
        stvarniDatumPocetka: req.body.stvarniDatumPocetka,
        stvarniDatumZavrsetka: req.body.stvarniDatumZavrsetka,
        brojNaloga: req.body.brojNaloga,
        total: req.body.total,
        opis: req.body.opis,
        kreatorID: req.body.kreatorID,
        klijentID: req.body.klijentID,
    });

    radniNalog.save()
        .then(result => {
            res.status(200).json({
                message: "Radni nalog created!",
                radniNalog: result
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.post('/create', (req, res, next) => {
    const radniNalog = new RadniNalog({
        _id: new mongoose.Types.ObjectId(),
        naziv: req.body.naziv,
        napomena: req.body.napomena,
        datumKreiranja: new Date(),
        planiraniDatumPocetka: req.body.planiraniDatumPocetka,
        planiraniDatumZavrsetka: req.body.planiraniDatumZavrsetka,
        stvarniDatumPocetka: req.body.stvarniDatumPocetka,
        stvarniDatumZavrsetka: req.body.stvarniDatumZavrsetka,
        brojNaloga: req.body.brojNaloga,
        total: req.body.total,
        opis: req.body.opis,
        kreatorID: req.body.kreatorID,
        klijentID: req.body.klijentID,
    });
    
    /*
    const radniNalog = new RadniNalog({
        _id: new mongoose.Types.ObjectId(),
        naziv: req.body.naziv,
        napomena: req.body.napomena,
        datumKreiranja: new Date(),
        planiraniDatumPocetka: req.body.planiraniDatumPocetka,
        planiraniDatumZavrsetka: req.body.planiraniDatumZavrsetka,
        stvarniDatumPocetka: req.body.stvarniDatumPocetka,
        stvarniDatumZavrsetka: req.body.stvarniDatumZavrsetka,
        brojNaloga: req.body.brojNaloga,
        total: req.body.total,
        opis: req.body.opis,
        kreatorID: req.body.kreatorID,
        klijentID: req.body.klijentID,
    });

    radniNalog.save()
        .then(result => {
            res.status(200).json({
                message: "Radni nalog created!",
                radniNalog: result
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
        */
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