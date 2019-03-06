const mongoose = require('mongoose');


const materijalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naziv: {type: String, required: true },
    opis: {type: String },
    cijena: {type: Number, required: true },
});


module.exports = mongoose.model('Materijal', materijalSchema);