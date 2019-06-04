const mongoose = require('mongoose');


const kompanijaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naziv: {type: String, required: true },
    popust: {type: Number },
});


module.exports = mongoose.model('Kompanija', kompanijaSchema);