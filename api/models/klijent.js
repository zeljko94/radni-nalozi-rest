const mongoose = require('mongoose');


const klijentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naziv: {type: String, required: true },
    /*
    email: { type: String, required: true },
    tel: { type: String },
    mob: { type: String },
    adresa: { type: String },
    */
    popust: {type: Number },
});


module.exports = mongoose.model('Klijent', klijentSchema);