const mongoose = require('mongoose');


const obavijestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naslov: { type: String, required: true },
    body:   { type: String, required: true },
    korisnikID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    radniNalogID: { type: mongoose.Schema.Types.ObjectId, ref: 'RadniNalog', required: false },
    isRead: { type: Boolean },
    datum:  { type: String }
});


module.exports = mongoose.model('Obavijest', obavijestSchema);