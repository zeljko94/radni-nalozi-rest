const express = require('express');
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const userRoutes    = require('./api/routes/users');
const materijalRoutes    = require('./api/routes/materijali');
const klijentRoutes    = require('./api/routes/klijenti');
const radniNalogRoutes = require('./api/routes/radni-nalozi');
const radniNalogIzvrsiteljRoutes = require('./api/routes/radni-nalog-izvrsitelji');
const radniNalogMaterijalRoutes = require('./api/routes/radni-nalog-materijali');

mongoose.connect('mongodb+srv://danijela-ramljak-radni-nalozi:danijela123!@cluster0-savb9.mongodb.net/test?retryWrites=true',
    {
    useNewUrlParser: true,
    useCreateIndex: true
    }
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false})); // extended: false = simple text, extended: true = rich text, 
app.use(bodyParser.json());



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',  '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/users', userRoutes);
app.use('/materijali', materijalRoutes);
app.use('/klijenti', klijentRoutes);
app.use('/radni-nalozi', radniNalogRoutes);
app.use('/radni-nalog-izvrsitelji', radniNalogIzvrsiteljRoutes);
app.use('/radni-nalog-materijali', radniNalogMaterijalRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;