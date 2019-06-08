const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const RadniNalog = require('../models/radni-nalog');
const User = require('../models/user');
const Klijent = require('../models/klijent');
const RadniNalogIzvrsitelj = require('../models/radni-nalog-izvrsitelj');
const RadniNalogMaterijal = require('../models/radni-nalog-materijal');


function getRadniNalog(uid){
    var nalog = {};
    var izvrsitelji = [];
    var materijali = [];

    RadniNalog.find({ _id: uid })
        //.populate('klijentID')
        .exec()
        .then(result => {
            nalog = result;

            RadniNalogIzvrsitelj.find({ radniNalogID: uid })
            //.populate('korisnikID')
            .exec()
            .then(result => {
                izvrsitelji = result;

                RadniNalogMaterijal.find({ radniNalogID: uid })
                //.populate('materijalID')
                .exec()
                .then(result => {
                    materijali = result;

                    return {
                        nalog: nalog,
                        materijali: materijali,
                        izvrsitelji: izvrsitelji
                    };
                })
                .catch(err => {
                    return null;
                });

            })
            .catch(err => {
                return null;
            });
        })
        .catch(err => {
            return null;
        });
}

router.post('/', (req, res, next) => {
    const izvrsitelji = req.body.izvrsitelji;
    const stavke  = req.body.materijali;
    const klijent = req.body.klijent;
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
        datumKreiranja: new Date(),
        klijentID: klijent.uid
    });
    radniNalog.save()
        .then(result => {
            for(var i=0; i<izvrsitelji.length; i++){
                const izvrsitelj = new RadniNalogIzvrsitelj({
                    _id: new mongoose.Types.ObjectId(),
                    radniNalogID: new mongoose.Types.ObjectId(radniNalog._id),
                    korisnikID: new mongoose.Types.ObjectId(izvrsitelji[i].uid)
                });
                izv.push(izvrsitelj);
            }
            RadniNalogIzvrsitelj.insertMany(izv)
                .then(result => {
                    for(var i=0; i<stavke.length; i++){
                        const stavka = new RadniNalogMaterijal({
                            _id: new mongoose.Types.ObjectId(),
                            kolicina: stavke[i].kolicina,
                            radniNalogID: new mongoose.Types.ObjectId(radniNalog._id),
                            materijalID: new mongoose.Types.ObjectId(stavke[i].materijal.uid)
                        });
                        stvk.push(stavka);
                    }
                
                    RadniNalogMaterijal.insertMany(stvk)
                        .then(result => {
                            res.status(200).json({
                                nalog: radniNalog,
                                izvrsitelji: izv,
                                stavke: stavke
                            });
                        })
                        .catch(err => {
                            res.status(200).json(err);
                        });
                })
                .catch(err => {
                    res.status(200).json(err);
                });
            
        
        })
        .catch(err => {
            res.status(200).json(err);
        });
    
});


router.get('/', (req, res, next) => {
    var result = [];

    RadniNalog.find().exec()
        .then(nalozi => {
            for(var i=0; i<nalozi.length; i++){
                result.push(getRadniNalog(nalozi[i]._id));
                //result.push(nalozi[i]);
            }

            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


router.delete('/drop',  (req, res, next) => {
    RadniNalog.deleteMany()
        .then(result => {
            RadniNalogIzvrsitelj.deleteMany()
                .then(result => {
                    RadniNalogMaterijal.deleteMany()
                        .then(result => {
                            res.status(200).json(result);
                        })
                        .catch(err => {
                            res.status(500).json({error: err});
                        });
                })
                .catch(err => {
                    res.status(500).json({error: err});
                });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});


/*
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