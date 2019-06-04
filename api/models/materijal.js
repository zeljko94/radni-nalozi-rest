const mongoose = require('mongoose');


const materijalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naziv: {type: String, required: true },
    cijena: {type: Number, required: true },
});


module.exports = mongoose.model('Materijal', materijalSchema);