const mongoose = require('mongoose');


const radniNalogIzvrsiteljSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    radniNalogID: { type: mongoose.Schema.Types.ObjectId, ref: 'RadniNalog', required: true},
    korisnikID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});


module.exports = mongoose.model('RadniNalogIzvrsitelj', radniNalogIzvrsiteljSchema);