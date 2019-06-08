const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const RadniNalog = require('../models/radni-nalog');
const User = require('../models/user');
const Klijent = require('../models/klijent');
const RadniNalogIzvrsitelj = require('../models/radni-nalog-izvrsitelj');
const RadniNalogMaterijal = require('../models/radni-nalog-materijal');

router.post('/', (req, res, next) => {
    const izvrsitelji = req.body.izvrsitelji;
    const stavke  = req.body.materijali;
    var izv = [];
    var stvk = [];

    const radniNalog = new RadniNalog({
        _id:   new mongoose.Types.ObjectId(),
        naziv: req.body.naziv,
        opis:  req.body.opis,
        datumPocetka: req.body.datumPocetka,
        datumZavrsetka: req.body.datumZavrsetka,
        total: req.body.total,
        napomena: req.body.napomena,
        datumKreiranja: new Date()
    });
    radniNalog.save();
    


    for(var i=0; i<izvrsitelji.length; i++){
        const izvrsitelj = new RadniNalogIzvrsitelj({
            _id: new mongoose.Types.ObjectId(),
            radniNalogID: new mongoose.Types.ObjectId(radniNalog._id),
            korisnikID: new mongoose.Types.ObjectId(izvrsitelji[i].uid)
        });
        izv.push(izvrsitelj);
        izv.save()
            .then(result => {})
            .catch(err => {});
    }

    
    res.status(200).json({
        nalog: radniNalog,
        izvrsitelji: izv,
        stavke: stavke
    });

/*
    for(var i=0; i<stavke.length; i++){
        const stavka = new RadniNalogMaterijal({
            _id: new mongoose.Types.ObjectId(),
            kolicina: stavke[i].kolicina,
            radniNalogID: new mongoose.Types.ObjectId(radniNalog._id),
            materijalID: new mongoose.Types.ObjectId(stavke[i].materijal.uid)
        });
        stvk.push(stavka);
    }
*/
    


});

/*
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
*/

/*
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