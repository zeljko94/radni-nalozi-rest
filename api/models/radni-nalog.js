const mongoose = require('mongoose');


const radniNalogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naziv: { type: String, required: true},
    datumKreiranja: { type: Date },
    datumPocetka: { type: Date },
    datumZavrsetka: { type: Date },
    /*
    stvarniDatumPocetka: { type: Date },
    stvarniDatumZavrsetka: { type: Date },
    */
    sifra: { type: String },
    total: { type: Number },
    opis: { type: String },
    kreatorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    klijentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Klijent', required: true},
});


module.exports = mongoose.model('RadniNalog', radniNalogSchema);