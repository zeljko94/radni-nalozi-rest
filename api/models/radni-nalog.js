const mongoose = require('mongoose');


const radniNalogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naziv: { type: String, required: true},
    klijentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Klijent', required: true},
    opis: { type: String },
    datumPocetka: { type: Date },
    datumZavrsetka: { type: Date },
    total: { type: Number },
    napomena: {type: String },
    /*
    stvarniDatumPocetka: { type: Date },
    stvarniDatumZavrsetka: { type: Date },
    */
    datumKreiranja: { type: Date },
    sifra: { type: String },
    kreatorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});


module.exports = mongoose.model('RadniNalog', radniNalogSchema);