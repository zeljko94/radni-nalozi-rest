const mongoose = require('mongoose');


const radniNalogMaterijalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    kolicina: { type: Number},
    radniNalogID: { type: mongoose.Schema.Types.ObjectId, ref: 'RadniNalog', required: true},
    materijalID: { type: mongoose.Schema.Types.ObjectId, ref: 'Materijal', required: true},
});


module.exports = mongoose.model('RadniNalogMaterijal', radniNalogMaterijalSchema);