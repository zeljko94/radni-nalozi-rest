const mongoose = require('mongoose');


const radniNalogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naziv: { type: String, required: true},
    klijentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Klijent', required: true},
    opis: { type: String },
    datumPocetka: { type: String },
    datumZavrsetka: { type: String },
    total: { type: Number },
    napomena: {type: String },
    datumKreiranja: { type: String },
    //kreatorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});


module.exports = mongoose.model('RadniNalog', radniNalogSchema);