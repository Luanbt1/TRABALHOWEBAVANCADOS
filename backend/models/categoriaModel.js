const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    codigo: Number,
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('categorias', categoriaSchema);