const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const RadniNalog = require('../models/radni-nalog');
const User = require('../models/user');
const Klijent = require('../models/klijent');
const Obavijest = require('../models/obavijest');
const RadniNalogIzvrsitelj = require('../models/radni-nalog-izvrsitelj');
const RadniNalogMaterijal = require('../models/radni-nalog-materijal');


function transform(data){
    return {
        uid: data.nalog._id,
        datumPocetka: data.nalog.datumPocetka,
        datumZavrsetka: data.nalog.datumZavrsetka,
        naziv: data.nalog.naziv,
        opis: data.nalog.opis,
        total: data.nalog.total,
        napomena: data.nalog.napomena,
        klijent: data.nalog.klijentID,
        izvrsitelji: data.izvrsitelji,
        stavke: data.stavke
    };
}

function getRadniNalog(uid){
    return RadniNalog.findOne({ _id: uid })
        .populate('klijentID')
        .exec()
        .then(nalog => {
            return RadniNalogIzvrsitelj.find({ radniNalogID: new mongoose.Types.ObjectId(uid) }).populate('korisnikID').exec()
                .then(izvrsitelji => {
                    return RadniNalogMaterijal.find({ radniNalogID: uid }).populate('materijalID', '_id naziv cijena').exec()
                        .then(materijali => {
                            return {
                                nalog: nalog,
                                izvrsitelji: izvrsitelji.map(izv => izv.korisnikID),
                                stavke: materijali
                            };
                        });
                });
        });
}


router.post('/', (req, res, next) => {
    const izvrsitelji = req.body.izvrsitelji;
    const stavke  = req.body.materijali;
    const klijent = req.body.klijent;
    var izv = [];
    var obavijesti = [];
    var stvk = [];

    const radniNalog = new RadniNalog({
        _id:   new mongoose.Types.ObjectId(),
        naziv: req.body.naziv,
        opis:  req.body.opis,
        datumPocetka: req.body.datumPocetka,
        datumZavrsetka: req.body.datumZavrsetka,
        total: req.body.total,
        napomena: req.body.napomena,
        datumKreiranja: new Date().toString(),
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

                const obavijest = new Obavijest({
                    _id: new mongoose.Types.ObjectId(),
                    naslov: "Novi projekt!",
                    body: "Dodani ste kao izvršitelj na novome projektu.",
                    korisnikID: izvrsitelj.korisnikID,
                    isRead: false,
                    datum: new Date().toString()
                });
                obavijesti.push(obavijest);
                
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

                            getRadniNalog(radniNalog._id)
                                .then(nalogObj => {

                                        res.status(200).json(nalogObj);
                                });
                        })
                        .catch(err => {
                            res.status(500).json(err);
                        });
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
    
});

function processNalozi(array) {
    var list = [];
    return new Promise((async function(resolve){
        for (const item of array) {
            var x = await getRadniNalog(item._id);
            list.push(x);
          }
          resolve(list);
    }));
}


router.get('/', (req, res, next) => {
    RadniNalog.find()
        .exec()
        .then(nalozi => {
            processNalozi(nalozi)
                .then(nalozi => {
                    res.status(200).json(nalozi);
                });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.get('/normal', (req, res, next) => {
    RadniNalog.find()
        .exec()
        .then(nalozi => {
            res.status(200).json(nalozi);
        })
        .catch(err => {
            res.status(500).json({error: err});
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

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    RadniNalog.deleteMany({ _id: id})
        .exec()
        .then(result => {
            RadniNalogIzvrsitelj.deleteMany({ radniNalogID: id})
                .exec()
                .then(result => {

                    RadniNalogMaterijal.deleteMany({ radniNalogID: id })
                        .exec()
                        .then(result => {
                            res.status(200).json(id);
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