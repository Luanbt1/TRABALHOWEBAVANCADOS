const mongoose = require('mongoose');
const URL = 'mongodb://0.0.0.0:27017/petshop';
const db = mongoose.connect(URL);
const conn = mongoose.connection;

conn.on('open', function () {
    console.log('Conectado ao MongoDB!');
});

conn.on('error', function () {
    console.log('Erro na conexão com o MongoDB!');
});

conn.on('close', function () {
    console.log('Desconetado do MongoDB!');
});

module.exports = db;